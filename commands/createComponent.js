const vscode = require('vscode')
const fs = require('fs')

async function createComponent (uri) {
  // Solicitar nombre
  const options = {
    placeHolder: 'Enter name component'
  }

  const name = await vscode.window.showInputBox(options)

  if (!name) {
    vscode.window.showInformationMessage('Please enter name!')
    return false
  }

  const dir = `${uri.path}/${name}`

  // Verificamos que no exista
  if (fs.existsSync(dir)) {
    vscode.window.showInformationMessage('Component exists')
    return false
  }

  // Creamos el directorio del componente
  fs.mkdirSync(dir)

  const dirModels = `${dir}/models`
  const dirResolvers = `${dir}/resolvers`
  fs.mkdirSync(dirModels)
  fs.mkdirSync(dirResolvers)

  // Ahora creamos el archivo e insertamos la información en el archivo
  const fileModels = `${dirModels}/index.js`
  const fileResolvers = `${dirResolvers}/index.js`
  const data = `export default {}
`

  await fs.writeFileSync(fileModels, data)
  await fs.writeFileSync(fileResolvers, data)

  // Display a message box to the user
  vscode.window.showInformationMessage('Component create success!')
}
module.exports = {
  createComponent
}
