const https = require('https')

class DadJokeService {

    #rootURL = "https://icanhazdadjoke.com/search"
    #nextPage = 1
    #hasMoreData = null
    #searchTerm = ""

    fetch = (query, callback) => { 
        this._fetchData(query, callback)
    } 

    _fetchData = (query, callback) => { 

        if(this.#searchTerm === query && !this.#hasMoreData) {
            return callback(undefined, "We've already showed you all jokes!")
        }

        this.#searchTerm = query

        const url = this._сreateURL(query)

        const options = { 
            headers : { 
                "Accept" : "application/json"
            }
        }

        let data = ""
        const req = https.request(url, options, (res) => { 

            res.on('data', (chunk) => { 
                data += chunk
            })

            res.on('end', () => { 
                data = JSON.parse(data)
                let resData = this._transformData(data)
                this.#hasMoreData = resData.totalPages !== this.#nextPage
                this.#nextPage = resData.nextPage
                callback(undefined, resData)
            })
        })

        req.on('error', (e) => {
            callback(e)
        })

        req.end()
    }

    _transformData = (data) => {
       const { next_page : nextPage, results, total_jokes : totalJokes, total_pages : totalPages } = data
        return {
            nextPage,
            results,
            totalJokes,
            totalPages
       }
    }

    _сreateURL = (term, limit) => {
        limit = limit ? `&limit=${limit}` : ""
        let page = this.#nextPage ? `&page=${this.#nextPage}` : ""
        return `${this.#rootURL}?term=${term}${limit}${page}`
    }
}

module.exports = { 
    DadJokeService
}