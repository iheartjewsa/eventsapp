import {
  moduleFor,
  test
} from 'ember-qunit';

moduleFor('controller:events', 'EventsController', {
  // Specify the other units that are required for this test.
   needs: ['controller:event']
});

// Replace this with your real tests.
test('it exists', function() {
  var controller = this.subject();
  ok(controller);
});
