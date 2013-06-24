suite('cmd', function() {
  var cmd = require('../index').cmd;
  var childProcess = require('child_process');
  var assert = require('assert');

  var realExec;
  var execCalledWith;

  function fakeExec() {
    execCalledWith = Array.prototype.slice.call(arguments);
  }

  suiteSetup(function() {
    realExec = childProcess.exec;
    childProcess.exec = fakeExec;
  });

  suiteTeardown(function() {
    childProcess.exec = realExec;
  });

  setup(function() {
    execCalledWith = null;
  });

  test('cmd', function(done) {
    var expectedErr = null;
    var expectedStdout = 'xfff';
    var expectedStderr = 'errr';

    cmd('devices', function(err, stdout, stderr) {
      assert.equal(err, expectedErr);
      assert.equal(stdout, expectedStdout);
      assert.equal(stderr, expectedStderr);
      done();
    });

    assert.ok(execCalledWith, 'calls exec');

    assert.equal(execCalledWith[0], 'adb');
    assert.deepEqual(execCalledWith[1], ['devices']);
    execCalledWith[2].apply(
      this, [expectedErr, expectedStdout, expectedStderr]
    );
  });

});
