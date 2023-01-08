import nodemailer from "nodemailer"
import config from "config"

/**
 * @author Jacob
 * TODO: catch error for non block mailing service
 */

const MAIL_ENV = config.get("mail")

const mailSender = async (mailInfo) => {
  console.log(mailInfo)
  console.log(552)
  const transporter = nodemailer.createTransport({
    service: MAIL_ENV.type,
    auth: {
      user: MAIL_ENV.auth.user,
      pass: MAIL_ENV.auth.pass,
    },
  })
  const transporterInst = transporter
  await transporterInst.sendMail({ from: MAIL_ENV.sender, ...mailInfo })
}

export { mailSender }
