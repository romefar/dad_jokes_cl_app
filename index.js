#!/usr/bin/env node
const { rl } = require('./lib/config')
const { DadJokeService } = require('./lib/service/dadJokeService')
const { messageLog, warningLog, errorLog, printRandomJoke } = require('./lib/utils/log-utlis')
const { saveJokeToFile } = require('./lib/save-joke/save-joke')
const { getRandomJoke } = require('./lib/utils/jokes-utils')

const dadJokeService = new DadJokeService()

const serviceCallback = (err, value) => {
    if(err) {
        errorLog(err)
        return rl.close()
    }
    if(typeof value === 'string') {
        warningLog(value)
        return rl.close()
    }

    let jokes = [...value]
    messageLog(`We've found ${value.length} jokes for you!`)
    let randomJoke = getRandomJoke(jokes)
    printRandomJoke(randomJoke.joke)
    saveJokeToFile(randomJoke)
}

rl.prompt()
rl.on('line', (lineInput) => {
    let line = lineInput.trim()
  
    if(line.length) { 
        let term = line.trim()
        dadJokeService.fetch(term, serviceCallback)
    } else {
        rl.prompt()
    }
})