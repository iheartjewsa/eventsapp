import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  userEvents: DS.hasMany('user-event')
});
