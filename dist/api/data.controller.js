"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const socket_io_client_1 = __importDefault(require("socket.io-client"));
class DataController {
    constructor() {
        this.path = '/api/data';
        this.router = express.Router();
        this.performFooOp = (request, response) => {
            let foo = request.query["foo"];
            let res;
            if (foo) {
                let incrementedFoo = this.incrementFoo(Number(foo));
                this.createClientSocketConnection();
                this.emitFoo(incrementedFoo);
                this.closeSocket();
                res = "The value of foo variable has been send to the socket";
            }
            else {
                res = "Please assign the value of foo variable";
            }
            response.send({ "result": res });
        };
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router.get(this.path, this.performFooOp);
    }
    incrementFoo(foo) {
        return foo + 1;
    }
    createClientSocketConnection() {
        this.socketConn = socket_io_client_1.default('http://localhost:5000');
    }
    emitFoo(incremFoo) {
        this.socketConn.emit("foo", incremFoo);
    }
    closeSocket() {
        this.socketConn.emit("end");
    }
}
exports.default = DataController;
