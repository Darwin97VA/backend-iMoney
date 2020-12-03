"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemaMensaje = void 0;
var mongoose_1 = require("mongoose");
exports.schemaMensaje = new mongoose_1.Schema({
    from: {
        _id: String,
        usuario: String,
        perfil: String,
    },
    to: {
        _id: String,
        usuario: String,
        perfil: String,
    },
    mensaje: {
        tipo: String,
        contenido: String,
        momento: Date,
    },
});
var Mensaje = mongoose_1.model('Mensaje', exports.schemaMensaje, 'mensajes');
exports.default = Mensaje;
