import Ember from 'ember';

export default Ember.ArrayController.extend({
  needs: 'event',
  itemController: 'event',
  dateSorting: ['date'],
  upcomingEvents: Ember.computed.sort('model', 'dateSorting'),
  setTopUpcomingEvents: function(){
    this.set('topUpcomingEvents', this.sortBy('date').slice(0,3));
  },
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
    this.setTopUpcomingEvents();
  }
});
