import {
    UniqueConstraintError,
    InvalidPropertyError,
    RequiredParameterError
  } from '../../helpers/errors.js'
  import { makeHttpError } from "../../helpers/http-return.js"
  
  export default function makeListPaths({ listPathsQuery }) {
    return async function handle(httpRequest) {
      try {
        const result = await listPathsQuery({
          userId: httpRequest.pathParams.id
        });
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
            message: 'Paths not found.'
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