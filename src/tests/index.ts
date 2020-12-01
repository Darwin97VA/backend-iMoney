import registerConfirmation from '../emails/registerConfirmation'
import config from '../_config'

const { URL_BASE } = config

const tests = () => {
  registerConfirmation('darwin97.va@gmail.com', {
    URL: 'https://google.com.pe',
    nombre: 'Darwin VA !!',
    urlBase: URL_BASE,
  })
    .then(console.log)
    .catch(console.error)
}

export default tests
