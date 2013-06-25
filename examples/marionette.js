/**
 * Demo of forwarding ADB port 2828 (marionette port) to host.
 * Will then open socket to 2828 to listen to marionette.
 *
 * This only works if you have a debug firefox os device plugged in
 * with marionette enabled.
 */
var net = require('net'),
    adb = require('../index');

function pingMarionette() {
  var socket = net.connect(2828);
  socket.on('data', function(data) {
    console.log(data.toString());
  });
  setTimeout(process.exit.bind(null, 0), 1000);
}

adb.devices(function(err, list) {
  adb.forward(list[0], 'tcp:2828', pingMarionette);
});

