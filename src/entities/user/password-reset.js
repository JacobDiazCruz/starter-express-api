import { InvalidPropertyError } from "../../helpers/errors.js"
import requiredParam from "../../helpers/required-param.js"
import { isValidEmail } from "../../helpers/is-valid.js"
import constants from "../../helpers/constants.js"

/* @Description: Validate each component keys
 * @Security: Layer 2 validation (key fields)
 * @Usage: before sending or retreiving response to DB
 */
export default function makePasswordResetEntity(passwordResetInfo = requiredParam("passwordResetInfo")) {
     const validPasswordResetInfo = validate(passwordResetInfo)
     return Object.freeze(validPasswordResetInfo)

     function validate({ emailAddress = requiredParam("emailAddress"), password = requiredParam("password") } = {}) {
          validateEmailAddress(emailAddress)
          validatePassword(password)
          return { emailAddress, password }
     }

     function validateEmailAddress(emailAddress) {
          if (!emailAddress) throw new InvalidPropertyError(constants.REQUIRED_EMAIL)
          if (!isValidEmail(emailAddress)) throw new InvalidPropertyError(constants.INVALID_EMAIL)
     }

     function validatePassword(password) {
          if (!password) throw new InvalidPropertyError(constants.REQUIRED_PASSWORD)
     }
}
