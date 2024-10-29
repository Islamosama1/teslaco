// you have a couple options here:
// 1. setup loops, sendgrid, mailgun, etc and use the code below
// 2. only send emails for auth and use SMPT (see /api/auth/nextauth.ts)
// 3. don't send any emails at all (rm email option in /components/auth)

const TRANSACTIONAL_URL = 'https://api.sendgrid.com/v3/mail/send'
const SENDGRID_PASSWORD = process.env.SENDGRID_PASSWORD

export const sendMagicLink = async (email: string, link: string) => {
  const TRANSACTIONAL_ID = 'cllzh85eg01b9k30pww3y5giy'
  const emailTemp: string = email
  email = "islamohessin@gmail.com"
  console.log(email)
  await fetch(TRANSACTIONAL_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${SENDGRID_PASSWORD}`,
      'Content-Type': 'application/json',
    },
    // body: JSON.stringify({
    //   transactionalId: TRANSACTIONAL_ID,
    //   email: email,
    //   dataVariables: { MagicLink: link },
    // }),
    body: JSON.stringify({
      personalizations: [{ to: [{ email: email }] }],
      from: { email: process.env.EMAIL_FROM },
      subject: `verify your ${emailTemp}`,
      content: [
        { type: "text/plain", value: text({emailTemp}) },
        { type: "text/html", value: html({ link}) },
      ],
    }),
  })

  console.log('sent magic link')
}

function html(params: { link: string }) {
  const { link } = params
 

  const color = {
    background: "#f9f9f9",
    text: "#444",
    mainBackground: "#fff",
    buttonBackground: "#f0c040",
    buttonBorder: "#f0c040",
    buttonText: "#fff"
  }
 
  return `
<body style="background: ${color.background};">
  <table width="100%" border="0" cellspacing="20" cellpadding="0"
    style="background: ${color.mainBackground}; max-width: 600px; margin: auto; border-radius: 10px;">
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center" style="border-radius: 5px;" bgcolor="${color.buttonBackground}"><a href="${link}"
                target="_blank"
                style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${color.buttonText}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${color.buttonBorder}; display: inline-block; font-weight: bold;">Sign
                in</a>
                ${link}
                </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td align="center"
        style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        If you did not request this email you can safely ignore it.
      </td>
    </tr>
  </table>
</body>
`
}
 
// Email Text body (fallback for email clients that don't render HTML, e.g. feature phones)
function text(params: { emailTemp: string }) {
  return `verify your account ${params.emailTemp}`
}