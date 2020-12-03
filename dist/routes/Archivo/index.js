"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.path_files = void 0;
// import { getPersona } from '../../controller/persona'
var express_1 = __importStar(require("express"));
var express_fileupload_1 = __importDefault(require("express-fileupload"));
var path_1 = __importDefault(require("path"));
var archivo_1 = require("../../controller/archivo");
var router = express_1.Router();
exports.path_files = path_1.default.resolve(__dirname, '..', '..', '..', 'archivos');
router.use(express_fileupload_1.default({
    limits: { fileSize: 50 * 1024 * 1024 },
}));
router.use(express_1.default.static(exports.path_files));
router.post('/:persona/:tipoDonde/:idDonde', /* getPersona(), */ archivo_1.create);
exports.default = router;
