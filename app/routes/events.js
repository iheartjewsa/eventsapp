import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model: function(){
    return this.get('store').find('event');
  },
  afterModel: function(){
    this.get('store').find('userEvent', {
      where: {
        parseUser: {
          "__type":  "Pointer",
          "className": "_User",
          "objectId": this.get('session.user.id')
        }
      }
    });
  }
});
