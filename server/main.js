import { Meteor } from 'meteor/meteor';

const OnvifManager = require('onvif-nvt')

var camInfo = 'CAMERA INFORMATION...'

Meteor.startup(() => {
    OnvifManager.connect('192.168.5.166', 2000, 'admin', 'admin')
        .then(results => {
            let camera = results
            if (camera.ptz) { // PTZ is supported on this device
                camera.ptz.gotoHomePosition(null)
                camInfo = camera.getInformation()
                camera.ptz.getStatus(null, (err, res) => {


                })
            } else {
                console.log('NO ONVIF');
            }
        })

    Meteor.setInterval(() => {
        // Meteor.call('getStatus')
    }, 3000)
});

Meteor.methods({
    'getInfo' () {
        return camInfo
    },

    'getStatus' () {
        OnvifManager.connect('192.168.5.166', 2000, 'admin', 'admin')
            .then(results => {
                let camera = results
                if (camera.ptz) { // PTZ is supported on this device
                    camera.ptz.getStatus(null, (err, res) => {
                        console.log(res.data.GetStatusResponse.PTZStatus.Position);
                    })
                } else {
                    console.log('NO ONVIF');
                }
            })
    },
    'gotoHome' () {
        OnvifManager.connect('192.168.5.166', 2000, 'admin', 'admin')
            .then(results => {
                let camera = results
                if (camera.ptz) { // PTZ is supported on this device
                    camera.ptz.gotoHomePosition(null)
                } else {
                    console.log('NO ONVIF');
                }
            })
    },

    'ptzMove' (pan, tilt, zoom) {
        OnvifManager.connect('192.168.5.166', 2000, 'admin', 'admin')
            .then(results => {
                let camera = results
                if (camera.ptz) { // PTZ is supported on this device
                    let velocity = { x: pan, y: tilt }
                    camera.ptz.absoluteMove(null, velocity)
                        .then(() => {
                            setTimeout(() => {
                                    // camera.ptz.stop()
                                }, 300) // stop the camera after 5 seconds
                        })

                } else {
                    console.log('NO ONVIF');
                }
            })
    },

    'ptzZoom' (zoom) {
        OnvifManager.connect('192.168.5.166', 2000, 'admin', 'admin')
            .then(results => {
                let camera = results
                if (camera.ptz) { // PTZ is supported on this device
                    let velocity = { x: 0, y: 0, z: zoom }
                    camera.ptz.relativeMove(null, velocity)
                        .then(() => {
                            setTimeout(() => {
                                    // camera.ptz.stop()
                                }, 300) // stop the camera after 5 seconds
                        })
                } else {
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