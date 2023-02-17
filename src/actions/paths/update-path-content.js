import {
    UniqueConstraintError,
    InvalidPropertyError,
    RequiredParameterError
  } from '../../helpers/errors.js'
  import { makeHttpError } from "../../helpers/http-return.js"
  
  export default function makeUpdatePathContent({ updatePathContentQuery }) {
    return async function handle(httpRequest) {
      try {
        let totalResult = 0
        httpRequest.body.contents.forEach((content) => {
          if(content?.question.correctAnswer === content?.question.selectedAnswer) {
            totalResult += 1
          }
        });
        const result = await updatePathContentQuery({
          userId: httpRequest.pathParams.id,
          pathId: httpRequest.body.pathId,
          totalResult: totalResult.toString(),
          contents: httpRequest.body.contents
        });

        if (result) {
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