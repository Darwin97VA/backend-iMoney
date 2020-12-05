import { crearCuenta } from '../../controller/cuenta'
import { Router } from 'express'

const router = Router()

router.post('/', crearCuenta)

export default router
