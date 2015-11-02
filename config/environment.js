/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'ember-simple-auth-test-01',
    podModulePrefix: 'ember-simple-auth-test-01/pods',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  ENV.torii = {
    providers: {
      'google-openidconnect': {
        apiKey: '983545451005-ha2n1avpb7t3849m912pji5b6ed8vonf.apps.googleusercontent.com'
      },
      'facebook-oauth2implicit': {
        apiKey: '631252926924840'
      },
      'microsoft-openidconnect': {
        apiKey: '3cf52a90-abe9-4081-8335-3a8a3b537cdb'
      },
      'twitter': {
        requestTokenUri: 'https://api.twitter.com/oauth/authorize',
        apiKey: 'C3eflLXM9qgbSugR0FENBEOFJ'
      },
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
