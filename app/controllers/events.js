import Ember from 'ember';

export default Ember.ArrayController.extend({
  needs: 'event',
  itemController: 'event',
  setcurrentUserAttendingEvents: function(){
    this.set('currentUserAttendingEvents', this.filterBy('firstCurrentUserEvent.attending', true));
  },
  setcurrentUserNotAttendingEvents: function(){
    this.set('currentUserNotAttendingEvents', this.filterBy('firstCurrentUserEvent.attending', false));
  },
  setcurrentUserNotIndicatedEvents: function(){
    this.set('currentUserNotIndicatedEvents', this.filterBy('firstCurrentUserEvent', undefined));
  },
  resetEventGroups: function(){
    this.setcurrentUserAttendingEvents();
    this.setcurrentUserNotAttendingEvents();
    this.setcurrentUserNotIndicatedEvents();
  }
});
