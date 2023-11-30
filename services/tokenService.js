const tokenDb = require('../database/database')
const randomstring = require('randomstring')
const STRING_LENGTH = 32

const isNotEmpty = (array) => array.length !== 0
const retrieveTokenizeOrCreateRandomToken = (token) => {
    const tokenFound = tokenDb.find({'token': token})
    if (isNotEmpty(tokenFound)) {
        return tokenFound[0].tokenization
    }
    const randomToken = randomstring.generate(STRING_LENGTH)
    tokenDb.insert({token: token, tokenization: randomToken})
    return randomToken
}

const retrieveTokenOrNotAvailableString = (tokenize) => {
    const tokenizeFound = tokenDb.find({'tokenization': tokenize})
    if (isNotEmpty(tokenizeFound)) {
        return tokenizeFound[0].token
    }
    return "N/A"
}
const getTokenizations = (tokens) => {
    return tokens.map(retrieveTokenizeOrCreateRandomToken)
}

const getTokens = (tokenizes) => {
    return tokenizes.map(retrieveTokenOrNotAvailableString)
}

module.exports = {
    getTokenizations,
    getTokens
}