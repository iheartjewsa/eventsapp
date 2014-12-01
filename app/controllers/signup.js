import Ember from 'ember';

export default Ember.Controller.extend({
  username: null,
  password: null,
  email: null,
  loggedIn: false,
  loginMessage: null,
  actions: {
    signup: function(){
      var controller = this,
          ParseUser = this.store.modelFor('parse-user'),
          data = {
            username: this.get('username'),
            password: this.get('password'),
            email: this.get('email')
          };
      ParseUser.signup(this.store, data).then(
        function(user){
          controller.set('user', user);
          controller.set('loggedIn', true);
          controller.set('loginMessage', "Thanks for signing up!");
        },
        function(error){
          controller.set('loggedIn', false);
          controller.set('loginMessage', error.message || error.error);
        }
      );
    }
  }
});