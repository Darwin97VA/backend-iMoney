"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var models_1 = __importDefault(require("./models"));
var express_1 = __importDefault(require("express"));
var http_1 = require("http");
var socket_io_1 = __importDefault(require("./socket.io"));
var routes_1 = __importDefault(require("./routes"));
var PORT = process.env.PORT || 3090;
var Logger = function (req, _res, next) {
    console.log(req.body, req.headers);
    next();
};
// Database
models_1.default()
    .then(function (_connection) {
    // Express
    var app = express_1.default();
    // app.use(Logger)
    app.use(routes_1.default);
    // HTTP
    var http = http_1.createServer(app);
    // Socket IO
    socket_io_1.default(http);
    http.listen(PORT, function () { return console.log("Running in " + PORT + " port."); });
    // console.log('5 segundos')
    // setTimeout(() => {
    //   tests()
    // }, 5000)
})
    .catch(function (error) { return console.log(error); });
