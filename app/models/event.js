import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  date: DS.attr('date'),
  description: DS.attr('string'),
  userEvents: DS.hasMany('user-event'),
  comments: DS.hasMany('comment'),
  shortDate: function(){
    return this.get('date').toDateString();
  }.property('date'),
  time: function(){
    return this.get('date').toTimeString().split(':').slice(0,2).join(':');
  }.property('date')
});
