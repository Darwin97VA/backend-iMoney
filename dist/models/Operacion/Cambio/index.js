"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemaOperacionCambio = void 0;
var mongoose_1 = require("mongoose");
exports.schemaOperacionCambio = new mongoose_1.Schema({
    idOperacion: {
        type: Number,
        require: true,
        unique: true,
    },
    data: {
        moneda: String,
        compra: Number,
        venta: Number,
    },
    operacion: {
        momento: Date,
        persona: String,
        asignamiento: {
            _id: String,
            tipo: String,
        },
        archivo: String,
    },
    historia: [
        {
            estado: String,
            momento: Date,
            mensajeDePersona: {
                tipo: String,
                contenido: String,
                momento: Date,
            },
            mensajeDeAdmin: {
                tipo: String,
                contenido: String,
                momento: Date,
            },
        },
    ],
});
var OperacionCambio = mongoose_1.model('OperacionCambio', exports.schemaOperacionCambio, 'operacionCambios');
exports.default = OperacionCambio;
