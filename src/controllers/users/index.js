import makeRegisterController from "./register-controller.js"
import makeLogoutController from "./logout-controller.js"
import makeRefreshTokenController from "./refresh-token-controller.js"
import makeAccessTokenController from "./access-token-controller.js"
import makeLoginGoogleController from "./login-google.js"
import makeLoginGithubController from "./login-github.js"
import makeCheckTokenController from "./check-token-controller.js"
import makeUpdateUserController from "./update-controller.js"
import notFound from './not-found.js'

import {
  register,
  loginGoogle,
  loginGithub,
  checkToken,
  logoutUser,
  updateUser
} from "../../actions/users/index.js"

/**
* TODO: normalize controllers into generic controller
*/
const registerController = makeRegisterController({ register })
const loginGoogleController = makeLoginGoogleController({ loginGoogle })
const loginGithubController = makeLoginGithubController({ loginGithub })
const checkTokenController = makeCheckTokenController({ checkToken })
const refreshTokenController = makeRefreshTokenController()
const accessTokenController = makeAccessTokenController()
const logoutController = makeLogoutController({ logoutUser })
const updateUserController = makeUpdateUserController({ updateUser })

const authController = Object.freeze({
  registerController,
  accessTokenController,
  loginGoogleController,
  loginGithubController,
  checkTokenController,
  refreshTokenController,
  logoutController,
	updateUserController,
  notFound
})

export default authController

export {
  registerController,
  accessTokenController,
  loginGoogleController,
  loginGithubController,
  checkTokenController,
  refreshTokenController,
  logoutController,
	updateUserController,
  notFound
}
