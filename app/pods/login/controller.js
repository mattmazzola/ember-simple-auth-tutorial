import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),

  actions: {
    authenticateWithFacebook() {
      this.get('session').authenticate('authenticator:torii', 'facebook');
    },
    authenticateWithTwitter() {
      console.log('twitter');
    },
    authenticateWithGoogle() {
      console.log('google');
    },
    authenticateWithMicrosoft() {
      console.log('microsoft');
    }

  }
});
