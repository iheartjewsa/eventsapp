import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model: function(params){
    var model = this.get('store').find('event', params.event_id);
    return model;
  },
  afterModel: function(model){
    model.set('currentUserEvents', this.get('store').find('userEvent', {
      where: {
        parseUser: {
          "__type":  "Pointer",
          "className": "_User",
          "objectId": this.get('session.user.id')
        },
        event: {
          "__type":  "Pointer",
          "className": "Event",
          "objectId": model.get('id')
        }
      }
    }));
  }
});
