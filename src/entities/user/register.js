import { InvalidPropertyError } from "../../helpers/errors.js"
import requiredParam from "../../helpers/required-param.js"
import { isValidEmail } from "../../helpers/is-valid.js"
import constants from "../../helpers/constants.js"

/* @Description: Validate each component keys
 * @Security: Layer 2 validation (key fields)
 * @Usage: before sending or retreiving response to DB
 */
export default function makeRegisterEntity(registerInfo = requiredParam("registerInfo")) {
  const validRegister = validate({
    isVerified: 1,
    role: 1,
    ...registerInfo
  })
  return Object.freeze(validRegister)

  function validate({
    firstName = requiredParam("firstName"),
    lastName = requiredParam("lastName"),
    email = "email",
    password = requiredParam("password"),
    type = requiredParam("type"),
    role,
    isVerified,
  } = {}) {
    validateFirstName(firstName)
    validateLastName(lastName)
    // NOTE: Remove temporarily, github doesnt require email
    // validateEmailAddress(email)
    validatePassword(password)
    validateType(type)
    return { firstName, lastName, email, password, type, role, isVerified }
  }

  function validateFirstName(name) {
    if (!name) {
      return 'First name is required.'
    }
  }

  function validateLastName(name) {
    if (!name) {
      return 'Last name is required.'
    }
  }

  function validateEmailAddress(emailAddress) {
    // if (!emailAddress) throw new InvalidPropertyError(constants.REQUIRED_EMAIL)
    if (!isValidEmail(emailAddress)) throw new InvalidPropertyError(constants.INVALID_EMAIL)
  }

  function validatePassword(password) {
    if (!password) throw new InvalidPropertyError(constants.REQUIRED_PASSWORD)
  }

  function validateType(type) {
    if (!type) throw new InvalidPropertyError(constants.REQUIRED_TYPE)
  }
}
