"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cambio_1 = require("../../../controller/cambio");
var express_1 = require("express");
var router = express_1.Router();
// router.use(getPersona)
router.post('/', cambio_1.execCambio);
exports.default = router;
