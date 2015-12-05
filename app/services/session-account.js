import Ember from 'ember';
import DS from 'ember-data';

export default Ember.Service.extend({
  session: Ember.inject.service('session'),
  store: Ember.inject.service('store'),

  user: Ember.computed('session.data.authenticated', function() {
    const user = this.get('session.data.authenticated');
    return user;
  }),

  userAccount: Ember.computed('session.data.authenticated.id', function() {
    const userId = this.get('session.data.authenticated.id');
    
    const userPromise = new Ember.RSVP.Promise(resolve => {
      if(userId) {
        return this.get('store').find('user', userId)
          .catch(error => {
            const newUser = this.get('store').createRecord('user', {
              id: userId,
              battleNetId: userId,
              // TODO: Remove, just make API happy
              pointsEarned: 0,
              pointsSpent: 0,
              role: 0,
              created: "2015-01-01T00:00:00Z"
            });

            return newUser.save();
          });
      }
      else {
        resolve(null);
      }
    });

    return DS.PromiseObject.create({
      promise: userPromise
    });
  })
});
