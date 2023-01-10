import constants from '../../helpers/constants.js';
import makeLoginGoogleEntity from '../../entities/user/login-google.js';
import { BadRequestError } from '../../helpers/errors.js';
import { makeHttpError, makeHttpSuccess } from '../../helpers/http-return.js';
import { signAccessToken, getTokenDetails } from '../../helpers/jwt.js';
import message from '../../helpers/constants.js';

// const config = require('config')
// const { OAuth2Client } = require('google-auth-library');
import config from 'config';
import { OAuth2Client } from 'google-auth-library';
const EXTERNAL_AUTH_ENV = config.get('externalAuth');
const client = new OAuth2Client(EXTERNAL_AUTH_ENV.google.clientId);

/**
 * @author Jacob
 * @description verify token via google oauth
 * @description register user and sign jwt token
 * @param - token, login type
 * @returns - access token
 */
export default function makeLoginGoogle({
	register,
	storeTokenQuery,
	getUserByEmailQuery,
}) {
	return async function loginGoogle(loginPayload) {
		if (!loginPayload) {
			throw new BadRequestError(constants.BAD_REQUEST_NO_POST_BODY);
		}
    
		const loginEntity = makeLoginGoogleEntity(loginPayload);
		const ticket = await client.verifyIdToken({
			idToken: loginEntity.token,
			audience: EXTERNAL_AUTH_ENV.google.clientId,
		});
		const payload = ticket.getPayload();

		// get googleToken details
		// @get: google name
		const googleTokenDetails = await getTokenDetails(loginPayload.token);

		// get user
		const getUser = await getUserByEmailQuery(loginPayload.email);

		// If email doesn't exist, create a user
		let auth = null;
		if (!getUser) {
			const user = {
				firstName: payload.given_name,
				lastName: payload.family_name,
				thumbnailImage: payload.picture,
				originalImage: payload.picture,
				email: payload.email,
				password: payload.sub,
				type: loginPayload.type,
				isVerified: 1,
			};
			auth = await register(user);
			return await signTokenAndReturn(auth, getUser, googleTokenDetails);
		}
		return await signTokenAndReturn(auth, getUser, googleTokenDetails);
	};

	async function signTokenAndReturn(auth, getUser, googleTokenDetails) {
		// sign access token and return
		const requestData = {
			userId: auth ? auth._id : getUser._id,
			name: auth
				? `${auth.firstName}`
				: `${getUser.firstName}`,
			profileId: auth ? auth.profileId : getUser.profileId,
			email: auth ? auth.email : getUser.email,
			role: auth ? auth.role : getUser.role,
		};
		const accessToken = await signAccessToken(requestData);

		// store sign access token to DB
		await storeTokenQuery({
			userId: requestData.userId,
			accessToken: accessToken,
			email: requestData.email,
		});

		return makeHttpSuccess({
			statusCode: 200,
			message: message.LOGIN_SUCCESS,
			data: {
				userId: requestData.userId,
				accessToken,
				firstName: getUser.firstName,
				lastName: getUser.lastName,
        profileImage: googleTokenDetails.picture
			},
		});
	}
}