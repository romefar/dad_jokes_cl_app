const getRandomJoke = (jokes) => { 
    return jokes[Math.floor(Math.random() * jokes.length)]
}

module.exports = {
    getRandomJoke
}
