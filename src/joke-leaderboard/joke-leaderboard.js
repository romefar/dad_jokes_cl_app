const fs = require('fs')
const { filePath, map, separator } = require('../config')
const { printMaxFrequentJoke } = require('../utils/log-utlis')

const getJokeMaxFrequency = (map) => { 
    let count = 1
    let joke = ""
    for (const [key, value] of map.entries()) {
        if(value >= count) {
            count = value
            joke = key
        }
    }
    return [joke, count]
}

const readJokesFromFile = () => { 
    const readStream = fs.createReadStream(filePath, { emitClose: true })

    readStream.on("data", (chunk) => {
        _tranformChunkIntoMap(chunk.toString())
    })

    readStream.on('close', () => {
        const [joke, count] = getJokeMaxFrequency(map)
        printMaxFrequentJoke(joke, count)
    })
}

const _tranformChunkIntoMap = (data) => { 
    let jokesArr = data.split(separator)
    jokesArr.pop()
    jokesArr.forEach(item => {
        if(map.has(item)) { 
            map.set(item, map.get(item) + 1)
        } else {
            map.set(item, 1)
        }
    })
}

module.exports = {
    readJokesFromFile
}

