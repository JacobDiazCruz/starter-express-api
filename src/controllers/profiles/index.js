import {
  listProfile,
  getProfile,
  uploadProfile,
  updateProfile
} from "../../actions/profiles/index.js"

import makeGetProfileController from "./get-profile.js"
import makeGetListController from "./get-list.js"
import makePostUploadController from "./post-upload-image.js"
import makeUpdateProfileController from "./update-profile.js"

const getProfileController = makeGetProfileController({ getProfile })
const getProfileListController = makeGetListController({ listProfile })
const postUploadController = makePostUploadController({ uploadProfile })
const updateProfileController = makeUpdateProfileController({ updateProfile })

const profileController = Object.freeze({
  getProfileController,
  getProfileListController,
  postUploadController,
  updateProfileController
})

export default profileController

export {
  getProfileController,
  getProfileListController,
  postUploadController,
  updateProfileController
}