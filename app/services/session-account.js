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
    return DS.PromiseObject.create({
      promise: this.get('store').find('user', userId)
    });
  })
});
