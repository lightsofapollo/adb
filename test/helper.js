module.exports = {
  /**
   * Loads contents of file from disk the path is prefixed by
   * test/fixtures.
   *
   * @param {String} path in fixtures.
   * @return {String} contents of file.
   */
  fixture: function(file) {
    return require('fs').readFileSync(
      __dirname + '/fixtures/' + file,
      'utf8'
    );
  },

  /**
   * Mocks the result of the next cmd call.
   * Will restore itself after call.
   *
   *
   * @param {Error|Null} err to send to mock/spy.
   * @param {String} stdout to send to mock/spy.
   * @param {String} stderr to send to mock/spy.
   * @return {Object} mock handler with .called (Boolean) and .with (Array).
   */
  mockCmd: function(err, stdout, stderr) {
    var results = { called: false };
    var realCmd;
    var cmd = require('../lib/cmd');

    setup(function() {
      realCmd = cmd.cmd;
      cmd.cmd = function() {
        cmd.cmd = realCmd;
        results.called = true;
        results.with = Array.prototype.slice.call(arguments);
        var cb = arguments[1];
        process.nextTick(function() {
          cb.apply(this, [err, stdout, stderr]);
        });
      };
    });

    teardown(function() {
      cmd.cmd = realCmd;
    });

    return results;
  }
};
