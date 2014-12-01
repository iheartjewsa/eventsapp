import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('user-event', 'UserEvent', {
  // Specify the other units that are required for this test.
  needs: ['model:event', 'model:parse-user']
});

test('it exists', function() {
  var model = this.subject();
  // var store = this.store();
  ok(!!model);
});
