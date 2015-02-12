import DS from 'ember-data';

export default DS.Model.extend({
  event: DS.belongsTo('event'),
  parseUser: DS.belongsTo('parse-user'),
  text: DS.attr('string'),
  createdAt: DS.attr('date'),
  createdShortDate: function(){
    if (this.get('createdAt') !== undefined){
      return this.get('createdAt').toDateString();
    }
  }.property('createdAt'),
  createdTime: function(){
    if (this.get('createdAt') !== undefined){
      return this.get('createdAt').toTimeString().split(':').slice(0,2).join(':');
    }
  }.property('createdAt'),
  ACL: DS.attr(),
  parseClassName: function(){
    return 'Comment';
  }
});
