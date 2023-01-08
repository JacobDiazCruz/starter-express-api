import constants from '../../helpers/constants.js';
import { BadRequestError } from '../../helpers/errors.js';
import { makeHttpError, makeHttpSuccess } from '../../helpers/http-return.js';
import { signAccessToken, getTokenDetails } from '../../helpers/jwt.js';
import message from '../../helpers/constants.js';
import axios from "axios";

/**
 * @author Jacob
 * @description verify token via google oauth
 * @description register user and sign jwt token
 * @param - token, login type
 * @returns - access token
 */
export default function makeLoginGithub({
	register,
	storeTokenQuery,
	getUserByEmailQuery,
}) {
	return async function loginGithub(loginPayload) {
		if (!loginPayload) {
			throw new BadRequestError(constants.BAD_REQUEST_NO_POST_BODY);
		}

		try {
      // Acquire access_token from this api
      const tokenResponse = await axios({
        method: "POST",
        url: "https://github.com/login/oauth/access_token",
        headers: {
          "Accept": "application/json",
        },
        data: {
          client_id: "daf95edc4e9ccd335439",
          client_secret: "dd4fa0ac9f0a2b2fe5ddc73d5ed5f4181364e1ee",
          code: loginPayload.code,
          redirect_uri: "http://localhost:3000/auth-access"
        },
      });

      // check access token
      if(!tokenResponse.data?.access_token) {
        throw new BadRequestError("No access_token response from github");
      }

      // GET Github user api
      const userResponse = await axios({
        method: "GET",
        url: "https://api.github.com/user",
        headers: {
          "Authorization": `Bearer ${tokenResponse.data?.access_token}`
        }
      });

      // check email if it exist in the db
      const getUser = await getUserByEmailQuery(userResponse.data.id.toString());
      let auth = null;
            
      // If email still doesn't exist, register the user
      if(!getUser) {
        const user = {
          firstName: userResponse.data.name,
          lastName: "",
          thumbnailImage: userResponse.data.avatar_url,
          originalImage: userResponse.data.avatar_url,
          email: userResponse.data.id.toString(),
          password: userResponse.data.id.toString(),
          type: "Github",
          isVerified: 1,
        };
        auth = await register(user);
        return await signTokenAndReturn(auth, getUser);
      }
      return await signTokenAndReturn(auth, getUser);
    } catch(err) {
      console.log(err);
    }
	};

  async function signTokenAndReturn(auth, getUser) {
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
			},
		});
	}
}
