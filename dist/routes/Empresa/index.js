"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var empresa_1 = require("../../controller/empresa");
var router = express_1.Router();
router.post('/registro', empresa_1.registrarEmpresa);
exports.default = router;
