import { execCambio } from '../../../controller/cambio'
import { Router } from 'express'
import { getPersona } from '../../../controller/persona'

const router = Router()
// router.use(getPersona)
router.post('/', getPersona(), execCambio)

export default router
