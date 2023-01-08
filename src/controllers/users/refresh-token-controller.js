import {
  verifyRefreshToken,
  signAccessToken,
  getTokenDetails
} from "../../helpers/jwt.js"
import message from "../../helpers/constants.js"

export default function makeRefreshTokenController() {
  return async function refreshTokenController(req, res) {
    if (
      Object.entries(req.cookies).length === 0 ||
      !req.body
    ) {
      res
        .status(400)
        .send({
          statusCode: 400,
          message: message.BAD_REQUEST_NO_COOKIE
        })
    }
    try {
      const authHeader = req.cookies.refresh_token
      const payload = await verifyRefreshToken(authHeader)

      const requestData = {
        name: payload.name,
        profileId: payload.profileId,
        emailAddress: payload.emailAddress,
        userId: payload.userId,
        role: payload.role,
        referrer: 'from_refresh_api'
      }

      const accessToken = await signAccessToken(requestData)
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