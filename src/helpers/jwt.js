import jwt from "jsonwebtoken"
import config from "config"
import jwt_decode from "jwt-decode"
import { makeHttpError, makeHttpSuccess } from "./http-return.js"

// import {
//   addRefreshToken
// } from "../database/index.js"

const JWT_ENV = config.get("jwt")

const signAccessToken = (payload) => {
  return new Promise((resolve, reject) => {
    const secret = JWT_ENV.refreshTokenSecret
    jwt.sign(payload, secret, { expiresIn: "50m" }, (err, token) => {
      if (err) {
        reject(err)
      } else {
        resolve(token)
      }
    })
  })
}

const signRefreshToken = (payload) => {
  return new Promise((resolve, reject) => {
    const secret = JWT_ENV.refreshTokenSecret
    jwt.sign(payload, secret, { expiresIn: "20m" }, (err, token) => {
      if (err) reject()
      // store to db here
      // console.log(payload)
      // console.log(223)
      resolve(token)
      // await addRefreshToken()
      // client.SET(payload.emailAddress, token, 'EX', 20 * 60 * 1000, (err, reply) => {
      //   if (err) {
      //     reject(err)
      //     return
      //   }
      //   resolve(token)
      // })
    })
  })
}

const verifyRefreshToken = (refreshToken) => {
  return new Promise((resolve, reject) => {
    const secret = JWT_ENV.refreshTokenSecret
    jwt.verify(refreshToken, secret, (err, payload) => {
      if (err) {
        reject(err)
      } else {
        // client.GET(payload.emailAddress, (err, result) => {
        //   if (err) {
        //     reject(err)
        //     return
        //   }
        //   if (refreshToken == result) {
        //     return resolve(payload)
        //   } else {
        //     reject(err)
        //   }
        // })
      }
    })
  })
}

const deleteToken = (emailAddress) => {
  return new Promise((resolve, reject) => {
    // client.DEL(emailAddress, (err, val) => {
    //   if (err) {
    //     reject(err)
    //     return
    //   } else {
    //     return resolve(val)
    //   }
    // })
  })
}

const verifyAccessToken = async (authHeader) => {
  const token = authHeader && authHeader.split(' ')[1]
  if (!token) return res.sendStatus(401)

  return new Promise(function (resolve, reject) {
    jwt.verify(token, JWT_ENV.refreshTokenSecret, (err, payload) => {
      if (err) {
        reject(err)
      } else {
        return resolve(payload)
      }
    })
  })
}

const getTokenDetails = (token) => {
  const details = jwt_decode(token);
  return details
}

export {
  signAccessToken,
  verifyAccessToken,
  signRefreshToken,
  verifyRefreshToken,
  deleteToken,
  getTokenDetails
}