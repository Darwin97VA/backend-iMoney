import { Router } from 'express'

import routerPersona from './Persona'

const router = Router()

router.use('/persona', routerPersona)

export default router
