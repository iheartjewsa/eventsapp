import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('parse-user', 'ParseUser', {
  // Specify the other units that are required for this test.
  needs: ['model:user-event', 'model:event']
});

test('it exists', function() {
  var model = this.subject();
  // var store = this.store();
  ok(!!model);
});
