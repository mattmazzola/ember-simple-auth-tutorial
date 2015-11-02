import Oauth2Bearer from 'torii/providers/oauth2-bearer';
import {configurable} from 'torii/configuration';

export default Oauth2Bearer.extend({
  name:    'microsoft-openidconnect',
  baseUrl: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
  responseType: 'id_token token',
  responseParams: ['token', 'id_token'],
  scope: configurable('scope', 'https://outlook.office.com/mail.read'), //'https://graph.windows.net/directory.read'

  redirectUri: configurable('redirectUri', function(){
    // A hack that allows redirectUri to be configurable
    // but default to the superclass
    return this._super();
  }),

  open: function() {
    return this._super().then(function(authData){
      // If the user hit 'cancel' or closed the pop-up throw error
      if (!authData.authorizationToken) {
        throw new Error('User canceled authorization');
      }

      const accessToken = authData.authorizationToken.token;
      // const idToken = authData.authorizationToken.id_token;
      // const [,idTokenPayload,] = idToken.split('.');
      // const userData = JSON.parse(atob(idTokenPayload));
      //
      // const normalizedUser = {
      //   accessToken,
      //   email: userData.email,
      //   id: userData.id
      // };
      //
      // return new Ember.RSVP.Promise(function(resolve, reject){
      //   Ember.$.ajax({
      //     url: 'https://www.googleapis.com/plus/v1/people/me',
      //     headers: { 'Authorization': `Bearer ${accessToken}` },
      //     success: Ember.run.bind(null, resolve),
      //     error: Ember.run.bind(null, reject)
      //   });
      // }).then(function(user){
      //   normalizedUser.id = user.id;
      //   normalizedUser.name = user.displayName;
      //   normalizedUser.profileImageUrl = user.image.url;
      //
      //   return normalizedUser;
      // });

      return authData;
    });
  }
});
