import { getPathList, createFiles } from './utils/fs.js'
export { Typing } from './constants.js'
import { convert } from './converter.js'

export interface Config {
  srcDir: string
}

export async function Converter(config: Config) {
  const paths = await getPathList(config.srcDir)
  let allData = ''
  paths.forEach((file) => {
    const data = convert(file.path)
    allData += data
    // createFiles(config.destDir, file.filename, data)
  })
  console.log('Converted successfully')
  return allData
}
