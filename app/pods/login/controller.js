import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),

  actions: {
    authenticateWithBattlenet() {
      this.get('session').authenticate('authenticator:torii', 'battlenet');
    },
    authenticateWithFacebook() {
      this.get('session').authenticate('authenticator:torii', 'facebook');
    },
    authenticateWithGoogle() {
      this.get('session').authenticate('authenticator:torii', 'google');
    },
    authenticateWithMicrosoft() {
      this.get('session').authenticate('authenticator:torii', 'microsoft');
    }

  }
});
