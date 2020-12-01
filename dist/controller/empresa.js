"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEmpresaById = exports.registrarEmpresa = void 0;
var Utils_1 = require("../interfaces/Utils");
var Persona_1 = __importDefault(require("../models/Persona"));
var Empresa_1 = __importDefault(require("../models/Empresa"));
var persona_1 = require("./persona");
var getIdsPersonas = function (identidades) { var identidades_1, identidades_1_1; return __awaiter(void 0, void 0, void 0, function () {
    var ids, identidad, documentoIdentidad, persona, existePersona, _persona, e_1_1;
    var e_1, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                ids = [];
                _b.label = 1;
            case 1:
                _b.trys.push([1, 10, 11, 16]);
                identidades_1 = __asyncValues(identidades);
                _b.label = 2;
            case 2: return [4 /*yield*/, identidades_1.next()];
            case 3:
                if (!(identidades_1_1 = _b.sent(), !identidades_1_1.done)) return [3 /*break*/, 9];
                identidad = identidades_1_1.value;
                documentoIdentidad = identidad.documentoIdentidad;
                persona = void 0;
                return [4 /*yield*/, Persona_1.default.findOne({
                        'identidad.documentoIdentidad': documentoIdentidad,
                    })];
            case 4:
                existePersona = _b.sent();
                if (!!existePersona) return [3 /*break*/, 6];
                _persona = new Persona_1.default({ identidad: identidad });
                return [4 /*yield*/, _persona.save()];
            case 5:
                persona = _b.sent();
                return [3 /*break*/, 7];
            case 6:
                persona = existePersona;
                _b.label = 7;
            case 7:
                ids.push(persona === null || persona === void 0 ? void 0 : persona._id);
                _b.label = 8;
            case 8: return [3 /*break*/, 2];
            case 9: return [3 /*break*/, 16];
            case 10:
                e_1_1 = _b.sent();
                e_1 = { error: e_1_1 };
                return [3 /*break*/, 16];
            case 11:
                _b.trys.push([11, , 14, 15]);
                if (!(identidades_1_1 && !identidades_1_1.done && (_a = identidades_1.return))) return [3 /*break*/, 13];
                return [4 /*yield*/, _a.call(identidades_1)];
            case 12:
                _b.sent();
                _b.label = 13;
            case 13: return [3 /*break*/, 15];
            case 14:
                if (e_1) throw e_1.error;
                return [7 /*endfinally*/];
            case 15: return [7 /*endfinally*/];
            case 16: return [2 /*return*/, ids];
        }
    });
}); };
var siNoExistenUsuariosCrearlos = function (usuarios) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, propietario, _b, administrador, _c, estandar, _d, visitante, idsPropietario, idsAdministrador, idsEstandar, idsVisitante;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _a = usuarios.propietario, propietario = _a === void 0 ? [] : _a, _b = usuarios.administrador, administrador = _b === void 0 ? [] : _b, _c = usuarios.estandar, estandar = _c === void 0 ? [] : _c, _d = usuarios.visitante, visitante = _d === void 0 ? [] : _d;
                return [4 /*yield*/, getIdsPersonas(propietario)];
            case 1:
                idsPropietario = _e.sent();
                return [4 /*yield*/, getIdsPersonas(administrador)];
            case 2:
                idsAdministrador = _e.sent();
                return [4 /*yield*/, getIdsPersonas(estandar)];
            case 3:
                idsEstandar = _e.sent();
                return [4 /*yield*/, getIdsPersonas(visitante)];
            case 4:
                idsVisitante = _e.sent();
                return [2 /*return*/, {
                        propietario: idsPropietario,
                        administrador: idsAdministrador,
                        estandar: idsEstandar,
                        visitante: idsVisitante,
                    }];
        }
    });
}); };
var sincronizarAsignacionEnPersona = function (empresa, usuarios) { return __awaiter(void 0, void 0, void 0, function () {
    var propietario, administrador, estandar, visitante, propietario_1, propietario_1_1, idPersona, result, e_2_1, administrador_1, administrador_1_1, idPersona, result, e_3_1, estandar_1, estandar_1_1, idPersona, result, e_4_1, visitante_1, visitante_1_1, idPersona, result, e_5_1, error_1;
    var e_2, _a, e_3, _b, e_4, _c, e_5, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _e.trys.push([0, 50, , 51]);
                propietario = usuarios.propietario, administrador = usuarios.administrador, estandar = usuarios.estandar, visitante = usuarios.visitante;
                _e.label = 1;
            case 1:
                _e.trys.push([1, 7, 8, 13]);
                propietario_1 = __asyncValues(propietario);
                _e.label = 2;
            case 2: return [4 /*yield*/, propietario_1.next()];
            case 3:
                if (!(propietario_1_1 = _e.sent(), !propietario_1_1.done)) return [3 /*break*/, 6];
                idPersona = propietario_1_1.value;
                return [4 /*yield*/, persona_1.asignarEnEmpresaConIdPersona(idPersona, empresa, Utils_1.NivelAsignacion.propietario)];
            case 4:
                result = _e.sent();
                if (!result)
                    return [2 /*return*/, result];
                _e.label = 5;
            case 5: return [3 /*break*/, 2];
            case 6: return [3 /*break*/, 13];
            case 7:
                e_2_1 = _e.sent();
                e_2 = { error: e_2_1 };
                return [3 /*break*/, 13];
            case 8:
                _e.trys.push([8, , 11, 12]);
                if (!(propietario_1_1 && !propietario_1_1.done && (_a = propietario_1.return))) return [3 /*break*/, 10];
                return [4 /*yield*/, _a.call(propietario_1)];
            case 9:
                _e.sent();
                _e.label = 10;
            case 10: return [3 /*break*/, 12];
            case 11:
                if (e_2) throw e_2.error;
                return [7 /*endfinally*/];
            case 12: return [7 /*endfinally*/];
            case 13:
                _e.trys.push([13, 19, 20, 25]);
                administrador_1 = __asyncValues(administrador);
                _e.label = 14;
            case 14: return [4 /*yield*/, administrador_1.next()];
            case 15:
                if (!(administrador_1_1 = _e.sent(), !administrador_1_1.done)) return [3 /*break*/, 18];
                idPersona = administrador_1_1.value;
                return [4 /*yield*/, persona_1.asignarEnEmpresaConIdPersona(idPersona, empresa, Utils_1.NivelAsignacion.administrador)];
            case 16:
                result = _e.sent();
                if (!result)
                    return [2 /*return*/, result];
                _e.label = 17;
            case 17: return [3 /*break*/, 14];
            case 18: return [3 /*break*/, 25];
            case 19:
                e_3_1 = _e.sent();
                e_3 = { error: e_3_1 };
                return [3 /*break*/, 25];
            case 20:
                _e.trys.push([20, , 23, 24]);
                if (!(administrador_1_1 && !administrador_1_1.done && (_b = administrador_1.return))) return [3 /*break*/, 22];
                return [4 /*yield*/, _b.call(administrador_1)];
            case 21:
                _e.sent();
                _e.label = 22;
            case 22: return [3 /*break*/, 24];
            case 23:
                if (e_3) throw e_3.error;
                return [7 /*endfinally*/];
            case 24: return [7 /*endfinally*/];
            case 25:
                _e.trys.push([25, 31, 32, 37]);
                estandar_1 = __asyncValues(estandar);
                _e.label = 26;
            case 26: return [4 /*yield*/, estandar_1.next()];
            case 27:
                if (!(estandar_1_1 = _e.sent(), !estandar_1_1.done)) return [3 /*break*/, 30];
                idPersona = estandar_1_1.value;
                return [4 /*yield*/, persona_1.asignarEnEmpresaConIdPersona(idPersona, empresa, Utils_1.NivelAsignacion.estandar)];
            case 28:
                result = _e.sent();
                if (!result)
                    return [2 /*return*/, result];
                _e.label = 29;
            case 29: return [3 /*break*/, 26];
            case 30: return [3 /*break*/, 37];
            case 31:
                e_4_1 = _e.sent();
                e_4 = { error: e_4_1 };
                return [3 /*break*/, 37];
            case 32:
                _e.trys.push([32, , 35, 36]);
                if (!(estandar_1_1 && !estandar_1_1.done && (_c = estandar_1.return))) return [3 /*break*/, 34];
                return [4 /*yield*/, _c.call(estandar_1)];
            case 33:
                _e.sent();
                _e.label = 34;
            case 34: return [3 /*break*/, 36];
            case 35:
                if (e_4) throw e_4.error;
                return [7 /*endfinally*/];
            case 36: return [7 /*endfinally*/];
            case 37:
                _e.trys.push([37, 43, 44, 49]);
                visitante_1 = __asyncValues(visitante);
                _e.label = 38;
            case 38: return [4 /*yield*/, visitante_1.next()];
            case 39:
                if (!(visitante_1_1 = _e.sent(), !visitante_1_1.done)) return [3 /*break*/, 42];
                idPersona = visitante_1_1.value;
                return [4 /*yield*/, persona_1.asignarEnEmpresaConIdPersona(idPersona, empresa, Utils_1.NivelAsignacion.visitante)];
            case 40:
                result = _e.sent();
                if (!result)
                    return [2 /*return*/, result];
                _e.label = 41;
            case 41: return [3 /*break*/, 38];
            case 42: return [3 /*break*/, 49];
            case 43:
                e_5_1 = _e.sent();
                e_5 = { error: e_5_1 };
                return [3 /*break*/, 49];
            case 44:
                _e.trys.push([44, , 47, 48]);
                if (!(visitante_1_1 && !visitante_1_1.done && (_d = visitante_1.return))) return [3 /*break*/, 46];
                return [4 /*yield*/, _d.call(visitante_1)];
            case 45:
                _e.sent();
                _e.label = 46;
            case 46: return [3 /*break*/, 48];
            case 47:
                if (e_5) throw e_5.error;
                return [7 /*endfinally*/];
            case 48: return [7 /*endfinally*/];
            case 49: return [2 /*return*/, true];
            case 50:
                error_1 = _e.sent();
                console.error(error_1);
                return [2 /*return*/, null];
            case 51: return [2 /*return*/];
        }
    });
}); };
var registrarEmpresa = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var persona, ruc, existeEmpresa, __usuarios, usuarios_1, _empresa, empresa, sincronizacion, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 7, , 8]);
                if (!req.__data) return [3 /*break*/, 6];
                persona = req.__data.persona;
                if (!persona) return [3 /*break*/, 6];
                ruc = req.body.ruc;
                return [4 /*yield*/, Empresa_1.default.findOne({ ruc: ruc })];
            case 1:
                existeEmpresa = _a.sent();
                if (!existeEmpresa) return [3 /*break*/, 2];
                return [2 /*return*/, res
                        .status(400)
                        .json({ error: 'La empresa ya está registrada' })];
            case 2:
                __usuarios = __assign(__assign({}, req.body.usuarios), { propietario: req.body.representanteLegal.map(function (RL) { return RL.identidad; }) });
                return [4 /*yield*/, siNoExistenUsuariosCrearlos(__usuarios)];
            case 3:
                usuarios_1 = _a.sent();
                _empresa = new Empresa_1.default(__assign(__assign({}, req.body), { representanteLegal: req.body.representanteLegal.map(function (RL, index) {
                        console.log('idPropietario', usuarios_1.propietario[index]);
                        return __assign({ _id: usuarios_1.propietario[index] }, RL);
                    }), usuarios: usuarios_1 }));
                console.log(usuarios_1);
                return [4 /*yield*/, _empresa.save()];
            case 4:
                empresa = _a.sent();
                return [4 /*yield*/, sincronizarAsignacionEnPersona(empresa, usuarios_1)];
            case 5:
                sincronizacion = _a.sent();
                if (sincronizacion) {
                    return [2 /*return*/, res.json({ data: 'Registro completado.' })];
                }
                else {
                    return [2 /*return*/, res.json({
                            data: 'Registro completado',
                            error: 'Hubo un error en la sincronización',
                        })];
                }
                _a.label = 6;
            case 6: return [2 /*return*/, res.status(400).json({ error: 'La persona registrante no existe.' })];
            case 7:
                error_2 = _a.sent();
                console.error(error_2);
                return [2 /*return*/, res.status(400).json({ error: error_2 })];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.registrarEmpresa = registrarEmpresa;
var getEmpresaById = function (_id) { return Empresa_1.default.findById(_id); };
exports.getEmpresaById = getEmpresaById;
