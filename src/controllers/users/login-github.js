import { makeHttpError, makeHttpSuccess } from "../../helpers/http-return.js"

export default function makeLoginGithubController({ loginGithub }) {
  return async function loginGithubController(httpRequest) {
    try {
      // call action
      const loginPayload = httpRequest.body
      const result = await loginGithub(loginPayload)
      return await result
    } catch (e) {
      return await makeHttpError(e)
    }
  }
}