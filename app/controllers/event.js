import Ember from 'ember';

export default Ember.ObjectController.extend({
  actions: {
    join: function(){
      if(!this.get('model.firstCurrentUserEvent')){
        var userEvent = this.store.createRecord('userEvent', {
          event: this.get('model'),
          parseUser: this.get('store').getById('parseUser', this.get('session.user.id')),
          attending: true
        });
        userEvent.save();
        this.set('model.firstCurrentUserEvent', userEvent);
      }
      else{
        this.set('model.firstCurrentUserEvent.attending', true);
        this.get('model.firstCurrentUserEvent').save();
      }
    },
    leave: function(){
      this.set('model.firstCurrentUserEvent.attending', false);
      this.get('model.firstCurrentUserEvent').save();
    }
  }
});
