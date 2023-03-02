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
 * @description Check user accessToken and return user details if valid
 * @method POST
 * @Status ongoing
 */
export default function makeCheckToken({
  getTokenQuery,
  getProfileQuery,
  getUserQuery
}) {
  return async function handle(accessToken) {
    try {
      const tokenDetails = await getTokenDetails(accessToken)
      const result = await getTokenQuery({
        userId: tokenDetails.userId,
        accessToken: accessToken,
        email: tokenDetails.email
      })
			// get user details
			const user = await getUserQuery({
				userId: tokenDetails.userId
			})
      // get profile details
      const profile = await getProfileQuery({
        profileId: tokenDetails.profileId
      })

      // return
      if (result) {
        return {
          headers: {
            'Content-Type': 'application/json'
          },
          statusCode: 200,
          data: {
            user: {
              ...result,
              _id: tokenDetails.userId,
              membershipDetails: user?.membershipDetails
            },
            profile: {
              ...profile
            }
          },
          message: 'Valid token!'
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