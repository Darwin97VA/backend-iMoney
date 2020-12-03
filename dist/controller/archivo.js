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
exports.create = void 0;
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var Archivo_1 = require("../routes/Archivo");
var Archivo_2 = __importDefault(require("../models/Archivo"));
var moveFile = function (file, __path, name) {
    var _path = path_1.default.resolve(__path);
    var exist = fs_1.default.existsSync(_path);
    if (!exist) {
        fs_1.default.mkdirSync(_path, { recursive: true });
    }
    return file.mv(_path + '/' + name);
};
var create = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var momento, params, files, persona, tipoDonde, idDonde, dni, representante, mensaje, cambio, path_api, name, name, name, name, finalPath, nuevoArchivo, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 13, , 14]);
                momento = new Date().getTime();
                params = req.params, files = req.files;
                persona = params.persona, tipoDonde = params.tipoDonde, idDonde = params.idDonde;
                if (!files) return [3 /*break*/, 11];
                dni = files.dni, representante = files.representante, mensaje = files.mensaje, cambio = files.cambio;
                path_api = '/api/archivo/';
                if (!dni) return [3 /*break*/, 2];
                name = momento + '--' + dni.name;
                return [4 /*yield*/, moveFile(dni, path_1.default.resolve(Archivo_1.path_files, 'dni', persona), name)];
            case 1:
                _a.sent();
                path_api += 'dni/' + persona + '/' + name;
                return [3 /*break*/, 9];
            case 2:
                if (!representante) return [3 /*break*/, 4];
                name = momento + '--' + representante.name;
                return [4 /*yield*/, moveFile(representante, path_1.default.resolve(Archivo_1.path_files, 'representante', persona), name)];
            case 3:
                _a.sent();
                path_api += 'representante/' + persona + '/' + name;
                return [3 /*break*/, 9];
            case 4:
                if (!mensaje) return [3 /*break*/, 6];
                name = momento + '--' + mensaje.name;
                return [4 /*yield*/, moveFile(mensaje, path_1.default.resolve(Archivo_1.path_files, 'mensaje', persona), name)];
            case 5:
                _a.sent();
                path_api += 'mensaje/' + persona + '/' + name;
                return [3 /*break*/, 9];
            case 6:
                if (!cambio) return [3 /*break*/, 8];
                name = momento + '--' + cambio.name;
                return [4 /*yield*/, moveFile(cambio, path_1.default.resolve(Archivo_1.path_files, 'cambio', persona, idDonde), name)];
            case 7:
                _a.sent();
                path_api += 'cambio/' + persona + '/' + idDonde + '/' + name;
                return [3 /*break*/, 9];
            case 8: return [2 /*return*/, res
                    .status(400)
                    .json({ error: 'Falta datos para subir el archivo' })];
            case 9:
                finalPath = path_1.default.resolve(Archivo_1.path_files, path_api);
                nuevoArchivo = new Archivo_2.default({
                    tipo: path_1.default.extname(finalPath),
                    ruta: path_api,
                    subidoPor: {
                        _id: persona,
                        asignamiento: {
                            _id: idDonde,
                            tipo: tipoDonde,
                        },
                    },
                });
                return [4 /*yield*/, nuevoArchivo.save()];
            case 10:
                _a.sent();
                return [2 /*return*/, res.json({ data: path_api })];
            case 11: return [2 /*return*/, res.status(400).json({ error: 'No se envió ningún archivo.' })];
            case 12: return [3 /*break*/, 14];
            case 13:
                error_1 = _a.sent();
                console.error(error_1);
                return [2 /*return*/, res.status(400).json({ error: error_1 })];
            case 14: return [2 /*return*/];
        }
    });
}); };
exports.create = create;
