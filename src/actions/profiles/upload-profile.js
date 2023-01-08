import {
  UniqueConstraintError,
  InvalidPropertyError,
  RequiredParameterError
} from '../../helpers/errors.js'
import { makeHttpError, makeHttpSuccess } from "../../helpers/http-return.js"
import { uploadImage } from '../../helpers/cloudinary.js'
import { getTokenDetails } from '../../helpers/jwt.js'
// import sharp from 'sharp'

/** 
 * @author Jacob
 * @method POST
 * @description upload profile image to multer, then remove file from ./assets dir
 * @Status done
 */
export default function makeUploadProfile({ updateProfileImageQuery }) {
  return async function handle(httpRequest) {
    let profileInfo = httpRequest.body
    if (!profileInfo) {
      return makeHttpError({
        statusCode: 400,
        errorMessage: 'Bad request. No POST body.'
      })
    }
    try {
      // ========== Decode token and get user info ===============
      const tokenDetails = getTokenDetails(httpRequest.headers.authorization)

      // upload to cloudinary
      const originalFile = { ...httpRequest.file }
      const thumbFile = { ...httpRequest.file }
      const result = await uploadImage(originalFile.path)

      // query db
      await updateProfileImageQuery({
        profileId: tokenDetails.profileId,
        file: {
          originalImage: result.url,
          thumbnailImage: result.url
        }
      })

      // return http response
      return {
        statusCode: 201,
        data: {
          original_url: result.url,
          thumbnail_url: result.url
        },
        message: 'Profile uploaded successfully!'
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