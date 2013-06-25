var fs = require('fs'),
    run = require('./cmd');

/**
 * Push a file to the device.
 *
 *
 *    adb.push(device, '/path/on/disk', '/path/on/device', function(err) {
 *      // success / fail
 *    });
 *
 * @param {String} device id.
 * @param {String} from path on disk.
 * @param {String} to path on phone.
 * @param {Function} callback [Error|Null err].
 */
function push(device, from, to, callback) {
  function moveFiles() {
    run.cmd(['push', '-s ' + device, from, to], callback);
  }

  fs.exists(from, function(itDoes) {
    if (!itDoes)
      return callback(new Error('file does not exist: ' + from));

    moveFiles();
  });
}

module.exports.push = push;
