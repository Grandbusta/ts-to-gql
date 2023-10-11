import ts from 'typescript'
import { FIELD, Typing } from './constants.js'

const typeMaps = {
  number: 'Int',
  string: 'String',
  boolean: 'Boolean',
}

/**
 * @param file a path to a file
 */
export function convert(file: string): string {
  let program = ts.createProgram([file], { target: ts.ScriptTarget.ESNext })
  const sourceFile = program.getSourceFile(file)
  const checker = program.getTypeChecker()

  if (!sourceFile) return ''

  let result = ''

  // Get all extra types
  ts.forEachChild(sourceFile, (node) => {
    if (ts.isInterfaceDeclaration(node)) {
      let interfaceName = node.name.text
      let schemaType: Typing
      let schemaName = ''

      for (const member of node.members) {
        const fieldName = member.name.getText()
        const fieldType = checker.typeToString(
          checker.getTypeAtLocation(member)
        )
        if (fieldName == FIELD) {
          const kindType = fieldType.split('.')[1]
          schemaType = Typing[kindType] ?? Typing.TYPE
          schemaName = `${interfaceName}${schemaType}`
          typeMaps[interfaceName] = schemaName
        }
      }
    }
  })

  ts.forEachChild(sourceFile, (node) => {
    if (ts.isInterfaceDeclaration(node)) {
      let interfaceName = node.name.text
      let schemaType: Typing
      let schemaName = ''
      let schemaFields = ''

      for (const member of node.members) {
        const fieldName = member.name.getText()
        const fieldType = checker.typeToString(
          checker.getTypeAtLocation(member)
        )
        if (fieldName == FIELD) {
          const kindType = fieldType.split('.')[1]
          schemaType = Typing[kindType] ?? Typing.TYPE
          schemaName = `${interfaceName}${schemaType}`
        }
      }
      for (const member of node.members) {
        const fieldName = member.name.getText()
        const fieldType = checker.typeToString(
          checker.getTypeAtLocation(member)
        )
        const addition = member.questionToken == undefined ? '!' : ''
        if (fieldName != FIELD) {
          schemaFields += `\t${fieldName}: ${getSchemaType(
            fieldType
          )}${addition}\n`
        }
      }

      if (schemaName) {
        result += generateSchema(schemaType, schemaName, schemaFields)
      }
    }
  })
  return result
}

function getSchemaType(type: string) {
  const typeVal = typeMaps[type]
  if (typeVal) return typeVal

  if (type.endsWith('[]')) {
    const arrayType = type.split('[]')[0]
    return `[${getSchemaType(arrayType)}]`
  }
  return `${type}`
}

function generateSchema(type: Typing, name: string, fields: string) {
  const preVal = type == Typing.INPUT ? Typing.INPUT : Typing.TYPE
  return `\n${preVal.toLowerCase()} ${name} {\n${fields}}\n`
}
