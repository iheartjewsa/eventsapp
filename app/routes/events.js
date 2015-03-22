import Ember from 'ember';
import ResetScrollMixin from 'eventsapp/mixins/reset_scroll';

export default Ember.Route.extend(ResetScrollMixin, {
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
    controller.resetEventGroups();
    controller.setTopUpcomingEvents();
  },
  actions:{
    saveUserEvent: function(userEvent){
      userEvent.save();
      this.controller.resetEventGroups();
    }
  }
});
