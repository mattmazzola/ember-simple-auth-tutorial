import Ember from 'ember';
import Oauth2Bearer from 'torii/providers/oauth2-bearer';
import {configurable} from 'torii/configuration';

export default Oauth2Bearer.extend({
  name:    'battlenet-oauth2authorization',
  baseUrl: 'https://us.battle.net/oauth/authorize',

  requiredUrlParams: ['display'],
  responseType: 'code',
  responseParams: ['code', 'state'],

  scope:        configurable('scope', 'sc2.profile'),

  display: 'popup',
  redirectUri: configurable('redirectUri', function(){
    // A hack that allows redirectUri to be configurable
    // but default to the superclass
    return this._super();
  }),

  open: function() {
    const key = 'pnk6ff85mpfm8emxfxbffegc5nyb6sbs';
    const secret = 'Shd3zaeXqXz9v2cByfQQ8gVjY7MGpYGk';

    return this._super().then(function(authData){
      // If the user hit 'cancel' or closed the pop-up throw error
      if (!authData.authorizationToken) {
        throw new Error('User canceled authorization');
      }

      const authorizationCode = authData.authorizationToken.code;
      const authorization = `Basic ${btoa(key + ':' + secret)}`;
      console.log(authorization, authorizationCode);

      return new Ember.RSVP.Promise(function(resolve, reject){
        Ember.$.ajax({
          method: 'POST',
          url: 'https://localhost:44300/api/token',
          contentType: "application/json; charset=UTF-8",
          dataType: 'json',
          data: JSON.stringify({
            'clientId': key,
            'grantType': 'authorization_code',
            'scope': 'sc2.profile',
            'code': authorizationCode,
            'redirectUri': 'https://localhost:4200/'
          }),
          processData: false,
          success: Ember.run.bind(null, resolve),
          error: Ember.run.bind(null, reject)
        });
      })
        .then(tokenData => {
          const accessToken = tokenData.access_token;

          return new Ember.RSVP.Promise(function(resolve, reject){
            Ember.$.ajax({
              url: 'https://us.api.battle.net/sc2/profile/user',
              headers: { 'Authorization': `Bearer ${accessToken}` },
              success: Ember.run.bind(null, resolve),
              error: Ember.run.bind(null, reject)
            });
          })
            .then(function(battleNetUser){
              const character = battleNetUser.characters[0];

              return {
                accessToken,
                email: battleNetUser.email,
                id: character.id,
                name: character.name,
                profileImageUrl: character.avatar.url
              };
            });
        });
    });
  },

  fetch: function(authData){
      return authData;
  }
});
