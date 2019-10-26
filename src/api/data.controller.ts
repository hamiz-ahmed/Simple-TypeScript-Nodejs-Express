import * as express from 'express';
import io from 'socket.io-client';


class DataController {
  public path = '/api/data';
  public router = express.Router();
  private socketConn: SocketIOClient.Socket;

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.get(this.path, this.performFooOp);
  }

  private incrementFoo(foo: number): number {
    return foo + 1;
  }

  private createClientSocketConnection() {
    this.socketConn = io('http://localhost:5000');
  }

  private emitFoo(incremFoo: number) {
    this.socketConn.emit("foo", incremFoo);
  }

  private closeSocket() {
    this.socketConn.emit("end");
  }

  performFooOp = (request: express.Request, response: express.Response) => {

    let foo = request.query["foo"];
    let res: string;

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
  }
}

export default DataController;