/**
 * This file is used specifically for security reasons.
 * Here you can access Nodejs stuff and inject functionality into
 * the renderer thread (accessible there through the "window" object)
 *
 * WARNING!
 * If you import anything from node_modules, then make sure that the package is specified
 * in package.json > dependencies and NOT in devDependencies
 *
 * Example (injects window.myAPI.doAThing() into renderer thread):
 *
 *   import { contextBridge } from 'electron'
 *
 *   contextBridge.exposeInMainWorld('myAPI', {
 *     doAThing: () => {}
 *   })
 */
import {contextBridge, ipcRenderer, dialog} from 'electron'
import {app, BrowserWindow} from '@electron/remote'
ipcRenderer.on("smr",(event,args)=>{
  switch (args) {
    case "HIDE PREVIEW":
      document.querySelector("a[tooltip = 'Click to hide the PDF']").click()
      document.querySelector("a[tooltip = 'Click to hide the file-tree']").click()
  }
})


ipcRenderer.on("smp",(event,args)=>{
  switch (args) {
    case "HIDE SOURCE":
      document.querySelector("a[tooltip = 'Click to hide the file-tree']").click()
      document.querySelector("a[ng-click = 'autocompile_enabled = true']").click()
      document.querySelector("a[ng-click = 'switchToFlatLayout(\\'pdf\\')']").click()
  }
})


// document.querySelector("a[tooltip = 'Click to hide the PDF']").click()
