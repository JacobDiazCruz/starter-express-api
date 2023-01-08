import { InvalidPropertyError } from "../../helpers/errors.js"
import requiredParam from "../../helpers/required-param.js"
import { isValidLoginBy } from "../../helpers/is-valid.js"
import constants from "../../helpers/constants.js"

/* @Description: Validate each component keys
 * @Security: Layer 2 validation (key fields)
 * @Usage: before sending or retreiving response to DB
 */
export default function makeLoginTypeEntity(loginInfo = requiredParam("loginInfo")) {
  const validLoginType = validate(loginInfo)
  return Object.freeze(validLoginType)

  function validate({ type = requiredParam("type") } = {}) {
    validateLoginBy(type)
    return type
  }

  function validateLoginBy(type) {
    if (!type) throw new InvalidPropertyError(constants.REQUIRED_TYPE)
    if (!isValidLoginBy(type)) throw new InvalidPropertyError(constants.INVALID_TYPE)
  }
}
