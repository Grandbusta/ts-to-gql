import { Filter, Response, Book } from './interfaces/book.interface'
import { books } from './bookdata.js'

type FilterInput = Omit<Filter, '__kind'>
type ResponseType = Omit<Response, '__kind'>

export const resolvers = {
  Query: {
    book(_, args: { input: FilterInput }): ResponseType {
      return {
        books: books.filter((b) => b.rating == args.input.rating) as Book[],
      }
    },
  },
}
