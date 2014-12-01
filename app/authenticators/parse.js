import Base from 'simple-auth/authenticators/base';
import Ember from 'ember';

export default Base.extend({
  restore: function(data) {
    console.log('to');
    //TODO
  },
  authenticate: function(options) {
    var ParseUser = this.store.modelFor('parse-user');
    var data = {
      username: options.identification,
      password: options.password
    };
    var self = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      ParseUser.login(self.store, data).then(
        function(user){
          resolve({
            user: user
          });
        }, function(error){
          reject(error);
        });
      });
  },
  invalidate: function(data) {
    //TODO
  }
});
