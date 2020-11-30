import sender from '../sender'
import getHtml from './getHtml'

const SUBJECT = 'Confirma tu registro'

export interface RegisterConfirmationType {
  URL: string
}

const getText = ({ URL }: RegisterConfirmationType) => `
  Para completar su registro debe acceder al siguiente link: ${URL}
`

const sendRegisterConfirmation = (
  emails: string,
  data: RegisterConfirmationType
): Promise<any> =>
  sender({
    to: emails,
    subject: SUBJECT,
    text: getText(data),
    html: getHtml(data),
  })

export default sendRegisterConfirmation
