import sender from '../sender'
import getHtml from './getHtml'

const SUBJECT = 'Confirma tu registro'

export interface RegisterConfirmationType {
  URL: string
  nombre: string
  urlBase: string
}

const getText = ({ URL }: RegisterConfirmationType) => `
  Para completar su registro debe acceder al siguiente link: ${URL}
`

const sendRegisterConfirmation = async (
  emails: string,
  data: RegisterConfirmationType
): Promise<any> => {
  try {
    const result = await sender({
      to: emails,
      subject: SUBJECT,
      text: getText(data),
      html: getHtml(data),
    })
    return result
  } catch (e) {
    console.error(e)
    return e
  }
}

export default sendRegisterConfirmation
