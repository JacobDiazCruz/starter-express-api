import { makeHttpError } from '../../helpers/http-return.js'
import {
  UniqueConstraintError,
  InvalidPropertyError,
  RequiredParameterError
} from '../../helpers/errors.js'
import message from '../../helpers/constants.js'

export default function makeUpdateProfileController({ updateProfile }) {
  return async function updateProfileController(httpRequest) {
    try {
      // validate auth token
      if (!httpRequest.headers.authorization) {
        return makeHttpError({
          statusCode: 401,
          errorMessage: message.errorUnauthorized
        })
      }
      if (Object.keys(httpRequest.body).length === 0) {
        return makeHttpError({
          statusCode: 400,
          errorMessage: message.badRequestBody
        })
      }

      // call action
      const httpResult = await updateProfile(httpRequest)
      return httpResult
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