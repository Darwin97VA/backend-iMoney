import { getAdmin, login, registerAdmin } from '../../controller/admin'
import { Router } from 'express'

const router = Router()
const routerAuth = Router()

/**
 * Un administrador
 *  - Cambiar su contraseña
 *  - Crear más admins
 *
 */
routerAuth.post('/cambio', () => {})

router.post('/registro', getAdmin, registerAdmin)
router.post('/entrar', login)
router.use('*', getAdmin, routerAuth)

export default router
