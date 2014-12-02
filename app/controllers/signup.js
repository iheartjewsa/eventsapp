import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    signup: function(){
      var controller = this;
      var ParseUser = this.store.modelFor('parse-user');
      var data = {
        username: this.get('username'),
        password: this.get('password'),
        email: this.get('email')
      };
      ParseUser.signup(this.store, data).then(
        function(user){
          controller.get('session').authenticate('authenticator:parse', {
            identification: controller.get('username'),
            password: controller.get('password')
          });
        },
        function(error){
          controller.set('signupMessage', error.message || error.error);
        }
      );
    }
  }
});
