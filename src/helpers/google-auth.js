const config = require('config')
const authGoogle = require('google-auth-library')

const EXTERNAL_AUTH_ENV = config.get("externalAuth")

export function googleAuth() {
  const { OAuth2Client } = authGoogle

  return {
    client: new OAuth2Client(EXTERNAL_AUTH_ENV.google.clientId),
    clientId: EXTERNAL_AUTH_ENV.google.clientId,
  }
}

export default googleAuth