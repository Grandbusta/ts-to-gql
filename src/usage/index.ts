import { getTypedefs } from './typedefs.js'
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { resolvers } from './resolvers.js'

async function startServer() {
  const typeDefs = await getTypedefs()

  // @ts-ignore
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  }) as any

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  })

  console.log(`Server started at ${url}`)
}

startServer()
