import { InvalidPropertyError } from "../../helpers/errors.js"
import requiredParam from "../../helpers/required-param.js"
import { isValidEmail } from "../../helpers/is-valid.js"
import constants from "../../helpers/constants.js"

/* @Description: Validate each component keys
 * @Security: Layer 2 validation (key fields)
 * @Usage: before sending or retrieving response to DB
 */
export default function makeMailEntity(mailInfo = requiredParam("mailInfo")) {
     const validMailInfo = validate(mailInfo)
     return Object.freeze(validMailInfo)

     function validate({
          to = requiredParam("to"),
          subject = requiredParam("subject"),
          html = requiredParam("html"),
     } = {}) {
          validateTo(to)
          validateSubject(subject)
          validateHtml(html)
          return { to, subject, html }
     }

     function validateTo(to) {
          if (!to) throw new InvalidPropertyError(constants.REQUIRED_MAIL_TO)
          if (!isValidEmail(to)) throw new InvalidPropertyError(constants.INVALID_EMAIL)
     }

     function validateSubject(subject) {
          if (!subject) throw new InvalidPropertyError(constants.REQUIRED_MAIL_SUBJECT)
     }

     function validateHtml(html) {
          if (!html) throw new InvalidPropertyError(constants.REQUIRED_MAIL_HTML)
     }
}
