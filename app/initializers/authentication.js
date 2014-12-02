import ParseAuthenticator from '../authenticators/parse';
import LocalStorageWithIdStore from '../stores/local-storage-with-id';

export default {
  name:       'authentication',
  before:     'simple-auth',
  after: 'store',
 initialize: function(container, application) {
    container.register('authenticator:parse', ParseAuthenticator);
    application.inject('authenticator:parse', 'store', 'store:main');
    container.register('simple-auth-session-store:local-storage-with-id', LocalStorageWithIdStore);
  }
};
