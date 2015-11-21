import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

const {
  inject
} = Ember;

export default Ember.Route.extend(ApplicationRouteMixin, {
  sessionAccount: Ember.inject.service('session-account'),

  sessionAuthenticated() {
    var user = this.get('sessionAccount.userAccount');
    if(!user.content) {
      this.transitionTo('index.profile');
    }
    else {
      let attemptedTransition = this.get('session.attemptedTransition');
      if (attemptedTransition) {
        attemptedTransition.retry();
        this.set('session.attemptedTransition', null);
      } else {
        this.transitionTo(Configuration.routeAfterAuthentication);
      }
    }
  }
});
