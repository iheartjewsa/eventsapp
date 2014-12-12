import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('comment', 'Comment', {
  // Specify the other units that are required for this test.
  needs: ['model:parse-user', 'model:event', 'model:user-event']
});

test('it exists', function() {
  var model = this.subject();
  // var store = this.store();
  ok(!!model);
});
