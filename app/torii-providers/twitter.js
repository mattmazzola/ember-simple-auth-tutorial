import Provider from 'torii/providers/twitter-oauth1';

export default Provider.extend({
  fetch(data) {
    return data;
  },

  open: function() {
    return this._super()
      .then(function(authData){
        // If the user hit 'cancel' or closed the pop-up throw error
        if (!authData.authorizationToken) {
          throw new Error('User canceled authorization');
        }

        //const accessToken = authData.authorizationToken.token;

        return authData;
      });
  },

  fetch: function(authData){
      return authData;
  }
});
