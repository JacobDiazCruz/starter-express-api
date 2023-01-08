import {
  UniqueConstraintError,
  InvalidPropertyError,
  RequiredParameterError
} from '../../helpers/errors.js'

export default function makeUpdateReputationController({ updateReputation }) {
  return async function updateReputationController(httpRequest) {
    try {
      const httpResult = await updateReputation(httpRequest)
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