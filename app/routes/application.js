import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';
import Ember from 'ember';

export default Ember.Route.extend(ApplicationRouteMixin, {
  actions:{
    sessionAuthenticationFailed: function(error){
      this.controllerFor('login').set('loginErrorMessage', error.error);
    }
  }
});
