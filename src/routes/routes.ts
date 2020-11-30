import { Router } from 'express'

import routerPersona from './Persona'
import routerEmpresa from './Empresa'
import { getPersona } from '../controller/persona'

const router = Router()

router.use('/persona', routerPersona)
router.use('/empresa', getPersona, routerEmpresa)

export default router
