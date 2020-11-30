import { Router } from 'express'
import { registrarEmpresa } from '../../controller/empresa'

const router = Router()

router.post('/registro', registrarEmpresa)

export default router
