import {
  UniqueConstraintError,
  InvalidPropertyError,
  RequiredParameterError
} from '../../helpers/errors.js'
// import makeHttpError from '../../helpers/http-error.js'

export default function makeRemoveProfile({ removeProfileQuery }) {
  return async function handle(httpRequest) {
    try {
      const getResult = await getProfiles(httpRequest)
      if (getResult.data) {
        const { id } = httpRequest.pathParams || {}
        await removeProfileQuery(id)

        return {
          headers: {
            'Content-Type': 'application/json'
          },
          statusCode: 200,
          data: 'Profile successfully removed.'
        }
      } else {
        return {
          headers: {
            'Content-Type': 'application/json'
          },
          statusCode: 400,
          data: 'No profile found.'
        }
      }
    } catch (e) {
      // return makeHttpError({
      //   errorMessage: e.message,
      //   statusCode:
      //     e instanceof UniqueConstraintError
      //       ? 409
      //       : e instanceof InvalidPropertyError ||
      //         e instanceof RequiredParameterError
      //         ? 400
      //         : 500
      // })
    }
  }
}