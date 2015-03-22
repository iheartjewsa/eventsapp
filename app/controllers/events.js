import Ember from 'ember';

export default Ember.ArrayController.extend({
  needs: 'event',
  itemController: 'event',
  dateSorting: ['date'],
  sortedEvents: Ember.computed.sort('model', 'dateSorting'),
  setTopUpcomingEvents: function(){
    var topUpcomingEvents;
    if (this.get('upcomingEvents')){
      topUpcomingEvents = this.get('upcomingEvents').sortBy('date').slice(0,3);
    }
    this.set('topUpcomingEvents', topUpcomingEvents);
  },
  setcurrentUserAttendingEvents: function(){
    this.set('currentUserAttendingEvents', this.get('upcomingEvents').filterBy('firstCurrentUserEvent.attending', true));
  },
  setcurrentUserNotAttendingEvents: function(){
    this.set('currentUserNotAttendingEvents', this.get('upcomingEvents').filterBy('firstCurrentUserEvent.attending', false));
  },
  setcurrentUserNotIndicatedEvents: function(){
    this.set('currentUserNotIndicatedEvents', this.get('upcomingEvents').filterBy('firstCurrentUserEvent', undefined));
  },
  setPastEvents: function(){
    this.set('pastEvents', this.get('sortedEvents').filter(function(event){
      return event.get('date') < Date.now();
    }));
  },
  setUpcomingEvents: function(){
    this.set('upcomingEvents', this.get('sortedEvents').filter(function(event){
      return event.get('date') >= Date.now();
    }));
  },
  resetEventGroups: function(){
    this.setUpcomingEvents();
    this.setPastEvents();
    this.setcurrentUserAttendingEvents();
    this.setcurrentUserNotAttendingEvents();
    this.setcurrentUserNotIndicatedEvents();
    this.setTopUpcomingEvents();
  }
});
