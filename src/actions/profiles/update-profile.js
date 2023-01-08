import {
  UniqueConstraintError,
  InvalidPropertyError,
  RequiredParameterError
} from '../../helpers/errors.js'
import { makeHttpError, makeHttpSuccess } from "../../helpers/http-return.js"
import makeProfileEntity from '../../entities/profile/profile.js'
import { getTokenDetails } from '../../helpers/jwt.js'
import makeAuditLog from "../../entities/user/audit-log.js"

/**
 * @author Jacob
 * @description update profile data
 * @method PUT
 * @Status ongoing
 * @step1 Validate user_id by get user api
 * @step2 Validate profile_id by get profile
 * @step3 Update profile
 */
export default function makeUpdateProfile({ getProfileQuery, updateProfileQuery }) {
  return async function handle(httpRequest) {
    let profileInfo = httpRequest.body
    if (!profileInfo) {
      return makeHttpError({
        statusCode: 400,
        errorMessage: 'Bad request. No PUT body.'
      })
    }

    // @usage: for Formdata payload
    if (typeof httpRequest.body.body === 'string') {
      try {
        profileInfo = JSON.parse(httpRequest.body.body)
      } catch {
        return makeHttpError({
          statusCode: 400,
          errorMessage: 'Bad request. PUT body must be valid JSON.'
        })
      }
    }

    try {
      // ========== Decode token and get user info ===============
      const tokenDetails = getTokenDetails(httpRequest.headers.authorization)

      // ========== @ STEP 1: validate user_id if it exists ============
      const requestData = makeAuditLog(makeProfileEntity({
        ...httpRequest.body,
        userId: tokenDetails.userId
      }))

      // ========== @ STEP 2: validate profile_id if it exists ============
      const getProfileIdResult = await getProfileQuery({
        profileId: tokenDetails.profileId
      })

      if (getProfileIdResult) {
        // ========== @ STEP 3: update/store profile to db ============
        await updateProfileQuery(tokenDetails.profileId, requestData)
        return {
          headers: {
            'Content-Type': 'application/json'
          },
          statusCode: 201,
          success: true,
          message: 'Profile updated successfully!',
          data: {},
        }
      } else {
        return makeHttpError({
          errorMessage: 'Profile not found.',
          statusCode: 500,
          data: {}
        })
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