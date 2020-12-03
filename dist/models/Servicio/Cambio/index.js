"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemaCambio = void 0;
var Utils_1 = require("../../../interfaces/Utils");
var mongoose_1 = require("mongoose");
exports.schemaCambio = new mongoose_1.Schema({
    moneda: String,
    compra: Number,
    venta: Number,
});
var Cambio = mongoose_1.model('Cambio', exports.schemaCambio, 'cambios');
var cambio = new Cambio({
    moneda: Utils_1.TipoMoneda.Sol,
    compra: 3.5,
    venta: 3.6,
});
cambio.save();
exports.default = Cambio;
