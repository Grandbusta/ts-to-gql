import { Typing } from '../../lib/index.js'

export interface Book {
  __kind: Typing.TYPE
  id: string
  name: string
  rating: number
  authors: Author[]
}

export interface Author {
  __kind: Typing.TYPE
  id: string
  name: string
  age?: number
}

export interface Filter {
  __kind: Typing.INPUT
  rating?: number
}

export interface Response {
  __kind: Typing.TYPE
  books: Book[]
}
