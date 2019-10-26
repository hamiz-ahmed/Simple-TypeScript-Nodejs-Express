import express from 'express';
import socketIo from 'socket.io';
import { createServer, Server } from 'http';

class App {
  public app: express.Application;
  public port: number;
  public io: SocketIO.Server;
  public mainServer: Server;

  constructor(controllers: import("./api/data.controller").default[], port: number) {
    this.app = express();
    this.port = port;

    this.createServer();
    this.createSocketServ();
    this.initializeControllers(controllers);
  }

  private initializeControllers(controllers:
    import("./api/data.controller").default[]) {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });
  }

  private createServer(): void {
    this.mainServer = createServer(this.app);
  }

  private createSocketServ(): void {
    this.io = socketIo(this.mainServer);
  }

  private listenMainSever() {
    this.mainServer.listen(this.port, () => {
      console.log('Running server on port %s', this.port);
    });
  }

  private listenSocketServ() {
    this.io.on("connection", function (socket: any) {
      console.log("Socket Connection Created");

      socket.on("foo", function (message: any) {
        console.log("The incremented value of foo is "
          + message);
      });

      socket.on("end", function () {
        console.log("Closing socket connection");
        socket.disconnect();
      });
    });
  }

  public listen() {
    this.listenMainSever();
    this.listenSocketServ();
  }
}

export default App;