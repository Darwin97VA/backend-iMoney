"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var config_1 = __importDefault(require("../config"));
var DB_PROTOCOL = config_1.default.DB_PROTOCOL, DB_HOST = config_1.default.DB_HOST, DB_PORT = config_1.default.DB_PORT, DB_USER = config_1.default.DB_USER, DB_PASSWORD = config_1.default.DB_PASSWORD, DB_NAME = config_1.default.DB_NAME, DB_SETTINGS = config_1.default.DB_SETTINGS;
var URL = DB_PROTOCOL + "://" + DB_USER + ":" + DB_PASSWORD + "@" + DB_HOST + "/" + DB_NAME + DB_SETTINGS;
exports.default = (function () {
    return mongoose_1.default.connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});
