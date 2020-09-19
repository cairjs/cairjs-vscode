const vscode = require('vscode')
const fs = require('fs')

async function createResolver (uri, name = false) {
  // Solicitar nombre
  const options = {
    placeHolder: 'Enter name resolver'
  }

  if (!name) {
    name = await vscode.window.showInputBox(options)
  }

  if (!name) {
    vscode.window.showInformationMessage('Please enter name!')
    return false
  }

  const dir = `${uri.path}/${name}`
  const filePath = `${dir}/index.js`

  // Verificamos que no exista
  if (fs.existsSync(dir)) {
    vscode.window.showInformationMessage('resolver exists')
    return false
  }

  // Creamos el directorio
  fs.mkdirSync(dir)

  // Ahora creamos el archivo e insertamos la información en el archivo
  const data = `import resolver from '../../../../../framework/resolvers/resolver'

export default resolver({
  name: '${name}',
  args: {},
  type: '',
  nullable: true,
  roles: '',
  resolve: (_, args, context) => {}
})
`

  await fs.writeFileSync(filePath, data)

  // Display a message box to the user
  vscode.window.showInformationMessage('Resolver create success!')
}
module.exports = {
  createResolver
}
