import {
  verifyAccessToken,
  getTokenDetails
} from "../../helpers/jwt.js"
import message from "../../helpers/constants.js"

export default function makeRefreshTokenController() {
  return async function refreshTokenController(req, res) {
    if (!req.headers.authorization) {
      return makeHttpError({
        statusCode: 400,
        errorMessage: message.errorUnauthorized
      })
    }
    try {
      const payload = await verifyAccessToken(authHeader)
      const requestData = {
        name: payload.name,
        profileId: payload.profileId,
        emailAddress: payload.emailAddress,
        userId: payload.userId,
        role: payload.role,
        referrer: 'from_refresh_api'
      }

      const authDetails = await getTokenDetails(accessToken)
      const result = {
        accessToken: accessToken,
        userId: authDetails.userId,
        profileId: authDetails.profileId,
        name: authDetails.name,
        expiration: authDetails.exp,
      }
      res.send({
        statusCode: 200,
        data: result
      })
    } catch (err) {
      res.status(500).end()
    }
  }
}