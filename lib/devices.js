var run = require('./cmd');
var DEVICE_REGEX = /^([^ \t]+)(\t| )/;

/**
 * Lists all available devices.
 *
 *    adb.devices(function(err, list) {
 *    });
 *
 * @param {Function} callback [Error err, Array devices].
 */
function devices(callback) {
  run.cmd('devices', [], function(err, stdout) {
    if (err) return callback(err);

    var results = [];
    var lines = stdout.replace('\r').split('\n');
    lines.shift(); // skip the help line

    lines.forEach(function(line) {
      line = line.trim();
      var match = line.match(DEVICE_REGEX);
      if (match) {
        results.push(match[1]);
      }
    });
    callback(null, results);
  });
}

module.exports.devices = devices;
