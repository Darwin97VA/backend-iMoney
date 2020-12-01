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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = __importDefault(require("../config"));
var nodemailer_1 = require("nodemailer");
var SMTP_USER = config_1.default.SMTP_USER, SMTP_PASSWORD = config_1.default.SMTP_PASSWORD, SMTP_HOST = config_1.default.SMTP_HOST, SMTP_PORT = config_1.default.SMTP_PORT, MAIL_NAME = config_1.default.MAIL_NAME;
var transporter = nodemailer_1.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: false,
    auth: {
        user: SMTP_USER,
        pass: SMTP_PASSWORD,
    },
});
var sender = function (options) {
    return transporter.sendMail(__assign({ from: "\"" + MAIL_NAME + "\" <" + SMTP_USER + ">" }, options));
};
exports.default = sender;
