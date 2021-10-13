const electron = require("electron");
const { app, ipcMain, Tray, Menu, BrowserWindow } = electron;
const path = require("path");
const isDev = require("electron-is-dev");
const iconPath = path.join(__dirname, "..", "public", "logo512.png");

const SerialPort = require("serialport");
const { rejects } = require("assert");
const { resolve } = require("path");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 460,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    frame: false,
    darkTheme: true,
    maximizable: false,
    resizable: false,
    backgroundColor: "#1e1a2e",
  });
  mainWindow.hide();

  const appTray = new Tray(iconPath);
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Show App",
      click: function () {
        mainWindow.show();
        appTray.setContextMenu(contextMenu);
      },
    },
    {
      label: "Quit",
      click: function () {
        app.quit();
      },
    },
  ]);

  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000/"
      : `file://${path.resolve(__dirname, "build", "index.html")}`
  );

  appTray.setContextMenu(contextMenu);
}

app.whenReady().then(() => {
  console.log("Aqui inicia o webserver");
  createWindow();

  var ledPort;

  SerialPort.list()
    .then(async (res) => {
      const ports = res.filter((value) => value.manufacturer == "1a86");

      for (var i = 0; i < ports.length; i++) {
        const port = new SerialPort(ports[i].path, { baudRate: 9600 });

        port.on("data", (data) => {
          console.log(data.toString("utf-8"));
          if (data.toString("utf-8") === "eu") {
            ledPort = port;
          } else {
            port.close();
          }
        });

        const openPort = () => {
          return new Promise((resolve) => {
            port.on("open", () => {
              resolve();
            });
          });
        };

        const askDevice = () =>
          new Promise((resolve, reject) => {
            port.write("led?");
            port.drain((error) => {
              console.log("ue");
              if (error) {
                reject(error);
              }
              port.resume();
              resolve();
            });
          });

        await openPort();

        await askDevice();
      }
    })
    .catch(console.error);

  ipcMain.on("header", (event, arg) => {
    switch (arg) {
      case "minimize":
        mainWindow.minimize();
        break;
      case "close":
        mainWindow.hide();
        break;
    }
  });

  ipcMain.on("color", (event, arg) => {});

  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
  });
});
