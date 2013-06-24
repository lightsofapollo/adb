var childProcess = require('child_process');

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
  if (typeof argv === 'string') {
    argv = [argv];
  }

  return childProcess.exec('adb', argv, callback);
}

module.exports.cmd = cmd;
