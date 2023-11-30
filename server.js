const fastify = require('fastify')({logger: true})
const PORT = 3000
fastify.register(require('./routes/tokenRoutes'))

const start = async () => {
    try{
        await fastify.listen(PORT)
    } catch (error) {
        fastify.log.error(error)
        process.exit(1)
    }
}

start()