import { makeHttpError, makeHttpSuccess } from "../../helpers/http-return.js"

export default function makeLoginGoogleController({ loginGoogle }) {
  return async function loginGoogleController(httpRequest) {
    try {
      // call action
      const loginPayload = httpRequest.body
      const result = await loginGoogle(loginPayload)
      return await result
    } catch (e) {
      return await makeHttpError(e)
    }
  }
}