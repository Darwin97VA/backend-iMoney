import registerConfirmation from '../emails/registerConfirmation'

const tests = () => {
  registerConfirmation('darwin97.va@gmail.com', {
    URL: 'https://google.com.pe',
  })
    .then(console.log)
    .catch(console.error)
}

export default tests
