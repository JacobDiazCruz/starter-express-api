const getMailTemplate = (template) => {
  const templates = {
    "password-reset": {
      subject: "Password reset subject",
      getBodyHtml: (recipientName, recipientEmailAddress, resetCode) => {
        return `<p>Hi, ${recipientName}</p>
                         <p>Please use the below link to reset your password.</p>
                         <p><a href="#">http://domainhere/pagetopasswordresetpage?emailAddress=${recipientEmailAddress}&code=${resetCode}</p>`
      },
    },
    "auth-verification": {
      subject: "Account Verification",
      getBodyHtml: (recipientName, verificationCode) => {
        return `
          <div style="width: 100%; background-color: black; color: #FFF; height: 70px;">
            <p style="font-size: 20px; margin-top: 25px; margin-left: 15px;"><b>ArchiFlavors</b></p>
          </div>
          <div style="margin-top: 40px;">
            <p style="font-size: 24px;"><b>Hi, ${recipientName}</b></p>
            <p style="font-size: 24px;"><b>Please use the below code to verify your account.</b></p>
            <p style="font-size: 24px;"><b>Verification Code: ${verificationCode}</b></p>
          </div>`
      },
    },
  }

  return templates[template]
}

export { getMailTemplate }
