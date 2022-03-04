import { app, BrowserWindow, nativeTheme, Menu, ipcMain } from 'electron'
import { initialize, enable } from '@electron/remote/main' // <-- add this
import path from 'path'
import os from 'os'
initialize()

// needed in case process is undefined under Linux
const platform = process.platform || os.platform()

try {
  if (platform === 'win32' && nativeTheme.shouldUseDarkColors === true) {
    require('fs').unlinkSync(path.join(app.getPath('userData'), 'DevTools Extensions'))
  }
}
catch (_) { }

const isMac = process.platform === 'darwin'
let MainMenus = [
  {
    label:'This is Main Window!',
  },
  {
    label:'Open Preview Window',
    click: () => {
      // console.log(mainFunc.get_url())
      // subWindow.loadURL(mainWindow.getURL())
      // subWindow.show()
      createPreview()
    }
  },
  {
    label:'Source Only',
    click: () => {
      mainWindow.webContents.send("smr","HIDE PREVIEW");
    }
  },
  {
    label:'Reload',
    click: () => {
      mainWindow.reload()
    }
  },
];

const SubMenus = [
  {
    label:'This is Preview Window!',
  },
  {
    label:'Preview Only',
    click: () => {
      subWindow.webContents.send("smp","HIDE SOURCE");
    }
  },
  {
    label:'Reload',
    click: () => {
      subWindow.reload()
    }
  },
];


let mainWindow
let subWindow

let mainFunc = {
  get_url() {
    return mainWindow.getURL()
  }
}

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    icon: path.resolve(__dirname, 'icons/icon.png'), // tray icon
    width: 1000,
    height: 600,
    useContentSize: true,
    // frame: false,
    webPreferences: {
      webSecurity: false,
      contextIsolation: true,
      // More info: /quasar-cli/developing-electron-apps/electron-preload-script
      preload: path.resolve(__dirname, process.env.QUASAR_ELECTRON_PRELOAD),
    }
  })

  enable(mainWindow.webContents)

 //  mainWindow.loadURL(process.env.APP_URL)
  mainWindow.loadURL("https://www.overleaf.com")

  mainWindow.webContents.openDevTools()

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  // Menu.setApplicationMenu(Menu.buildFromTemplate(MainMenus));
  mainWindow.setMenu(Menu.buildFromTemplate(MainMenus))
  if (process.platform === 'darwin') {
    app.dock.setMenu(Menu.buildFromTemplate(MainMenus))
  }
}

function createPreview () {

  subWindow = new BrowserWindow({
    icon: path.resolve(__dirname, 'icons/icon.png'), // tray icon
    width: 1000,
    height: 600,
    useContentSize: true,
    // frame: false,
    webPreferences: {
      webSecurity: false,
      contextIsolation: true,
      // More info: /quasar-cli/developing-electron-apps/electron-preload-script
      preload: path.resolve(__dirname, process.env.QUASAR_ELECTRON_PRELOAD)
    }
  })

  enable(subWindow.webContents)

  //  mainWindow.loadURL(process.env.APP_URL)
  subWindow.loadURL(mainWindow.getURL())


  subWindow.on('closed', () => {
    subWindow = null
  })
  subWindow.setMenu(Menu.buildFromTemplate(SubMenus))

  // Menu.setApplicationMenu(Menu.buildFromTemplate(SubMenus));
}

app.whenReady().then(createWindow)
// app.whenReady().then(createPreview)

app.on('window-all-closed', () => {
  if (platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }

  /* if (subWindow === null) {
    createPreview()
  } */
})
