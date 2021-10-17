"use strict";

var electron = require("electron");

var app = electron.app,
    ipcMain = electron.ipcMain,
    Tray = electron.Tray,
    Menu = electron.Menu,
    BrowserWindow = electron.BrowserWindow;

var path = require("path");

var isDev = require("electron-is-dev");

var iconPath = path.join(__dirname, "..", "public", "logo512.png");

var SerialPort = require("serialport");

var _require = require("assert"),
    rejects = _require.rejects;

var _require2 = require("path"),
    resolve = _require2.resolve;

var mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 850,
    height: 500,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    frame: false,
    darkTheme: true,
    maximizable: false,
    resizable: false,
    backgroundColor: "#1e1a2e"
  });
  mainWindow.hide();
  var appTray = new Tray(iconPath);
  var contextMenu = Menu.buildFromTemplate([{
    label: "Show App",
    click: function click() {
      mainWindow.show();
      appTray.setContextMenu(contextMenu);
    }
  }, {
    label: "Quit",
    click: function click() {
      app.quit();
    }
  }]);
  mainWindow.loadURL(isDev ? "http://localhost:3000/" : "file://".concat(path.resolve(__dirname, "build", "index.html")));
  appTray.setContextMenu(contextMenu);
}

app.whenReady().then(function () {
  console.log("Aqui inicia o webserver");
  createWindow();
  var ledPort;
  SerialPort.list().then(function _callee(res) {
    var ports, _loop, i;

    return regeneratorRuntime.async(function _callee$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            ports = res.filter(function (value) {
              return value.manufacturer == "1a86";
            });

            _loop = function _loop() {
              var port, openPort, askDevice;
              return regeneratorRuntime.async(function _loop$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      port = new SerialPort(ports[i].path, {
                        baudRate: 9600
                      });
                      port.on("data", function (data) {
                        console.log(data.toString("utf-8"));

                        if (data.toString("utf-8") === "eu") {
                          ledPort = port;
                        } else {
                          port.close();
                        }
                      });

                      openPort = function openPort() {
                        return new Promise(function (resolve) {
                          port.on("open", function () {
                            resolve();
                          });
                        });
                      };

                      askDevice = function askDevice() {
                        return new Promise(function (resolve, reject) {
                          port.write("led?");
                          port.drain(function (error) {
                            console.log("ue");

                            if (error) {
                              reject(error);
                            }

                            port.resume();
                            resolve();
                          });
                        });
                      };

                      _context.next = 6;
                      return regeneratorRuntime.awrap(openPort());

                    case 6:
                      _context.next = 8;
                      return regeneratorRuntime.awrap(askDevice());

                    case 8:
                    case "end":
                      return _context.stop();
                  }
                }
              });
            };

            i = 0;

          case 3:
            if (!(i < ports.length)) {
              _context2.next = 9;
              break;
            }

            _context2.next = 6;
            return regeneratorRuntime.awrap(_loop());

          case 6:
            i++;
            _context2.next = 3;
            break;

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    });
  })["catch"](console.error);
  ipcMain.on("header", function (event, arg) {
    switch (arg) {
      case "minimize":
        mainWindow.minimize();
        break;

      case "close":
        mainWindow.hide();
        break;
    }
  });
  ipcMain.on("color", function (event, arg) {});
  app.on("window-all-closed", function () {
    if (process.platform !== "darwin") {
      app.quit();
    }
  });
});