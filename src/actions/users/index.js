import makeRegister from './register-user.js';
import makeLoginGoogle from './login-google.js';
import makeLogoutUser from './logout.js';
import makeCheckToken from './check-token.js';
import makeUpdateUser from './update-user.js';

// database imports
import {
	saveUser,
	getUserQuery,
	getUserByEmailQuery,
	storeTokenQuery,
	insertUserProfile,
	getTokenQuery,
	removeTokenQuery,
	updateUserQuery,
} from '../../database/users.js';

// profiles db
import {
	getProfileByUserQuery,
	getProfileQuery,
	saveProfile,
} from '../../database/profiles.js';
import makeLoginGithub from './login-github.js';

const register = makeRegister({
	saveUser,
	getUserQuery,
	getUserByEmailQuery,
	saveProfile,
	insertUserProfile,
});
const checkToken = makeCheckToken({
	getTokenQuery,
	getProfileQuery,
	getUserQuery,
});
const loginGithub = makeLoginGithub({
	register,
	storeTokenQuery,
	getUserByEmailQuery,
});
const loginGoogle = makeLoginGoogle({
	register,
	storeTokenQuery,
	getUserByEmailQuery,
});
const logoutUser = makeLogoutUser({
	removeTokenQuery,
});
const updateUser = makeUpdateUser({ getUserQuery, updateUserQuery });

const userService = Object.freeze({
	register,
	loginGoogle,
	checkToken,
	logoutUser,
	updateUser,
});

export default userService;
export {
	register,
	loginGoogle,
	loginGithub,
	logoutUser,
	checkToken,
	updateUser,
};
