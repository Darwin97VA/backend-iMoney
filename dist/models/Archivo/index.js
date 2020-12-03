"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemaArchivo = void 0;
var mongoose_1 = require("mongoose");
exports.schemaArchivo = new mongoose_1.Schema({
    ruta: String,
    tipo: String,
    subidoPor: {
        _id: String,
        asignamiento: {
            _id: String,
            tipo: String,
        },
    },
});
var Archivo = mongoose_1.model('Archivo', exports.schemaArchivo, 'archivos');
exports.default = Archivo;
