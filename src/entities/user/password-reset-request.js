import { InvalidPropertyError } from "../../helpers/errors.js"
import requiredParam from "../../helpers/required-param.js"
import { isValidEmail } from "../../helpers/is-valid.js"
import constants from "../../helpers/constants.js"

/* @Description: Validate each component keys
 * @Security: Layer 2 validation (key fields)
 * @Usage: before sending or retrieving response to DB
 */
export default function makePasswordResetRequestEntity(
  passwordResetRequestInfo = requiredParam("passwordResetRequestInfo")
) {
  const validPasswordResetRequestInfo = validate(passwordResetRequestInfo)
  return Object.freeze(validPasswordResetRequestInfo)

  function validate({ emailAddress = requiredParam("emailAddress") } = {}) {
    validateEmailAddress(emailAddress)
    return { emailAddress }
  }

  function validateEmailAddress(emailAddress) {
    if (!emailAddress) throw new InvalidPropertyError(constants.REQUIRED_EMAIL)
    if (!isValidEmail(emailAddress)) throw new InvalidPropertyError(constants.INVALID_EMAIL)
  }
}
