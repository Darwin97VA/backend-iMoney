"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sender_1 = __importDefault(require("../sender"));
var getHtml_1 = __importDefault(require("./getHtml"));
var SUBJECT = 'Confirma tu registro';
var getText = function (_a) {
    var URL = _a.URL;
    return "\n  Para completar su registro debe acceder al siguiente link: " + URL + "\n";
};
var sendRegisterConfirmation = function (emails, data) {
    return sender_1.default({
        to: emails,
        subject: SUBJECT,
        text: getText(data),
        html: getHtml_1.default(data),
    });
};
exports.default = sendRegisterConfirmation;
