suite('push', function() {
  var assert = require('assert'),
      helper = require('./helper'),
      forward = require('../index').forward;

  var device = 'devices';

  suite('send forward command', function() {
    var mock = helper.mockCmd(null, '', '');

    test('forward', function(done) {
      var protocols = 'tcp:2828';

      forward(device, protocols, function(err) {
        if (err) return done(err);
        assert.deepEqual(
          mock.with[0], ['forward', 'tcp:2828', 'tcp:2828']
        );
        done();
      });
    });
  });

});

