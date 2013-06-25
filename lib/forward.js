var run = require('./cmd');

/**
 * Forward one protocol/port pair from the device to the host.
 *
 *    adb.forward(device, 'tcp:2828', function() {
 *
 *    });
 *
 *    adb.forward(device, ['tcp:2828', 'tcp:2829'], function() {
 *
 *    });
 *
 * @param {String} device to send command to.
 * @param {String|Array} protocols to forward.
 * @param {Function} callback [Err].
 */
function forward(device, protocols, callback) {
  if (typeof protocols === 'string') {
    protocols = [protocols, protocols];
  }

  run.cmd(['forward'].concat(protocols), callback);
}

module.exports.forward = forward;
