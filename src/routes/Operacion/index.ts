import { Router } from 'express'
import Cambio from './Cambio'

const router = Router()

router.use('/cambio', Cambio)

export default router
