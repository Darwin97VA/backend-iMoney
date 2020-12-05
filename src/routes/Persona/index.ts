import { Request, Response, Router } from 'express'
import {
  confirmMail,
  registro,
  login,
  controllerTEST,
} from '../../controller/persona'

const router = Router()

export const PATH_INICIAL_CORREO = '/confirmar-registro'
const PATH_CONFIR_EMAIL = PATH_INICIAL_CORREO + '/:token'

// const controllerTEST = async (_req: Request, res: Response) => {
//   return await res.send('Hola')
// }
router.post('/entrar', controllerTEST)
// router.post('/registro', registro)
// router.get(PATH_CONFIR_EMAIL, confirmMail)

export default router
