import Ember from 'ember';
import DS from 'ember-data';

export default Ember.Service.extend({
  session: Ember.inject.service('session'),
  store: Ember.inject.service('store'),

  userId: Ember.computed('session.data.authenticated.userId', function() {
    const userId = this.get('session.data.authenticated.userId');
    return userId;
  })

  // userId: Ember.computed('session.data.authenticated.userId', function() {
  //   const accountId = this.get('session.data.authenticated.userId');
  //   if (!Ember.isEmpty(accountId)) {
  //     return DS.PromiseObject.create({
  //       promise: this.get('store').find('account', accountId)
  //     });
  //   }
  // })
});
