import Ember from 'ember';

export default Ember.Route.extend({
  afterModel: function(user, transition) {
    // If there is no user model, continue to profile page
    // Otherwise, go to the last attempted transition.
    if(!user) {
      return this._super.apply(this, user, transition);
    }

    let attemptedTransition = this.get('session.attemptedTransition');
    if (attemptedTransition) {
      attemptedTransition.retry();
      this.set('session.attemptedTransition', null);
    }
  }
});
