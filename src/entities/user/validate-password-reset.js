import { InvalidPropertyError } from "../../helpers/errors.js"
import requiredParam from "../../helpers/required-param.js"
import { isValidEmail } from "../../helpers/is-valid.js"
import constants from "../../helpers/constants.js"

/* @Description: Validate each component keys
 * @Security: Layer 2 validation (key fields)
 * @Usage: before sending or retreiving response to DB
 */
export default function makeValidatePasswordResetEntity(
  validatePasswordResetInfo = requiredParam("validatePasswordResetInfo")
) {
  const validPasswordResetInfo = validate(validatePasswordResetInfo)
  return Object.freeze(validPasswordResetInfo)

  function validate({ emailAddress = requiredParam("emailAddress"), code = requiredParam("code") } = {}) {
    validateEmailAddress(emailAddress)
    validateCode(code)
    return { emailAddress, code }
  }

  function validateEmailAddress(emailAddress) {
    if (!emailAddress) throw new InvalidPropertyError(constants.REQUIRED_EMAIL)
    if (!isValidEmail(emailAddress)) throw new InvalidPropertyError(constants.INVALID_EMAIL)
  }

  function validateCode(code) {
    if (!code) throw new InvalidPropertyError(constants.REQUIRED_CODE)
  }
}
