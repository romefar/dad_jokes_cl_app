const path = require('path')
const readline = require("readline")

const fileName = 'jokes.csv'
const filePath = path.join(__dirname, "../jokes/", fileName)
const CRLF = '\r\n'
const separator = "[,]"
const map = new Map()
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Input search term: "
})

module.exports = {
    fileName,
    filePath,
    CRLF,
    map,
    separator,
    rl
}