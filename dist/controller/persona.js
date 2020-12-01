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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.asignarEnEmpresaConIdPersona = exports.getPersonaById = exports.asignarEnEmpresa = exports.crearPersona = exports.confirmMail = exports.getPersona = exports.registro = exports.login = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_1 = __importDefault(require("../config"));
var Persona_1 = __importDefault(require("../models/Persona"));
var registerConfirmation_1 = __importDefault(require("../emails/registerConfirmation"));
var Persona_2 = require("../routes/Persona");
var dataParaLogin_1 = require("./dataParaLogin");
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var persona, verificaPassword, ID_PERSONA, dataToken, TODA_LA_DATA, Personas, Empresas, token, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                if (!(req.body.correo && req.body.contraseña)) return [3 /*break*/, 4];
                return [4 /*yield*/, Persona_1.default.findOne({ correo: req.body.correo })];
            case 1:
                persona = _a.sent();
                if (!persona) return [3 /*break*/, 4];
                return [4 /*yield*/, persona.comparePassword(req.body.contraseña)];
            case 2:
                verificaPassword = _a.sent();
                if (!verificaPassword) return [3 /*break*/, 4];
                ID_PERSONA = persona._id;
                dataToken = { ID_PERSONA: ID_PERSONA };
                return [4 /*yield*/, dataParaLogin_1.getSujetosDeAsignaciones(persona)];
            case 3:
                TODA_LA_DATA = _a.sent();
                if (TODA_LA_DATA) {
                    Personas = TODA_LA_DATA.Personas, Empresas = TODA_LA_DATA.Empresas;
                    console.log(Personas, Empresas);
                    token = jsonwebtoken_1.default.sign(dataToken, config_1.default.SECRET_JWT);
                    return [2 /*return*/, res.json({
                            data: { token: token, _id: ID_PERSONA, persona: persona, Personas: Personas, Empresas: Empresas },
                        })];
                }
                _a.label = 4;
            case 4: return [2 /*return*/, res.status(400).json({ error: 'Credencial inválidas' })];
            case 5:
                error_1 = _a.sent();
                console.error(error_1);
                return [2 /*return*/, res.status(400).json({ error: error_1 })];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.login = login;
var registro = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var get, baseUrl, identidad, existePersona, persona, token, urlBase, URL, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                get = req.get, baseUrl = req.baseUrl;
                identidad = req.body.identidad;
                return [4 /*yield*/, Persona_1.default.findOne({
                        'identidad.documentoIdentidad': identidad.documentoIdentidad,
                    })];
            case 1:
                existePersona = _a.sent();
                if (!!(existePersona === null || existePersona === void 0 ? void 0 : existePersona.correo)) return [3 /*break*/, 3];
                persona = new Persona_1.default(req.body);
                token = jsonwebtoken_1.default.sign(persona.toJSON(), config_1.default.SECRET_JWT, {
                    expiresIn: 60 * 5 /* 5 minutos */,
                });
                urlBase = "http://" + req.get('host') + baseUrl + Persona_2.PATH_INICIAL_CORREO + "/";
                URL = urlBase + token;
                return [4 /*yield*/, registerConfirmation_1.default(persona.correo, { URL: URL })];
            case 2:
                _a.sent();
                return [2 /*return*/, res.json({
                        data: 'Correo de confirmación enviado! Será valido por 5 minutos',
                    })];
            case 3: return [2 /*return*/, res.status(402).json({ data: 'Persona ya registrada' })];
            case 4:
                error_2 = _a.sent();
                console.error(error_2);
                return [2 /*return*/, res.status(400).json({ error: error_2 })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.registro = registro;
var getPersona = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var token, decoded, ID_PERSONA, persona, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                token = req.token;
                if (!token) return [3 /*break*/, 3];
                decoded = jsonwebtoken_1.default.verify(token, config_1.default.SECRET_JWT);
                if (!(decoded && typeof decoded === 'object')) return [3 /*break*/, 2];
                ID_PERSONA = decoded.ID_PERSONA;
                return [4 /*yield*/, Persona_1.default.findById(ID_PERSONA)];
            case 1:
                persona = _a.sent();
                if (persona) {
                    if (!req.__data) {
                        req.__data = {};
                    }
                    req.__data.persona = persona;
                    return [2 /*return*/, next()];
                }
                _a.label = 2;
            case 2: return [2 /*return*/, res.status(400).json({ data: 'El token de acceso está corrupto' })];
            case 3: return [2 /*return*/, res.status(400).json({ data: 'No se entregó el token de acceso.' })];
            case 4:
                error_3 = _a.sent();
                console.error(error_3);
                return [2 /*return*/, res.status(400).json({ error: error_3 })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.getPersona = getPersona;
var confirmMail = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var token, _persona, persona_1, existePersona, yaEsPropietario, yaEstaAutoasignado, error_4;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, , 6]);
                token = req.params.token;
                _persona = jsonwebtoken_1.default.verify(token, config_1.default.SECRET_JWT);
                if (!_persona) return [3 /*break*/, 4];
                return [4 /*yield*/, Persona_1.default.findOne({
                        'identidad.documentoIdentidad': _persona.identidad.documentoIdentidad,
                    })];
            case 1:
                existePersona = _b.sent();
                if (existePersona) {
                    persona_1 = new Persona_1.default(__assign(__assign({}, existePersona), { correo: _persona.correo, contraseña: _persona.contraseña, identidad: _persona.identidad }));
                }
                else {
                    persona_1 = new Persona_1.default(_persona);
                }
                return [4 /*yield*/, persona_1.save()];
            case 2:
                _b.sent();
                if (!persona_1.usuarios) {
                    persona_1.usuarios = {
                        propietario: [],
                        administrador: [],
                        estandar: [],
                        visitante: [],
                    };
                }
                yaEsPropietario = (_a = persona_1.usuarios) === null || _a === void 0 ? void 0 : _a.propietario.find(function (_id) { return _id == persona_1._id; });
                if (!yaEsPropietario) {
                    persona_1.usuarios.propietario.push(persona_1._id);
                }
                yaEstaAutoasignado = persona_1.asignamientos.find(function (asignamiento) { return asignamiento._id === persona_1._id; });
                if (!yaEstaAutoasignado) {
                    persona_1.asignamientos.push({
                        tipo: 'Persona',
                        _id: persona_1._id,
                    });
                }
                return [4 /*yield*/, persona_1.save()];
            case 3:
                _b.sent();
                return [2 /*return*/, res.json({ data: '¡Registro exitoso!\nYa puede iniciar sesión' })];
            case 4: return [2 /*return*/, res
                    .status(400)
                    .json({ error: 'El token entregado no devolvió ningún usuario' })];
            case 5:
                error_4 = _b.sent();
                console.error(error_4);
                return [2 /*return*/, res.status(400).json({ error: error_4 })];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.confirmMail = confirmMail;
var crearPersona = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var persona, error_5;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 4, , 5]);
                if (!(!req.body.correo &&
                    !req.body.contraseña &&
                    !((_b = (_a = req.body) === null || _a === void 0 ? void 0 : _a.identidad) === null || _b === void 0 ? void 0 : _b.documentoIdentidad))) return [3 /*break*/, 2];
                persona = new Persona_1.default(req.body);
                return [4 /*yield*/, persona.save()];
            case 1:
                _c.sent();
                return [2 /*return*/, res.json({ data: 'Listo' })];
            case 2: return [2 /*return*/, res
                    .status(400)
                    .json({ error: 'La persona ya existe y está registrada' })];
            case 3: return [3 /*break*/, 5];
            case 4:
                error_5 = _c.sent();
                console.error(error_5);
                return [2 /*return*/, res.status(400).json({ error: error_5 })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.crearPersona = crearPersona;
// propietario: IdPersona[]
// administrador: IdPersona[]
// estandar: IdPersona[]
// visitante: IdPersona[]
var asignarEnEmpresa = function (persona, empresa, nivel) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, propietario, _c, administrador, _d, estandar, _e, visitante, isAdded, asignamientos, error_6;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                _f.trys.push([0, 3, , 4]);
                _a = empresa.usuarios, _b = _a.propietario, propietario = _b === void 0 ? [] : _b, _c = _a.administrador, administrador = _c === void 0 ? [] : _c, _d = _a.estandar, estandar = _d === void 0 ? [] : _d, _e = _a.visitante, visitante = _e === void 0 ? [] : _e;
                propietario.filter(function (_id) { return _id !== persona._id; });
                administrador.filter(function (_id) { return _id !== persona._id; });
                estandar.filter(function (_id) { return _id !== persona._id; });
                visitante.filter(function (_id) { return _id !== persona._id; });
                empresa.usuarios = {
                    propietario: propietario,
                    administrador: administrador,
                    estandar: estandar,
                    visitante: visitante,
                };
                if (!empresa.usuarios[nivel]) {
                    empresa.usuarios[nivel] = [];
                }
                isAdded = empresa.usuarios[nivel].find(function (_id) { return _id == persona._id; });
                if (!isAdded) {
                    empresa.usuarios[nivel].push(persona._id);
                }
                asignamientos = persona.asignamientos.filter(function (asignamiento) { return asignamiento._id !== empresa._id; });
                persona.asignamientos = asignamientos;
                persona.asignamientos.push({ tipo: 'Empresa', _id: empresa._id });
                return [4 /*yield*/, empresa.save()];
            case 1:
                _f.sent();
                return [4 /*yield*/, persona.save()];
            case 2:
                _f.sent();
                return [2 /*return*/, true];
            case 3:
                error_6 = _f.sent();
                console.error(error_6);
                return [2 /*return*/, null];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.asignarEnEmpresa = asignarEnEmpresa;
var getPersonaById = function (_id) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, Persona_1.default.findById(_id)];
}); }); };
exports.getPersonaById = getPersonaById;
var asignarEnEmpresaConIdPersona = function (_id, empresa, nivel) { return __awaiter(void 0, void 0, void 0, function () {
    var persona, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                return [4 /*yield*/, exports.getPersonaById(_id)];
            case 1:
                persona = _a.sent();
                if (!persona) return [3 /*break*/, 3];
                return [4 /*yield*/, exports.asignarEnEmpresa(persona, empresa, nivel)];
            case 2: return [2 /*return*/, _a.sent()];
            case 3: return [2 /*return*/, null];
            case 4: return [3 /*break*/, 6];
            case 5:
                error_7 = _a.sent();
                console.error(error_7);
                return [2 /*return*/, null];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.asignarEnEmpresaConIdPersona = asignarEnEmpresaConIdPersona;
/**
 * Registrar una persona
 *
 * Asignar una persona durante el registro de una empresa
 * Asignar una persona durante la edición de usuarios de una empresa
 *
 *
 */
/*
if(existePersona) {
  empresa.usuarios
  const yaEsPropietario = await Empresa.findOne({
    'usuarios.propietario': persona._id,
  })
  const yaEsAdministrador = await Empresa.findOne({
    'usuarios.administrador': persona._id,
  })
  const yaEsEstandar = await Empresa.findOne({
    'usuarios.estandar': persona._id,
  })
  const yaEsVisitante = await Empresa.findOne({
    'usuarios.visitante': persona._id,
  })
  if (yaAsignado) {
    const { tipo } = asignamiento
  }
} else {
  await persona.save()
}
*/
