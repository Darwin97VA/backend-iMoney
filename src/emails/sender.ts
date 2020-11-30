import config from '../config'
import { createTransport } from 'nodemailer'

const {
  SMTP_USER,
  SMTP_PASSWORD,
  SMTP_HOST,
  SMTP_PORT,

  MAIL_NAME,
} = config

const transporter = createTransport({
  host: SMTP_HOST,
  port: Number(SMTP_PORT),
  secure: false,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASSWORD,
  },
})

interface RestMailOptions {
  to: string
  subject: string
  text: string
  html: string
}

const sender = (options: RestMailOptions) =>
  transporter.sendMail({
    from: `"${MAIL_NAME}" <${SMTP_USER}>`,
    ...options,
  })

export default sender
