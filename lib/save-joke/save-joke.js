const fs = require('fs')
const { rl } = require('../config')
const { filePath, fileName, separator, CRLF } = require('../config')
const { savedToFileLog, errorLog } = require('../utils/log-utlis')
const { readJokesFromFile } = require('../joke-leaderboard/joke-leaderboard')

const saveJokeToFile = (jokeItem) => { 
    let content = `${jokeItem.joke}${separator}${CRLF}`
    fs.writeFile(filePath, content, { flag : "a+" }, (err) => {
        if(err) {
            errorLog(err)
            return rl.close()
        }
        savedToFileLog(fileName)
        showLeaderboard()
    })
}

const showLeaderboard = () => { 
    rl.question("Do you want to see a leaderboard (y/n): ", (answer) => {
        if(answer.toLowerCase().includes('y')) { 
            readJokesFromFile()
        }
        rl.close()
    })
}

module.exports = {
    saveJokeToFile
}