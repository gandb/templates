const { app, BrowserWindow } = require('electron')
const { exec } = require("child_process");


const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })
  
//  win.loadURL("https://foundryvtt.com/article/system-data-models/");
 // win.loadFile('index.html') 
   win.loadURL("http://localhost/v1/help");

 
}
app.whenReady().then(() => {
  exec(`node index.js`);
  createWindow()
})


//require('child_process').execSync('node index.js')
