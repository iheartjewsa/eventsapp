import Ember from 'ember';
import LoginControllerMixin from 'simple-auth/mixins/login-controller-mixin';

export default Ember.Controller.extend(LoginControllerMixin, {
  authenticator: 'authenticator:parse',
  user: null,
  accessToken: null,
  facebookUid: null,
  actions: {
    facebookLogin: function(){
      var controller = this,
          ParseUser = this.store.modelFor('parse-user'),
          data = {
            // username: 'Some facebook user',
            authData: {
              facebook: {
                access_token: this.get('accessToken'),
                id: this.get('facebookUid'),
                expiration_date: (new Date(2032,2,2))
              }
            }
          };
      ParseUser.signup(this.store, data).then(
        function(user){
          controller.set('user', user);
          controller.set('loggedIn', true);
          controller.set('loginMessage', "Welcome!");
        },
        function(error){
          controller.set('loggedIn', false);
          controller.set('loginMessage', error.message || error.error);
        }
      );
    }
  }
});
