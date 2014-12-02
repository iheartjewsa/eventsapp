import Ember from 'ember';

export default Ember.ObjectController.extend({
  currentUserEvent: function(){
    this.get('userEvents').filterBy('parseUser', this.get('session.user.id'));
  }.property('userEvents','session.user.id')
});
