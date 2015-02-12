import Base from 'simple-auth/authenticators/base';
import Ember from 'ember';

export default Base.extend({
  restore: function(data) {
    this.store.push('parseUser', data.user);
    var adapter = this.container.lookup('adapter:application');
    adapter.set('sessionToken', data.user.sessionToken);
    return new Ember.RSVP.Promise(function(resolve, reject) {
        resolve(data);
      });
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
          var adapter = self.container.lookup('adapter:application');
          adapter.set('sessionToken', user.get('sessionToken'));
          resolve({
            user: user
          });
        }, function(error){
          reject(error);
        });
      });
  },
  invalidate: function(data) {
    var self = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      data.user = undefined;
      var adapter = self.container.lookup('adapter:application');
      adapter.set('sessionToken', '');
      resolve();
    });
  }
});
