import { execCambio } from '../../../controller/cambio'
import { Router } from 'express'

const router = Router()
// router.use(getPersona)
router.post('/', execCambio)

export default router
