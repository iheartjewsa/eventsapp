import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  userEvents: DS.hasMany('user-event', { async: true }),
  firstCurrentUserEvent: function(){
    return this.get('currentUserEvents').toArray()[0];
  }.property('currentUserEvents.content')
});
