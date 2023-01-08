import bcrypt from "bcrypt"

const hash = async ({ plainPassword }) => {
     return await bcrypt.hash(plainPassword, 10)
}
const compare = async (payloadPassword, dbPassword) => await bcrypt.compare(payloadPassword, dbPassword)

export { hash, compare }
