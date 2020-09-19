const vscode = require('vscode')
const fs = require('fs')

async function createModel (uri, name = false) {
  // Solicitar nombre
  const options = {
    placeHolder: 'Enter name model'
  }

  if (!name) {
    name = await vscode.window.showInputBox(options)
  }

  if (!name) {
    vscode.window.showInformationMessage('Please enter name to model!')
    return false
  }

  const dir = `${uri.path}/${name}`
  const filePath = `${dir}/index.js`

  // Verificamos que no exista
  if (fs.existsSync(dir)) {
    vscode.window.showInformationMessage('model exists')
    return false
  }

  // Creamos el directorio
  fs.mkdirSync(dir)

  // Ahora creamos el archivo e insertamos la información en el archivo
  const data = `import { objectType } from '@nexus/schema'

export default objectType({
  name: '${name}',
  definition (table) {
  }
})
`

  await fs.writeFileSync(filePath, data)

  // Display a message box to the user
  vscode.window.showInformationMessage('CairJS Model create success!')
}
module.exports = {
  createModel
}
