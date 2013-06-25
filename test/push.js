suite('push', function() {
  var assert = require('assert'),
      helper = require('./helper'),
      push = require('../index').push;

  var device = 'devices';

  suite('file exists', function() {
    var mock = helper.mockCmd(null, '', '');
    var from = __dirname + '/cmd.js';
    var to = '/fo/bar';

    test('push', function(done) {
      push(device, from, to, function(err) {
        if (err) return callback(err);
        assert.deepEqual(mock.with[0], ['push', '-s ' + device, from, to]);
        done();
      });
    });
  });

  suite('missing file', function() {
    var mock = helper.mockCmd(null, '', '');
    var from = __dirname + '/missingxfoooo.js';
    var to = '/fo/bar';

    test('push', function(done) {
      push(device, from, to, function(err) {
        assert.ok(err, err && err.message);
        done();
      });
    });
  });

});
