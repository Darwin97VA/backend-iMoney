"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var socket_io_1 = __importDefault(require("socket.io"));
var initSocketIO = function (httpServer) {
    var io = socket_io_1.default(httpServer);
    //   https://socket.io/docs/v3/migrating-from-2-x-to-3-0/index.html#CORS-handling
};
exports.default = initSocketIO;
