const { app, BrowserWindow } = require('electron')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })
//  win.loadURL("https://foundryvtt.com/article/system-data-models/");
  win.loadFile('index.html')
}
app.whenReady().then(() => {
  createWindow()
})