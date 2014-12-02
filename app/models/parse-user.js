import DS from 'ember-data';

export default EmberParseAdapter.ParseUser.extend({
  userEvents: DS.hasMany('user-event', { async: true })
});
