import {
  updateAuditLogQuery
} from "../../database/audit-log.js";
import { getTokenDetails } from "../../helpers/jwt.js";

export const updateAuditLog = async (httpRequest) => {
  try {
    // get user info from token
    const tokenDetails = getTokenDetails(httpRequest.headers.authorization);

    // query
    const res = updateAuditLogQuery({
      userId: tokenDetails.userId,
      payload: httpRequest.body
    });

    return {
      headers: {
        'Content-Type': 'application/json'
      },
      statusCode: 200,
      success: true,
      message: `${httpRequest.body.field} performed successfully!`,
      data: res
    };
  } catch(err) {
    console.log(err);
  }
};