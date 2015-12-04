import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

const {
  inject
} = Ember;

export default Ember.Route.extend(ApplicationRouteMixin, {
  sessionAccount: inject.service('session-account'),

  sessionAuthenticated() {
    var user = this.get('sessionAccount.userAccount');
    this.transitionTo('index.profile', user);
  }
});
