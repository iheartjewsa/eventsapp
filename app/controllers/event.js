import Ember from 'ember';

export default Ember.ObjectController.extend({
  currentUserEvents: function(){
    return this.get('userEvents').filterBy('parseUser.username', this.get('session.user.username'));
  }.property('userEvents.[]', 'userEvents.@each.parseUser.username'),
  firstCurrentUserEvent: function(){
    return this.get('currentUserEvents').toArray()[0];
  }.property('currentUserEvents.[]'),
  actions: {
    join: function(){
      var userEvent;
      if(!this.get('firstCurrentUserEvent')){
        userEvent = this.store.createRecord('userEvent', {
          event: this.get('model'),
          parseUser: this.get('store').getById('parseUser', this.get('session.user.id'))
        });
      }
      else{
        userEvent = this.get('firstCurrentUserEvent');
      }
      userEvent.set('attending', true);
      this.send('saveUserEvent', userEvent);
      return false;
    },
    leave: function(){
      var userEvent = this.get('firstCurrentUserEvent');
      userEvent.set('attending', false);
      this.send('saveUserEvent', userEvent);
      return false;
    }
  }
});
