import message from "../../helpers/constants.js"
import { makeHttpError, makeHttpSuccess } from "../../helpers/http-return.js"

export default function makeLogoutController({ logoutUser }) {
  return async function logoutController(httpRequest) {
    try {
      let authHeader = httpRequest.headers.authorization
      // validate auth token
      if (!authHeader) {
        return makeHttpError({
          statusCode: 401,
          errorMessage: message.errorUnauthorized
        })
      }

      // call action
      const accessToken = authHeader && authHeader.split(' ')[1]
      const result = await logoutUser(accessToken)
      if (result) {
        return makeHttpSuccess(result)
      }
    } catch (err) {
      return await makeHttpError(err)
    }
  }
}