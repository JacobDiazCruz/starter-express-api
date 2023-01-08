import message from "../../helpers/constants.js"
import { makeHttpError, makeHttpSuccess } from "../../helpers/http-return.js"

export default function makeRegisterController({ register }) {
  return async function registerController(httpRequest) {
    try {
      // call action
      const registerInfo = httpRequest.body
      const result = await register(registerInfo)

      return makeHttpSuccess({
        statusCode: 201,
        message: message.REGISTER_SUCCESS,
        data: result.data
      })
    } catch (e) {
      return await makeHttpError(e)
    }
  }
}