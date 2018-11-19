const { app } = require('electron');
const Window = require('./electron/window');

app.on('ready', function(){
    const createWindow = new Window();
    createWindow.create();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
})
