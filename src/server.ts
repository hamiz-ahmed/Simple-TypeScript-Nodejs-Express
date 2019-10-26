import App from './app';
import DataController from './api/data.controller';
 
const app = new App(
  [
    new DataController(),
  ],
  5000,
);
 
app.listen();