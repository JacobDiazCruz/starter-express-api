import {
  UniqueConstraintError,
  InvalidPropertyError,
  RequiredParameterError
} from '../../helpers/errors.js'
import { makeHttpError, makeHttpSuccess } from "../../helpers/http-return.js"
import { getTokenDetails } from '../../helpers/jwt.js'
import makeAuditLog from "../../entities/user/audit-log.js"

/**
 * @author Jacob
 * @description Submit mentorship request
 * @method POST
 * @Status ongoing
 */
export default function makeLogoutUser({ removeTokenQuery }) {
  return async function handle(accessToken) {
    try {
      const tokenDetails = await getTokenDetails(accessToken)
      const result = await removeTokenQuery({
        userId: tokenDetails.userId,
        accessToken: accessToken
      })
      if (result) {
        return {
          headers: {
            'Content-Type': 'application/json'
          },
          statusCode: 201,
          data: {},
          message: 'Request submitted successfully!'
        }
      }
    } catch (e) {
      return makeHttpError({
        errorMessage: e.message,
        statusCode:
          e instanceof UniqueConstraintError
            ? 409
            : e instanceof InvalidPropertyError ||
              e instanceof RequiredParameterError
              ? 400
              : 500
      })
    }
  }
}