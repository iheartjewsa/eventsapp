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
        var userEventACL = {
            "*": {
              "read": true
            }
          };
        userEventACL[this.get('session.user.id')] = {
          write: true
        };
        userEvent = this.store.createRecord('userEvent', {
          event: this.get('model'),
          parseUser: this.get('store').getById('parseUser', this.get('session.user.id')),
          ACL: userEventACL
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
    },
    comment: function(){
      var commentText = this.get('commentText');
      var commentACL = {
          "*": {
            "read": true
          }
        };
      commentACL[this.get('session.user.id')] = {
        write: true
      };
      var comment = this.store.createRecord('comment',{
        event: this.get('model'),
        parseUser: this.get('store').getById('parseUser', this.get('session.user.id')),
        userName: this.get('store').getById('parseUser', this.get('session.user.id')).get('username'),
        text: commentText,
        ACL: commentACL
      });
      this.set('commentText','');
      this.send('saveComment', comment);
    }
  }
});
