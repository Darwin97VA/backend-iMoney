import { Router } from 'express'

import routerAdmin from './Admin'
import routerArchivo from './Archivo'
import routerOperacion from './Operacion'
import routerPersona from './Persona'
import routerEmpresa from './Empresa'
import { getPersona } from '../controller/persona'

const router = Router()

router.use('/admin', routerAdmin)
router.use('/archivo', routerArchivo)

router.use('/operacion', getPersona, routerOperacion)

router.use('/persona', routerPersona)
router.use('/empresa', getPersona, routerEmpresa)

export default router
