const chalk = require('chalk')

const errorLog = (err) => { 
    console.log(chalk.red(`An error was occured ${err}.`))
}

const messageLog = (message) => { 
    console.log(chalk.green(message))
}

const printMaxFrequentJoke = (joke, count) => {
    console.log(`Joke: ${chalk.green(joke)} appears ${chalk.green(count)} times.`)
}

const savedToFileLog = (filename) => { 
    messageLog(`The joke was succesfully saved to a ${chalk.bgGray.yellow(filename)} file.`)
}

const printRandomJoke = (joke) => {
    console.log(`Random joke: ${chalk.green(joke)}`)
}

const warningLog = (message) => {
    console.log(chalk.yellow(message))
}

module.exports = { 
    errorLog,
    messageLog,
    printMaxFrequentJoke,
    warningLog,
    printRandomJoke,
    savedToFileLog
}