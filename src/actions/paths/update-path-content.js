import {
    UniqueConstraintError,
    InvalidPropertyError,
    RequiredParameterError
  } from '../../helpers/errors.js'
  import { makeHttpError } from "../../helpers/http-return.js"
  
  export default function makeUpdatePathContent({ 
    updatePathContentQuery,
    updateTotalResultQuery
  }) {
    return async function handle(httpRequest) {
      try {
        let response
        if(httpRequest.body?.read) {
          response = await updateTotalResultQuery({
            userId: httpRequest.pathParams.id,
            pathId: httpRequest.body.pathId,
            totalResult: "1",
          });
        } else if (httpRequest.body?.contents.length) {
          let totalResult = 0
          httpRequest.body.contents.forEach((content) => {
            if(content?.question.correctAnswer === content?.question.selectedAnswer) {
              totalResult += 1
            }
          });
          response = await updatePathContentQuery({
            userId: httpRequest.pathParams.id,
            pathId: httpRequest.body.pathId,
            totalResult: totalResult.toString(),
            contents: httpRequest.body.contents
          });
        }

        // response
        if (response) {
          return {
            headers: {
              'Content-Type': 'application/json'
            },
            statusCode: 200,
            data: "Path's contents updated successfully."
          }
        } else {
          return {
            statusCode: 404,
            data: response,
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