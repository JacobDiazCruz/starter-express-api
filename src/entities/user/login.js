import { InvalidPropertyError } from "../../helpers/errors.js"
import requiredParam from "../../helpers/required-param.js"
import { isValidEmail } from "../../helpers/is-valid.js"
import constants from "../../helpers/constants.js"

/* @Description: Validate each component keys
 * @Security: Layer 2 validation (key fields)
 * @Usage: before sending or retreiving response to DB
 */
export default function makeLoginEntity(loginInfo = requiredParam("loginInfo")) {
  const validLogin = validate(loginInfo)
  return Object.freeze(validLogin)

  function validate({ email = requiredParam("email"), password = requiredParam("password") } = {}) {
    validateEmailAddress(email)
    validatePassword(password)
    return { email, password }
  }

  function validateEmailAddress(email) {
    if (!email) throw new InvalidPropertyError(constants.REQUIRED_EMAIL)
    if (!isValidEmail(email)) throw new InvalidPropertyError(constants.INVALID_EMAIL)
  }

  function validatePassword(password) {
    if (!password) throw new InvalidPropertyError(constants.REQUIRED_PASSWORD)
  }
}