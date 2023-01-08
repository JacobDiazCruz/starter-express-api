export class UniqueConstraintError extends Error {
  constructor(msg) {
    super(msg)

    this.statusCode = 409

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UniqueConstraintError)
    }
  }
}

export class InvalidPropertyError extends Error {
  constructor(msg) {
    super(msg)

    this.statusCode = 400

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, InvalidPropertyError)
    }
  }
}

export class BadRequestError extends Error {
  constructor(msg) {
    super(msg)

    this.statusCode = 400

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, BadRequestError)
    }
  }
}

export class UnauthorizedError extends Error {
  constructor(msg) {
    super(msg)

    this.statusCode = 401

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UnauthorizedError)
    }
  }
}

export class RequiredParameterError extends Error {
  constructor(param) {
    super(`${param} can not be null or undefined.`)

    this.statusCode = 400

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, RequiredParameterError)
    }
  }
}
