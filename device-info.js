function onButtonClick() {
  let filters = [];


  let options = {};
  options.acceptAllDevices = true;
  

  console.log('Requesting Bluetooth Device...');
  console.log('with ' + JSON.stringify(options));
  navigator.bluetooth.requestDevice(options)
  .then(device => {
    console.log('> Name:             ' + device.name);
    console.log('> Id:               ' + device.id);
    console.log('> Connected:        ' + device.gatt.connected);
  })
  .catch(error => {
    console.log('Argh! ' + error);
  });
}