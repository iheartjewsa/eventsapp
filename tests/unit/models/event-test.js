import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('event', 'Event', {
  // Specify the other units that are required for this test.
  needs: ['model:user-event', 'model:parse-user', 'model:comment']
});

test('it exists', function() {
  var model = this.subject();
  // var store = this.store();
  ok(!!model);
});
