const https = require('https')

class DadJokeService {

    #rootURL = "https://icanhazdadjoke.com/search"
    #nextPage = 1
    #hasMoreData = true
    #searchTerm = ""
    #results = []
    #options = {
        headers: {
            "Accept": "application/json"
        }
    }

    fetch = (query, callback, fetchAllJokes) => {
        this._fetchData(query, callback, fetchAllJokes)
    }

    _fetchData = (query, callback, fetchAllJokes = true) => {

        if (this.#searchTerm !== query) this.#nextPage = 1

        if (this.#searchTerm === query && !this.#hasMoreData) {
            return callback(undefined, this._isJokeFound())
        }

        this.#searchTerm = query
        const url = this._сreateURL(query)
        let data = ""

        const req = https.request(url, this.#options, (res) => {
            res.on('data', (chunk) => {
                data += chunk
            })

            res.on('end', () => {
                this._handleEndOfRequest(query, data, callback, fetchAllJokes)
            })
        })

        req.on('error', (e) => {
            callback(e)
        })
        req.end()
    }

    _handleEndOfRequest = (query, data, callback, fetchAllJokes) => {
        data = JSON.parse(data)
        this.#hasMoreData = data.total_pages !== this.#nextPage
        this.#nextPage = data.next_page
        this.#results = [...this.#results, ...data.results]
        if (fetchAllJokes) {
            this._fetchData(query, callback, fetchAllJokes)
        } else {
            callback(undefined, this._isJokeFound())
        }
    }

    _isJokeFound = () => {
        return !this.#results.length ? "Sorry. We didn't find any jokes!" : this.#results
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