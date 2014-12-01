import ParseAuthenticator from '../authenticators/parse';

export default {
  name:       'authentication',
  before:     'simple-auth',
  after: 'store',
 initialize: function(container, application) {
    container.register('authenticator:parse', ParseAuthenticator);
    application.inject('authenticator:parse', 'store', 'store:main');
  }
};
