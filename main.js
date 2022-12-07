const { app, BrowserWindow } = require("electron");
const usb = require("usb");

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
  });

  mainWindow.loadFile("index.html");
}

const getWebUsbAsync = async () => {
  const customWebUSB = new usb.WebUSB({
    allowAllDevices: true,
  });

  for (const device of await customWebUSB.getDevices()) {
    console.log(device);
  }
};

const getUsb = () => {
  for (const device of usb.getDeviceList()) {
    console.log(device);
  }
};

app.whenReady().then(async () => {
  createWindow();

  await getWebUsbAsync();

  console.log("yoo");

  getUsb();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
