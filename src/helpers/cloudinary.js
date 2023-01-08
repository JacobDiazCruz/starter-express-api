import * as cloudinary from 'cloudinary'
import fs from 'fs'

const uploadImage = async (path) => {
  const result = await cloudinary.v2.uploader.upload(path, {
    resource_type: "raw",
    use_filename: true
  })
  fs.unlinkSync(path)
  return result
}

export {
  uploadImage
}