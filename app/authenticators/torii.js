import Ember from 'ember';
import Torii from 'ember-simple-auth/authenticators/torii';

export default Torii.extend({
  torii: Ember.inject.service('torii'),

  restore(authData) {
    return new Ember.RSVP.Promise((resolve, reject) => {
      // Check that accessToken is not expired.
      if(authData.accessToken) {
          resolve(authData);
      }
    });
  }
});
