import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  date: DS.attr('date'),
  description: DS.attr('string'),
  place: DS.attr('string'),
  addressline1: DS.attr('string'),
  addressline2: DS.attr('string'),
  addressline3: DS.attr('string'),
  userEvents: DS.hasMany('user-event'),
  comments: DS.hasMany('comment'),
  shortDate: function(){
    if (this.get('date') !== undefined){
      return this.get('date').toDateString();
    }
  }.property('date'),
  time: function(){
    if (this.get('date') !== undefined){
      return this.get('date').toTimeString().split(':').slice(0,2).join(':');
    }
  }.property('date')
});
