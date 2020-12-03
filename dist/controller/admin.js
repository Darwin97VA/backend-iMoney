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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOthersAdmins = exports.login = exports.registerAdmin = exports.getAdmin = void 0;
var _config_1 = __importDefault(require("../_config"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var Admin_1 = __importDefault(require("../models/Admin"));
var Admin_2 = require("../interfaces/Admin");
var getAdmin = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var token, decoded, ID_ADMIN, admin, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                token = req.token;
                if (!token) return [3 /*break*/, 3];
                decoded = jsonwebtoken_1.default.verify(token, _config_1.default.SECRET_JWT);
                if (!(decoded && typeof decoded === 'object')) return [3 /*break*/, 2];
                ID_ADMIN = decoded.ID_ADMIN;
                return [4 /*yield*/, Admin_1.default.findById(ID_ADMIN)];
            case 1:
                admin = _a.sent();
                if (admin) {
                    if (!req.__data) {
                        req.__data = {};
                    }
                    req.__data.admin = admin;
                    return [2 /*return*/, next()];
                }
                _a.label = 2;
            case 2: return [2 /*return*/, res.status(400).json({ data: 'El token de acceso está corrupto' })];
            case 3: return [2 /*return*/, res.status(400).json({ data: 'No se entregó el token de acceso.' })];
            case 4:
                error_1 = _a.sent();
                console.error(error_1);
                return [2 /*return*/, res.status(400).json({ error: error_1 })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.getAdmin = getAdmin;
var registerAdmin = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var __data, body, admin, error_2;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                __data = req.__data, body = req.body;
                if (!(((_a = __data === null || __data === void 0 ? void 0 : __data.admin) === null || _a === void 0 ? void 0 : _a.tipo) === Admin_2.TipoAdmin.Propietario)) return [3 /*break*/, 2];
                admin = new Admin_1.default(body);
                return [4 /*yield*/, admin.save()];
            case 1:
                _b.sent();
                return [2 /*return*/, res.json({ data: 'Listo, por favor cambie su contraseña.' })];
            case 2: return [2 /*return*/, res
                    .status(400)
                    .json({ error: 'Sólo el Admin Propietario puede añadir más admins.' })];
            case 3:
                error_2 = _b.sent();
                console.error(error_2);
                return [2 /*return*/, res.status(400).json({ error: error_2 })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.registerAdmin = registerAdmin;
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var admin, verificaPassword, ID_ADMIN, dataToken, token, data, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                if (!(req.body.correo && req.body.contraseña)) return [3 /*break*/, 3];
                return [4 /*yield*/, Admin_1.default.findOne({ correo: req.body.correo })];
            case 1:
                admin = _a.sent();
                if (!admin) return [3 /*break*/, 3];
                return [4 /*yield*/, admin.comparePassword(req.body.contraseña)];
            case 2:
                verificaPassword = _a.sent();
                if (verificaPassword) {
                    ID_ADMIN = admin._id;
                    dataToken = { ID_ADMIN: ID_ADMIN };
                    token = jsonwebtoken_1.default.sign(dataToken, _config_1.default.SECRET_JWT);
                    data = {};
                    return [2 /*return*/, data
                            ? res.json({ data: { token: token, _id: ID_ADMIN, data: data } })
                            : res.json({
                                data: { token: token, _id: ID_ADMIN },
                                error: 'Hubo un problema recopilando la data inicial.',
                            })];
                }
                _a.label = 3;
            case 3: return [2 /*return*/, res.status(400).json({ error: 'Credencial inválidas' })];
            case 4:
                error_3 = _a.sent();
                console.error(error_3);
                return [2 /*return*/, res.status(400).json({ error: error_3 })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.login = login;
var updateOthersAdmins = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var __data, body /* La información del admin, incluido su _id, ya actualizado */, adminEjecutor, admin, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                __data = req.__data, body = req.body;
                if (!(__data === null || __data === void 0 ? void 0 : __data.admin)) return [3 /*break*/, 4];
                return [4 /*yield*/, Admin_1.default.findById(__data.admin._id)];
            case 1:
                adminEjecutor = _a.sent();
                if (!((adminEjecutor === null || adminEjecutor === void 0 ? void 0 : adminEjecutor.tipo) === Admin_2.TipoAdmin.Propietario || // Lo hace el propietario
                    (adminEjecutor === null || adminEjecutor === void 0 ? void 0 : adminEjecutor._id) === body._id) // Lo hace el mismo admin
                ) return [3 /*break*/, 3]; // Lo hace el mismo admin
                return [4 /*yield*/, Admin_1.default.findByIdAndUpdate(body._id, body)];
            case 2:
                admin = _a.sent();
                return [2 /*return*/, admin
                        ? res.json({ data: 'Admin actualizado.' })
                        : res
                            .status(400)
                            .json({ error: 'No se encontró el administrador a actualizar' })];
            case 3: return [2 /*return*/, res.json({ data: 'Sólo el propietario puede hacer ese cambio.' })];
            case 4: return [2 /*return*/, res
                    .status(400)
                    .json({ error: 'No tiene permisos para este procedimiento.' })];
            case 5:
                error_4 = _a.sent();
                console.error(error_4);
                return [2 /*return*/, res.status(400).json({ error: error_4 })];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.updateOthersAdmins = updateOthersAdmins;
