"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemaPerfil = void 0;
var mongoose_1 = require("mongoose");
exports.schemaPerfil = new mongoose_1.Schema({
    verificado: {
        type: Boolean,
        default: false,
    },
    verificadoPorRepresentante: {
        type: Boolean,
        default: false,
    },
    administradores: [Number],
    gestores: [Number],
    visitantes: [Number],
    operaciones: [String],
    info: Number,
    tipo: String,
});
var Perfil = mongoose_1.model('Perfil', exports.schemaPerfil, 'perfiles');
exports.default = Perfil;
