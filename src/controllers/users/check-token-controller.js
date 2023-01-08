import { verifyAccessToken } from "../../helpers/jwt.js"
import message from "../../helpers/constants.js"
import { makeHttpError, makeHttpSuccess } from "../../helpers/http-return.js"

export default function makeCheckTokenController({ checkToken }) {
  return async function checkTokenController(httpRequest) {
    try {
      let authHeader = httpRequest.headers.authorization
      // validate auth token
      if (!authHeader) {
        return makeHttpError({
          statusCode: 401,
          errorMessage: message.errorUnauthorized
        })
      }

      // check access token from JWT
      const verified = await verifyAccessToken(authHeader)

      // check access token from DB
      if (verified) {
        const accessToken = authHeader && authHeader.split(' ')[1]
        const result = await checkToken(accessToken)
        if (result) {
          return makeHttpSuccess(result)
        }
      }
    } catch (err) {
      return await makeHttpError(err)
    }
  }
}