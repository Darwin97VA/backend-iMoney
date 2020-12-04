"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemaCuenta = void 0;
var mongoose_1 = require("mongoose");
exports.schemaCuenta = new mongoose_1.Schema({
    nombre: String,
    numero: Number,
    cci: {
        type: Number,
        unique: true,
    },
    banco: String,
    tipo: String,
    moneda: String,
    propietario: String,
});
var Cuenta = mongoose_1.model('Cuenta', exports.schemaCuenta, 'cuentas');
exports.default = Cuenta;
