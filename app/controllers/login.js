import Ember from 'ember';

export default Ember.Controller.extend({
  user: null,
  username: null,
  password: null,
  accessToken: null,
  facebookUid: null,
  loggedIn: false,
  loginMessage: null,
  actions: {
    parseLogin: function(){
      var controller = this,
          ParseUser = this.store.modelFor('parse-user'),
          data = {
            username: this.get('username'),
            password: this.get('password')
          };
      ParseUser.login(this.store, data).then(
        function(user){
          controller.set('user', user);
          controller.set('loggedIn', true);
          controller.set('loginMessage', "Welcome!");
          controller.transitionToRoute('events');
        },
        function(error){
          controller.set('loggedIn', false);
          controller.set('loginMessage', error.message || error.error);
        }
      );
    },
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
