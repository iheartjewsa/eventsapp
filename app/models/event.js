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
  sortedComments: function(){
    var newComments = this.get('comments').filterBy('createdAt', undefined);
    var oldComments = this.get('comments').filter(function(comment){
      return comment.get('createdAt') !== undefined;
    });
    return newComments.concat(oldComments.sortBy('createdAt').reverse());
  }.property('comments'),
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
