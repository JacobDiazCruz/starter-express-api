import {
	UniqueConstraintError,
	InvalidPropertyError,
	RequiredParameterError,
} from '../../helpers/errors.js';
import { makeHttpError, makeHttpSuccess } from '../../helpers/http-return.js';
import makeProfileEntity from '../../entities/profile/profile.js';
import { getTokenDetails } from '../../helpers/jwt.js';
import makeAuditLog from '../../entities/user/audit-log.js';

/**
 * @author Robb
 * @description update user data
 * @method PUT
 * @Status done
 * @step1 Validate user_id by get user api
 * @step3 Update user
 */
export default function makeUpdateUser({ getUserQuery, updateUserQuery }) {
	return async function handle(httpRequest) {
		try {
			// ========== Decode token and get user info ===============
			const tokenDetails = getTokenDetails(httpRequest.headers.authorization);

			// ========== @ STEP 1: validate user_Id if it exists ============
			const userId = tokenDetails.userId
			const getUser = await getUserQuery({
				userId,
			});

			if (getUser) {
				// ========== @ STEP 2: update/store user to db ============
				await updateUserQuery(userId, httpRequest.body);
				return {
					headers: {
						'Content-Type': 'application/json',
					},
					statusCode: 200,
					success: true,
					message: 'User updated successfully!',
					data: {},
				};
			} else {
				return makeHttpError({
					errorMessage: 'User not found.',
					statusCode: 404,
					data: {},
				});
			}
		} catch (e) {
			return makeHttpError({
				errorMessage: e.message,
				statusCode:
					e instanceof UniqueConstraintError
						? 409
						: e instanceof InvalidPropertyError ||
						  e instanceof RequiredParameterError
						? 400
						: 500,
			});
		}
	};
}
