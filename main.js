const { app, BrowserWindow } = require("electron");
const usb = require("usb");

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,

      contextIsolation: false,
    },
  });

  mainWindow.webContents.session.on(
    "select-serial-port",
    (event, portList, webContents, callback) => {
      //Add listeners to handle ports being added or removed before the callback for `select-serial-port`
      //is called.
      mainWindow.webContents.session.on("serial-port-added", (event, port) => {
        console.log("serial-port-added FIRED WITH", port);
        //Optionally update portList to add the new port
      });

      mainWindow.webContents.session.on(
        "serial-port-removed",
        (event, port) => {
          console.log("serial-port-removed FIRED WITH", port);
          //Optionally update portList to remove the port
        }
      );

      event.preventDefault();
      if (portList && portList.length > 0) {
        callback(portList[0].portId);
      } else {
        callback(""); //Could not find any matching devices
      }
    }
  );

  mainWindow.webContents.session.setPermissionCheckHandler(
    (webContents, permission, requestingOrigin, details) => {
      return permission === "serial" && details.securityOrigin === "file:///";
    }
  );

  mainWindow.webContents.session.setDevicePermissionHandler((details) => {
    return details.deviceType === "serial" && details.origin === "file://";
  });

  mainWindow.loadFile("index.html");
  mainWindow.webContents.openDevTools();
}

const getWebUsbAsync = async () => {
  const customWebUSB = new usb.WebUSB({
    allowAllDevices: true,
  });

  const allUsb = await customWebUSB.getDevices();
  console.log(
    "🚀 ~ file: main.js:19 ~ getWebUsbAsync ~ allWebUsb",
    allUsb.length
  );
  for (const device of allUsb) {
    console.log("🚀 ~ file: main.js:20 ~ getWebUsbAsync ~ device", device);
  }
};

const getUsb = () => {
  const allUsb = usb.getDeviceList();
  console.log("🚀 ~ file: main.js:28 ~ getUsb ~ allUsb", allUsb.length);
  for (const device of allUsb) {
    console.log("🚀 ~ file: main.js:25 ~ getUsb ~ device", device);
  }
};

const getUsbConvert = async () => {
  for (const device of usb.getDeviceList()) {
    console.log("🚀 ~ file: main.js:38 ~ getUsbConvert ~ device", device);
    // Uses blocking calls, so is async
    const webDevice = await usb.WebUSBDevice.createInstance(device);

    if (webDevice) {
      console.log(
        "🚀 ~ file: main.js:42 ~ getUsbConvert ~ webDevice",
        webDevice
      );
    }
  }
};

app.whenReady().then(async () => {
  createWindow();

  // await getWebUsbAsync();
  // getUsb();
  await getUsbConvert();
  // await getUsbConvert2();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
