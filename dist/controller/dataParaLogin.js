"use strict";
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSujetosDeAsignaciones = exports.getPersonas = void 0;
var empresa_1 = require("./empresa");
var persona_1 = require("./persona");
var getPersonaById_SinPass = function (_id) { return __awaiter(void 0, void 0, void 0, function () {
    var persona, _persona;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, persona_1.getPersonaById(_id)];
            case 1:
                persona = _a.sent();
                if (persona && typeof persona === 'object') {
                    _persona = {
                        _id: persona._id,
                        identidad: persona.identidad,
                        asignamientos: persona.asignamientos,
                        usuarios: persona.usuarios,
                    };
                    return [2 /*return*/, _persona];
                }
                return [2 /*return*/, null];
        }
    });
}); };
var getPersonas = function (sujeto) { return __awaiter(void 0, void 0, void 0, function () {
    var propietarios, administradores, estandares, visitantes, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                if (!sujeto.usuarios) return [3 /*break*/, 5];
                return [4 /*yield*/, Promise.all(sujeto.usuarios.propietario.map(getPersonaById_SinPass))];
            case 1:
                propietarios = _a.sent();
                return [4 /*yield*/, Promise.all(sujeto.usuarios.administrador.map(getPersonaById_SinPass))];
            case 2:
                administradores = _a.sent();
                return [4 /*yield*/, Promise.all(sujeto.usuarios.estandar.map(getPersonaById_SinPass))];
            case 3:
                estandares = _a.sent();
                return [4 /*yield*/, Promise.all(sujeto.usuarios.visitante.map(getPersonaById_SinPass))];
            case 4:
                visitantes = _a.sent();
                return [2 /*return*/, __spreadArrays(propietarios, administradores, estandares, visitantes)];
            case 5:
                console.log('No existe "usuarios" del sujeto: ', sujeto);
                return [2 /*return*/, null];
            case 6:
                error_1 = _a.sent();
                console.error(error_1);
                return [2 /*return*/, null];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.getPersonas = getPersonas;
var getSujetosDeAsignaciones = function (personas) { return __awaiter(void 0, void 0, void 0, function () {
    var _empresasId, _personasId, empresasEnDondeEstoy, personasEnDondeEstoy, peronas1, peronas2, TodasPersonas, PersonasNoDuplicadas_1, EmpresasNoDuplicadas_1, error_2;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 5, , 6]);
                _empresasId = personas.asignamientos
                    .filter(function (asig) { return asig.tipo === 'Empresa'; })
                    .map(function (asig) { return asig._id; });
                _personasId = personas.asignamientos
                    .filter(function (asig) { return asig.tipo === 'Persona'; })
                    .map(function (asig) { return asig._id; });
                return [4 /*yield*/, Promise.all(_empresasId.map(empresa_1.getEmpresaById))];
            case 1:
                empresasEnDondeEstoy = ((_a = (_c.sent())) === null || _a === void 0 ? void 0 : _a.filter(function (e) { return !!e; })) || [];
                return [4 /*yield*/, Promise.all(_personasId.map(empresa_1.getEmpresaById))];
            case 2:
                personasEnDondeEstoy = ((_b = (_c.sent())) === null || _b === void 0 ? void 0 : _b.filter(function (e) { return !!e; })) || [];
                return [4 /*yield*/, Promise.all(empresasEnDondeEstoy.map(function (e) {
                        if (e) {
                            return exports.getPersonas(e);
                        }
                        else {
                            return null;
                        }
                    }))];
            case 3:
                peronas1 = (_c.sent()).filter(function (p) { return !!p; });
                return [4 /*yield*/, Promise.all(personasEnDondeEstoy.map(function (e) {
                        if (e) {
                            return exports.getPersonas(e);
                        }
                        else {
                            return null;
                        }
                    }))];
            case 4:
                peronas2 = (_c.sent()).filter(function (p) { return !!p; });
                TodasPersonas = __spreadArrays(peronas1, peronas2).flat();
                PersonasNoDuplicadas_1 = [];
                TodasPersonas.forEach(function (_persona) {
                    var añadida = PersonasNoDuplicadas_1.find(function (_p) {
                        if (_persona && _p) {
                            return _p._id === _persona._id;
                        }
                        return false;
                    });
                    if (!añadida) {
                        PersonasNoDuplicadas_1.push(_persona);
                    }
                });
                EmpresasNoDuplicadas_1 = [];
                empresasEnDondeEstoy.forEach(function (_em) {
                    if (_em) {
                        var añadida = EmpresasNoDuplicadas_1.find(function (_e) {
                            if (_e) {
                                return _e._id === _em._id;
                            }
                            return false;
                        });
                        if (!añadida) {
                            EmpresasNoDuplicadas_1.push(_em);
                        }
                    }
                });
                return [2 /*return*/, { Personas: PersonasNoDuplicadas_1, Empresas: EmpresasNoDuplicadas_1 }];
            case 5:
                error_2 = _c.sent();
                console.error(error_2);
                return [2 /*return*/, null];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.getSujetosDeAsignaciones = getSujetosDeAsignaciones;
