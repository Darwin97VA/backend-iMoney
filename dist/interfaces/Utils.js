"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NivelAsignacion = exports.TipoDocumentoIdentidad = exports.Nacionalidad = exports.Banco = exports.TipoMoneda = exports.TipoCuenta = void 0;
var TipoCuenta;
(function (TipoCuenta) {
    TipoCuenta["Ahorro"] = "Ahorro";
    TipoCuenta["Corriente"] = "Corriente";
})(TipoCuenta = exports.TipoCuenta || (exports.TipoCuenta = {}));
var TipoMoneda;
(function (TipoMoneda) {
    TipoMoneda["Sol"] = "Sol";
    TipoMoneda["Dolar"] = "Dolar";
})(TipoMoneda = exports.TipoMoneda || (exports.TipoMoneda = {}));
var Banco;
(function (Banco) {
    Banco["Bcp"] = "BCP";
    Banco["Interbank"] = "Interbank";
    Banco["Continental"] = "BBVA";
})(Banco = exports.Banco || (exports.Banco = {}));
var Nacionalidad;
(function (Nacionalidad) {
    Nacionalidad["Peru"] = "Peru";
    Nacionalidad["Colombia"] = "Colombia";
})(Nacionalidad = exports.Nacionalidad || (exports.Nacionalidad = {}));
var TipoDocumentoIdentidad;
(function (TipoDocumentoIdentidad) {
    TipoDocumentoIdentidad["Dni"] = "Dni";
    TipoDocumentoIdentidad["CarnetExtrajeria"] = "Carnet de Extranjeria";
})(TipoDocumentoIdentidad = exports.TipoDocumentoIdentidad || (exports.TipoDocumentoIdentidad = {}));
var NivelAsignacion;
(function (NivelAsignacion) {
    NivelAsignacion["propietario"] = "propietario";
    NivelAsignacion["administrador"] = "administrador";
    NivelAsignacion["estandar"] = "estandar";
    NivelAsignacion["visitante"] = "visitante";
})(NivelAsignacion = exports.NivelAsignacion || (exports.NivelAsignacion = {}));
