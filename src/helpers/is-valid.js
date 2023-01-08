import constants from "./constants.js"
import { InvalidPropertyError } from "./errors.js";

const isValidEmail = (email) => new RegExp(/^[^@\s]+@[^@\s]+\.[^@\s]+$/).test(email)
const isValidLoginBy = (loginBy) => constants.VALID_LOGIN_BY.includes(loginBy)

const isValidNumber = (quantity) => {
    if (!quantity)
        throw new InvalidPropertyError(constants.REQUIRED_QUANTITY);
    if (typeof quantity !== 'number')
        throw new InvalidPropertyError(constants.QUANTITY_IS_NUMBER);
    if ((quantity - Math.floor(quantity) !== 0))
        throw new InvalidPropertyError(constants.QUANTITY_WHOLE_NUMBER);
}
export { isValidEmail, isValidLoginBy, isValidNumber }
