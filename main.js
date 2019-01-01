const { app, BrowserWindow } = require('electron');
const createServer = require('./src/server')

// hmmmm
createServer()

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = true;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({ width: 1100, height: 700, resizable: true, frame: false })

  // and load the index.html of the app.
  //win.loadFile('./dist/nyghoo/index.html')
  win.loadURL(`http://localhost:4200/index.html`);

  // Open the DevTools.
  win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// FIX electron DOMException: play() failed because the user didn't interact with the document first
app.commandLine.appendSwitch('--autoplay-policy','no-user-gesture-required')

const ipc = require('electron').ipcMain;

ipc.on('quit-app', function (event, arg) {
  console.log('?')
  // app.quit()

  // const remote = require('electron').remote
  // let w = remote.getCurrentWindow()
  // win.close()
  // win.hide()
  // app.exit()

  // win.minimize()
  win.hide()
  app.exit()

})

