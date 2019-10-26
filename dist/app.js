"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socket_io_1 = __importDefault(require("socket.io"));
const http_1 = require("http");
class App {
    constructor(controllers, port) {
        this.app = express_1.default();
        this.port = port;
        this.createServer();
        this.createSocketServ();
        this.initializeControllers(controllers);
    }
    initializeControllers(controllers) {
        controllers.forEach((controller) => {
            this.app.use('/', controller.router);
        });
    }
    createServer() {
        this.mainServer = http_1.createServer(this.app);
    }
    createSocketServ() {
        this.io = socket_io_1.default(this.mainServer);
    }
    listenMainSever() {
        this.mainServer.listen(this.port, () => {
            console.log('Running server on port %s', this.port);
        });
    }
    listenSocketServ() {
        this.io.on("connection", function (socket) {
            console.log("Socket Connection Created");
            socket.on("foo", function (message) {
                console.log("The incremented value of foo is "
                    + message);
            });
            socket.on("end", function () {
                console.log("Closing socket connection");
                socket.disconnect();
            });
        });
    }
    listen() {
        this.listenMainSever();
        this.listenSocketServ();
    }
}
exports.default = App;
