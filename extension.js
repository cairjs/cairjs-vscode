// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode')
const { createComponent } = require('./commands/createComponent')
const { createResolver } = require('./commands/createResolver')
const { createModel } = require('./commands/createModel')

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate (context) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "cairjs" is now active!')

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  const disposableComponent = vscode.commands.registerCommand('cairjs.createComponent', (uri) => { createComponent(uri) })
  const disposableResolver = vscode.commands.registerCommand('cairjs.createResolver', (uri) => { createResolver(uri) })
  const disposableModel = vscode.commands.registerCommand('cairjs.createModel', (uri) => { createModel(uri) })

  context.subscriptions.push(disposableComponent)
  context.subscriptions.push(disposableResolver)
  context.subscriptions.push(disposableModel)
}
exports.activate = activate

// this method is called when your extension is deactivated
function deactivate () {}

module.exports = {
  activate,
  deactivate
}
