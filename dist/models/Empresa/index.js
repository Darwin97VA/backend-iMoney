"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemaEmpresa = void 0;
var mongoose_1 = require("mongoose");
var schemaRepresentante = new mongoose_1.Schema({
    _id: String,
    docRelacion: String,
    estado: {
        estaRegistrado: {
            type: Boolean,
            default: false,
        },
        relacionVerificada: {
            type: Boolean,
            default: false,
        },
    },
    cargo: String,
});
exports.schemaEmpresa = new mongoose_1.Schema({
    ruc: Number,
    razonSocial: String,
    representanteLegal: [schemaRepresentante],
    usuarios: {
        propietario: [String],
        administrador: [String],
        estandar: [String],
        visitante: [String],
    },
    cuentas: {
        type: [String],
        default: [],
    },
});
var Empresa = mongoose_1.model('Empresa', exports.schemaEmpresa, 'empresas');
exports.default = Empresa;
