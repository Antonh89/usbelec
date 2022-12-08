const usb = require("usb");

const getUsbConvert2 = async () => {
  const port = await navigator.serial.getPorts();
  console.log("🚀 ~ file: main.js:55 ~ getUsbConvert2 ~ port", port);

  const portInfo = port.map((p) => p.getInfo());
  console.log("🚀 ~ file: main.js:58 ~ getUsbConvert2 ~ portInfo", portInfo);

  //   const webusb = portInfo.map(async (p) => {
  //     const webDevice = await usb.WebUSBDevice.createInstance(p);
  //     console.log("🚀 ~ file: renderer.js:13 ~ webusb ~ webDevice", webDevice);

  //     return webDevice;
  //   });
  //   console.log("🚀 ~ file: renderer.js:16 ~ webusb ~ webusb", webusb);

  //   const signals = port.map(async (p) => {
  //     await p.open({ baudRate: 9600 /* pick your baud rate */ });
  //     return p.getSignals();
  //   });
  //   console.log("🚀 ~ file: renderer.js:9 ~ getUsbConvert2 ~ signals", signals);

  const d = await navigator.usb.getDevices();
  console.log("🚀 ~ file: main.js:59 ~ getUsbConvert2 ~ d", d);
};

(async () => await getUsbConvert2())();
