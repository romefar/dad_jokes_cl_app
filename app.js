const readline = require("readline")
const { DadJokeService } = require('./dadJokeService')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Input search term:"
})

rl.prompt()
let term = ""

rl.on('line', (lineInput) => {
    let line = lineInput.trim()
  
    if(line.length) { 
        term = line
        joke._fetchData(term, response)
        rl.close() 
    } else {
        rl.prompt()
    }
})

const joke = new DadJokeService()
const response = (err, resData) => {
     console.log(err || resData)
    //console.log(typeof resData === 'string' ? resData : "" )
}


// setTimeout(() => {
//     joke._fetchData('a', response) 
// }, 2000);

// setTimeout(() => {
//     joke._fetchData('a', response) 
// }, 3000);