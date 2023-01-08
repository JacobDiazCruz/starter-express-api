import makeListProfile from './list-profile.js'
import makeGetProfile from './get-profile.js'
import makeUpdateProfile from './update-profile.js'
import makeUploadProfile from './upload-profile.js'
// import uploadImage from '../../helpers/upload.js'

import {
  listProfileQuery,
  getProfileQuery,
  updateProfileQuery,
  updateProfileImageQuery
} from '../../database/profiles.js'

const listProfile = makeListProfile({ listProfileQuery })
const getProfile = makeGetProfile({ getProfileQuery })
const updateProfile = makeUpdateProfile({ getProfileQuery, updateProfileQuery })
const uploadProfile = makeUploadProfile({ updateProfileImageQuery })

export {
  listProfile,
  getProfile,
  updateProfile,
  uploadProfile
}