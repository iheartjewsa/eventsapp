/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'eventsapp',
    environment: environment,
    baseURL: '/',
    locationType: 'hash',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    cordova: {
      rebuildOnChange: false,
      emulate: false
    },

    'simple-auth': {
      crossOriginWhitelist: ['https://api.parse.com'],
      routeAfterAuthentication: 'events',
      routeIfAlreadyAuthenticated: 'events',
      store: 'simple-auth-session-store:local-storage-with-id'
    },

    contentSecurityPolicy: {
      'default-src': "'none'",
      'script-src': "'self'",
      'font-src': "'self'",
      'connect-src': "'self' https://api.parse.com",
      'img-src': "'self' www.facebook.com fbcdn.net scontent-b-lhr.xx.fbcdn.net *.akamaihd.net files.parsetfss.com",
      'style-src': "'self' www.facebook.com fbcdn.net scontent-b-lhr.xx.fbcdn.net *.akamaihd.net",
      'media-src': "'self'"
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV.contentSecurityPolicy = {
      'default-src': "'none'",
      'script-src': "'self' 'unsafe-eval'",
      'font-src': "'self'",
      'connect-src': "'self' https://api.parse.com",
      'img-src': "'self' www.facebook.com *.fbcdn.net scontent-b-lhr.xx.fbcdn.net *.akamaihd.net files.parsetfss.com",
      'style-src': "'self' www.facebook.com *.fbcdn.net scontent-b-lhr.xx.fbcdn.net *.akamaihd.net",
      'media-src': "'self'"
    };
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'auto';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
