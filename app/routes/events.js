import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model: function(){
    return this.get('store').find('event');
  },
  afterModel: function(resolvedModel, transition, queryParams){
    return this.get('store').find('userEvent', {
      where: {
        parseUser: {
          "__type":  "Pointer",
          "className": "_User",
          "objectId": this.get('session.user.id')
        }
      }
    });
  },
  setupController: function(controller, model){
    controller.set('model', model);
    controller.resetEventGroups();
  },
  actions:{
    saveUserEvent: function(userEvent){
      userEvent.save();
      this.controller.resetEventGroups();
    }
  }
});
