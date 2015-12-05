import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {
  authorizer: 'authorizer:oauth2',
  host: 'https://localhost:44300',
  namespace: 'api',
  headers: {
    "RandomHeader": "RandomValue",
    "Content-Type": "application/json"
  }
});
