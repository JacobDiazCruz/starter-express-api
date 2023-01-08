import crypto from "crypto"

const randomString = () => crypto.randomBytes(3).toString("hex")

export { randomString }
