var childProcess = require('child_process'),
    debug = require('debug')('adb:cmd');

/**
 * Executes a adb command.
 *
 *    cmd('devices', function(err, stdout, stderr) {
 *    });
 *
 * @param {String|Array} argv for adb.
 * @param {Function} callback result of child_process.exec.
 */
function cmd(argv, callback) {
  var cmd = ['adb'].concat(argv);

  debug(cmd);
  return childProcess.exec(cmd.join(' '), function(err, stdout, stderr) {
    debug('stdout', stdout);
    debug('stderr', stderr);
    callback(err, stdout, stderr)
  });
}

module.exports.cmd = cmd;
