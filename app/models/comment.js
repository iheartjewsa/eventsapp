import DS from 'ember-data';

export default DS.Model.extend({
  event: DS.belongsTo('event'),
  parseUser: DS.belongsTo('parse-user'),
  text: DS.attr('string')
});