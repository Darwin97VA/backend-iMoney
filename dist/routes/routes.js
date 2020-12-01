"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var Persona_1 = __importDefault(require("./Persona"));
var Empresa_1 = __importDefault(require("./Empresa"));
var persona_1 = require("../controller/persona");
var router = express_1.Router();
router.use('/persona', Persona_1.default);
router.use('/empresa', persona_1.getPersona, Empresa_1.default);
exports.default = router;
