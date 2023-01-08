import uploadImage from './upload.js'
import sharp from 'sharp'
let cloudinary = require("cloudinary").v2;
let streamifier = require('streamifier');

const uploadFile = async (file) => {
  // const originalFile = { ...file }
  // const thumbFile = { ...file }

  // sharp configuration
  // const data = await sharp(thumbFile.buffer)
  //   .resize({ width: 300, height: 240 })
  //   .toBuffer();

  // const dataUri = dUri.format(data.extname(data.originalname).toString(), data.buffer);
  // const extName = path.extname(file.originalname).toString();
  // const file64 = parser.format(extName, file.buffer);

  // thumbFile.buffer = data
  // const dataFile = dUri.format(path.extname(file).toString(), file.buffer);

  // console.log(dataFile)
  // console.log('============================')
  // const reader = new FileReader()
  // const myFile = reader.readAsDataURL(file)

  // const result = await uploadImage(originalFile, thumbFile)

  let streamUpload = (file) => {
    return new Promise((resolve, reject) => {
      let stream = cloudinary.uploader.upload_stream(
        (error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        }
      );
      streamifier.createReadStream(file.buffer).pipe(stream);
    });
  };

  try {
    let result = await streamUpload(file);
    return {
      origResult: result.url,
      thumbResult: result.url
    }
  } catch (err) {
    console.log(err)
  }

  // const origResult = `${result.url}/orig-${result.label}`
  // const thumbResult = `${result.url}/thumb-${result.label}`
}

export default uploadFile