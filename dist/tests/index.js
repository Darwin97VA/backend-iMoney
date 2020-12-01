"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var registerConfirmation_1 = __importDefault(require("../emails/registerConfirmation"));
var _config_1 = __importDefault(require("../_config"));
var URL_BASE = _config_1.default.URL_BASE;
var tests = function () {
    registerConfirmation_1.default('darwin97.va@gmail.com', {
        URL: 'https://google.com.pe',
        nombre: 'Darwin VA !!',
        urlBase: URL_BASE,
    })
        .then(console.log)
        .catch(console.error);
};
exports.default = tests;
