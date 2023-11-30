const {tokenize, detokenize} = require('../controller/TokenController')

const Item = {
    type: 'array',
    items: {
        type: 'string'
    }
}

const tokenSchema = {
    body: Item,
    response: {
        200: Item
    },
}

const tokenizeOpts = {
    schema: tokenSchema,
    handler: tokenize,
}

const detokenizeOpts = {
    schema: tokenSchema,
    handler: detokenize,
}

function tokenizationRoutes(fastify, options, done) {

    fastify.post('/tokenize', tokenizeOpts)
    fastify.post('/detokenize', detokenizeOpts)
    done()
}

module.exports = tokenizationRoutes