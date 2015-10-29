import Ember from 'ember';

export default Ember.Service.extend({
  session: Ember.inject.service('session'),
  store: Ember.inject.service('store'),

  account: Ember.computed('session.data.authenticated.account_id', function() {
    const accountId = this.get('session.data.authenticated.account_id');
    if (!Ember.isEmpty(accountId)) {
      return DS.PromiseObject.create({
        promise: this.get('store').find('account', accountId)
      });
    }
  })
});
