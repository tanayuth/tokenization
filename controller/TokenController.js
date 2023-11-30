const {getTokenizations, getTokens} = require('../services/tokenService')
const tokenize = (req, reply) => {

    const tokens = req.body
    reply.send(getTokenizations(tokens))
}

const detokenize = (req, reply) => {
    reply.send(getTokens(req.body))
}

module.exports = {
    tokenize,
    detokenize
}