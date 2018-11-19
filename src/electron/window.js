const { Menu, BrowserWindow } = require('electron');
const template = require('./menu.js');

class Window {
  constructor() {
    this.win = null;
    this.menu = null;
  }

  create() {
    this.win = new BrowserWindow({
      titleBarStyle: 'default',
      title: 'Bamf!',
      width: 1281,
      height: 800,
      minWidth: 1281,
      minHeight: 800,
      darkTheme: true,
      vibrancy: 'dark',
      icon: '../../logo-bamf.png'
    });


    // win.loadFile(__dirname+'/docs/index.html');
    this.win.loadURL('http://0.0.0.0:4000');

    this.win.webContents.openDevTools();

    this.win.on('closed', () => {
        this.win = null;
    });

    this.menu = Menu.buildFromTemplate(template(this.win));
    Menu.setApplicationMenu(this.menu);
  }
}

module.exports = Window;