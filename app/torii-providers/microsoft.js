import Oauth2Bearer from 'torii/providers/oauth2-bearer';
import {configurable} from 'torii/configuration';

export default Oauth2Bearer.extend({
  name:    'microsoft-openidconnect',
  baseUrl: 'https://login.microsoftonline.com/common/oauth2/v2.0',

  // additional params that this provider requires
  optionalUrlParams: ['scope', 'request_visible_actions'],

  requestVisibleActions: configurable('requestVisibleActions', ''),

  responseParams: ['token', 'id_token'],

  scope: configurable('scope', 'email'),

  redirectUri: configurable('redirectUri', 'http://localhost:8000/oauth2callback')
});
