// import { writeLog } from "./log.js"

/**
 *
 * TODO: should have trace the params as well
 */

const makeHttpError = async ({ errorMessage, statusCode = 500, stack, cookie = null }) => {
  // if (statusCode === 400 || statusCode === 500) await writeLog({ message, statusCode, stack })
  return {
    headers: {
      "Content-Type": "application/json",
    },
    statusCode: statusCode,
    cookie: cookie,
    data: {
      success: false,
      message: errorMessage
    },
  }
}

const makeHttpSuccess = ({ statusCode, message, data, cookie = null }) => {
  return {
    headers: {
      'Content-Type': 'application/json'
    },
    statusCode,
    cookie: cookie,
    data: {
      success: true,
      message: message,
      data: data
    }
  }
}

export {
  makeHttpSuccess,
  makeHttpError
}