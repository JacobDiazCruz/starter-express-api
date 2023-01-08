import { InvalidPropertyError } from "../../helpers/errors.js"
import requiredParam from "../../helpers/required-param.js"
import constants from "../../helpers/constants.js"

/* @Description: Validate each component keys
 * @Security: Layer 2 validation (key fields)
 * @Usage: before sending or retreiving response to DB
 */
export default function makeLoginGoogleEntity(loginInfo = requiredParam("loginInfo")) {
  const validLogin = validate(loginInfo)
  return Object.freeze(validLogin)

  function validate({ token = requiredParam("token") } = {}) {
    validateToken(token)
    return { token }
  }

  function validateToken(token) {
    if (!token) throw new InvalidPropertyError(constants.REQUIRED_TOKEN)
  }
}
