import { Converter, Config } from '../lib/index.js'

const config: Config = {
  srcDir: '/src/usage/interfaces',
}

export async function getTypedefs() {
  const typeDefs = await Converter(config)
  const query = `
type Query {
    book(input: FilterInput): ResponseType
}
`
  return `
  ${typeDefs}
  ${query}
    `
}
