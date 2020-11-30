import { Router } from 'express'
import { confirmMail, registro, login } from '../../controller/persona'

const router = Router()

export const PATH_INICIAL_CORREO = '/confirmar-registro'
const PATH_CONFIR_EMAIL = PATH_INICIAL_CORREO + '/:token'

router.post('/entrar', login)
router.post('/registro', registro)
router.get(PATH_CONFIR_EMAIL, confirmMail)

export default router
