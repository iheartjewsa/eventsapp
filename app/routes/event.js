import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params){
    var model = this.get('store').find('event', params.event_id);
    return model;
  }
});
