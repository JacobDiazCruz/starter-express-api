import {
  UniqueConstraintError,
  InvalidPropertyError,
  RequiredParameterError
} from '../../helpers/errors.js'
import { makeHttpError } from '../../helpers/http-return.js'
import message from '../../helpers/constants.js'

export default function makePostUploadController({ uploadProfile }) {
  return async function postUploadController(httpRequest) {
    try {
      // validate auth token
      if (!httpRequest.headers.authorization) {
        return makeHttpError({
          statusCode: 401,
          errorMessage: message.errorUnauthorized
        })
      }

      // call action
      const httpResult = await uploadProfile(httpRequest)
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