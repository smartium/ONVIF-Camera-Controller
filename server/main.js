import { Meteor } from 'meteor/meteor';

const OnvifManager = require('onvif-nvt')

Meteor.startup(() => {
  OnvifManager.connect('192.168.5.166', 2000, 'admin', 'admin')
    .then(results => {
      let camera = results
      if (camera.ptz) { // PTZ is supported on this device
        camera.ptz.gotoHomePosition(null)
      }
      else {
        console.log('NO ONVIF');
      }
    })
});

Meteor.methods({
  'gotoHome'() {
    OnvifManager.connect('192.168.5.166', 2000, 'admin', 'admin')
    .then(results => {
      let camera = results
      if (camera.ptz) { // PTZ is supported on this device
        camera.ptz.gotoHomePosition(null)
      }
      else {
        console.log('NO ONVIF');
      }
    })
  },
  'gotoLeft'() {
    OnvifManager.connect('192.168.5.166', 2000, 'admin', 'admin')
      .then(results => {
        let camera = results
        if (camera.ptz) { // PTZ is supported on this device
          let velocity = { x: 0.5, y: 0 }
          camera.ptz.continuousMove(null, velocity)
            .then(() => {
              setTimeout(() => {
              }, 5000) // stop the camera after 5 seconds
            })

        }
        else {
          console.log('NO ONVIF');
        }
      })
  }
})


//   const midi = require('midi');
// const input = new midi.Input();
// input.getPortCount();
// console.log(input.getPortCount());
// input.getPortName(0);
// console.log(input.getPortName(0));
// console.log(input.getPortName(1));
// input.on('message', (deltaTime, message) => {
//   console.log(`m: ${message} d: ${deltaTime}`);
//   if (message == '128,44,0') {
//     OnvifManager.connect('192.168.5.166', 2000, 'admin', 'admin')
//   .then(results => {
//     let camera = results
//     if (camera.ptz) { // PTZ is supported on this device
//       camera.ptz.gotoHomePosition(null)

//     }
//     else {
//       console.log('NO ONVIF');
//     }
//   })
//   }

// });
// input.openPort(1);
// Types(true, false, true)
// input.ignoreTypes(false, false, false);
