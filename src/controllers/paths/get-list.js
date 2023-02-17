import {
  UniqueConstraintError,
  InvalidPropertyError,
  RequiredParameterError
} from '../../helpers/errors.js'
import message from '../../helpers/constants.js'
import { makeHttpError } from '../../helpers/http-return.js'

export default function makeGetListController({ listPaths }) {
  return async function getPathsListController(httpRequest) {
    try {
      // validate auth token
      if (!httpRequest.headers.authorization) {
        return makeHttpError({
          statusCode: 401,
          errorMessage: message.errorUnauthorized
        })
      }

      const httpResult = await listPaths(httpRequest)
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