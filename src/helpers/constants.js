export default Object.freeze({
  API_START: "started at",
  DB_START: "Database connected at",
  METHOD_NOT_ALLOWED: "method not allowed.",
  PING_SUCCESS: "I'm alive!",

  // Login types
  VALID_LOGIN_BY: ["native", "google"],
  LOGIN_BY_GOOGLE: "google",

  // http 200 messages
  PASSWORD_RESET_REQUEST_SUCCESS: "Password reset request successfully.",
  VALID_PASSWORD_RESET_CODE: "Valid password reset code.",
  PASSWORD_RESET_SUCCESS: "Password reset successfully.",
  LOGIN_SUCCESS: "Login Successfully",
  REGISTER_SUCCESS: "User registered successfully.",
  VERIFY_CODE_SUCCESS: "User verified successfully.",
  BUY_COIN_SUCCESS: "Coins are added wallet successfully!",
  GET_COIN_SUCCESS: "User current wallet was fetched successfully.",

  // Invalid & Required property errors
  REQUIRED_EMAIL: "Email address is required.",
  REQUIRED_PASSWORD: "Password is required.",
  REQUIRED_CODE: "Code is required.",
  REQUIRED_TOKEN: "Token is required.",
  REQUIRED_ACCESS_TOKEN: "Access token is required.",
  REQUIRED_REFRESH_TOKEN: "Refresh token is required.",
  REQUIRED_ROLE: "Role is required.",
  REQUIRED_TYPE: "Type is required.",
  REQUIRED_ID: "_id is required.",
  INVALID_EMAIL: "Invalid email address.",
  INVALID_PASSWORD_RESET_LINK: "Invalid password reset link.",
  INVALID_TYPE: "Invalid type.",
  REQUIRED_QUANTITY: "Quantity is required.",

  // Unique constraint errors
  EXISTING_EMAIL: "Email Address already exist.",

  // Unauthorized errors
  INCORRECT_PASSWORD: "Incorrect password.",
  NOT_FOUND_EMAIL: "Email address not found.",
  INVALID_TOKEN: "Invalid token.",

  // Bad request errors
  BAD_REQUEST_NO_POST_BODY: "Bad request. No POST body.",
  BAD_REQUEST_NO_QUERY_PARAMS: "Bad request. No query param/s.",
  BAD_REQUEST_NO_COOKIE: "Bad request. No cookie",

  // Mail template required properties
  REQUIRED_MAIL_TO: "Mail to is required.",
  REQUIRED_MAIL_FROM: "Mail from is required.",
  REQUIRED_MAIL_SUBJECT: "Mail subject is required.",
  REQUIRED_MAIL_HTML: "Mail html is required.",

  // CONTENTS Success messages
  successDraft: "Success! Draft has been created.",
  successUnpublished: "Success! Unpublished content has been created.",
  successGetContent: "Success! Content fetched.",
  successDelete: "Success! Content has been deleted.",
  successUpdate: "Success! Content has been updated.",

  // CONTENTS Error messages
  errorTitle: "Title already exist.",
  errorContentNotFound: "Content not found.",
  errorInvalidToken: "Invalid token.",
  errorUnauthorized: "Unauthorized",
  errorNoContentId: "Unauthorized. No content Id.",

  // Bad request errors
  badRequestBody: "Bad request. No POST body.",

  // Type of field errors
  QUANTITY_IS_NUMBER:"Quantity field must a number not a string.",
  QUANTITY_WHOLE_NUMBER:"Quantity field only allow whole numbers.",

})
