"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getHtml = function (_a) {
    var URL = _a.URL;
    return "\n    <table>\n        <thead>\n            <tr>\n                <th>\n                    <h1>Confirme su registro!</h1>\n                </th>\n            </tr>\n        </thead>\n        <tbody>\n            <tr>\n                <td>\n                    <a href=\"" + URL + "\" target=\"_blank\"\n                        style=\"border-radius: 8px; color: white; background: blue; padding: 2px 8px;\">\n                        Confirmar\n                    </a>\n                </td>\n            </tr>\n            \n            <tr>\n                <td>\n                    <div>\n                        Si no se visualiza el bot\u00F3n entonces ingrese a la siguiente URL para confirmar su registro:\n                    </div>\n                    <div style=\"color: blue; text-decoration: underline\">" + URL + "</div>\n                </td>\n            </tr>\n\n        </tbody>\n    </table>\n";
};
exports.default = getHtml;
