const config = {
    client: {
      id: '<client-id>',
      secret: '<client-secret>'
    },
    auth: {
      tokenHost: 'https://api.oauth.com'
    }
};
   
const { ClientCredentials, ResourceOwnerPassword, AuthorizationCode } = require('simple-oauth2');


async function run() {
    const client = new ResourceOwnerPassword(config);
   
    const tokenParams = {
      username: 'username',
      password: 'password',
      scope: '<scope>',
    };
   
    try {
      const accessToken = await client.getToken(tokenParams);
    } catch (error) {
      console.log('Access Token Error', error.message);
    }
}
   
  run();