"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var admin_1 = require("../../controller/admin");
var express_1 = require("express");
var router = express_1.Router();
var routerAuth = express_1.Router();
/**
 * Un administrador
 *  - Cambiar su contraseña
 *  - Crear más admins
 *
 */
routerAuth.post('/cambio', function () { });
router.post('/registro', admin_1.getAdmin, admin_1.registerAdmin);
router.post('/entrar', admin_1.login);
router.use('*', admin_1.getAdmin, routerAuth);
exports.default = router;
