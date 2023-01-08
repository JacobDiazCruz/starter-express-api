import {
  UniqueConstraintError,
  InvalidPropertyError,
  RequiredParameterError
} from '../../helpers/errors.js'
import { makeHttpError } from "../../helpers/http-return.js"

export default function makeGetProfile({ getProfileQuery }) {
  return async function handle(httpRequest) {
    try {
      // Query db
      const result = await getProfileQuery({
        profileId: httpRequest.pathParams.id
      })

      // return
      if (result) {
        return {
          headers: {
            'Content-Type': 'application/json'
          },
          statusCode: 200,
          success: true,
          message: 'Profile found.',
          data: result
        }
      } else {
        return {
          statusCode: 404,
          data: result,
          success: false,
          message: 'Profile not found.'
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