suite('devices', function() {
  var helper = require('./helper'),
      fs = require('fs'),
      devices = require('../lib/devices').devices,
      assert = require('assert');

  suite('multiple', function() {
    var mock = helper.mockCmd(
      null,
      helper.fixture('devices/multiple.txt'),
      ''
    );

    test('sends devices', function(done) {
      devices(function(err, list) {
        assert.deepEqual(list, ['full_keon', 'magicfoo']);
        done();
      });
      assert.equal(mock.with[0], 'devices', 'calls devices');
    });

  });

  suite('none', function() {
    var mock = helper.mockCmd(
      null,
      helper.fixture('devices/none.txt'),
      ''
    );

    test('sends devices', function(done) {
      devices(function(err, list) {
        assert.deepEqual(list, []);
        done();
      });
      assert.equal(mock.with[0], 'devices', 'calls devices');
    });

  });

});
