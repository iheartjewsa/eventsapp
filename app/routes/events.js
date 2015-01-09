import Ember from 'ember';

export default Ember.Route.extend({
  model: function(){
    return this.get('store').find('event');
  },
  afterModel: function(resolvedModel, transition, queryParams){
    if (this.get('session.content.user') !== undefined){
      return this.get('store').find('userEvent', {
        where: {
          parseUser: {
            "__type":  "Pointer",
            "className": "_User",
            "objectId": this.get('session.user.id')
          }
        }
      });
    }
  },
  setupController: function(controller, model){
    controller.set('model', model);
    if (this.get('session.content.user') !== undefined){
      controller.resetEventGroups();
    }
    controller.setTopUpcomingEvents();
  },
  actions:{
    saveUserEvent: function(userEvent){
      userEvent.save();
      this.controller.resetEventGroups();
    }
  }
});
