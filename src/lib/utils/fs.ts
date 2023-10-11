import { readdirSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import * as path from 'path'

export async function getPathList(interfacePath: string) {
  try {
    const directory = path.resolve(process.cwd()) + interfacePath
    const dirRes = readdirSync(directory)
    const pathList = dirRes.filter((p) => {
      return path.extname(p) == '.ts'
    })
    const paths = pathList.map((p) => {
      return {
        filename: p.split('.')[0],
        path: path.join(directory, p),
      }
    })
    return paths
  } catch (error) {
    console.error(error)
  }
}

export async function createFiles(
  destDir: string,
  filename: string,
  data: string
) {
  try {
    const directory = path.resolve(process.cwd()) + destDir
    const filepath = path.join(directory, `${filename}.graphql`)
    if (!existsSync(directory)) {
      mkdirSync(directory, { recursive: true })
    }
    writeFileSync(filepath, data)
  } catch (error) {
    console.error(error)
  }
}
