import {
  UniqueConstraintError,
  InvalidPropertyError,
  RequiredParameterError
} from '../../helpers/errors.js'
import { makeHttpError, makeHttpSuccess } from "../../helpers/http-return.js"

export default function makeListProfile({ listProfileQuery }) {
  return async function handle(httpRequest) {
    try {
      const result = await listProfileQuery(httpRequest)
      if (result) {
        return {
          headers: {
            'Content-Type': 'application/json'
          },
          statusCode: 200,
          data: result
        }
      } else {
        return {
          statusCode: 404,
          data: result,
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