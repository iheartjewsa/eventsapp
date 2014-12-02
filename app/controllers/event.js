import Ember from 'ember';

export default Ember.ObjectController.extend({
  currentUserEvents: function(){
    return this.get('userEvents').filterBy('parseUser.username', this.get('session.user.username'))
  }.property('userEvents.[]', 'userEvents.@each.parseUser.username'),
  firstCurrentUserEvent: function(){
    return this.get('currentUserEvents').toArray()[0];
  }.property('currentUserEvents.[]'),
  actions: {
    join: function(){
      if(!this.get('model.firstCurrentUserEvent')){
        var userEvent = this.store.createRecord('userEvent', {
          event: this.get('model'),
          parseUser: this.get('store').getById('parseUser', this.get('session.user.id')),
          attending: true
        });
        userEvent.save();
        this.set('firstCurrentUserEvent', userEvent);
      }
      else{
        this.set('firstCurrentUserEvent.attending', true);
        this.get('firstCurrentUserEvent').save();
      }
    },
    leave: function(){
      this.set('firstCurrentUserEvent.attending', false);
      this.get('firstCurrentUserEvent').save();
    }
  }
});
