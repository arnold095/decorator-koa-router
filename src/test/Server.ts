import Koa from 'koa';
import { RouterBuilder } from '../RouterBuilder';
import path from 'path';

export class Server {
  public static load(): void {
    const app = new Koa();
    const controllersPath = path.join(__dirname, './Controllers/*.ts');
    app.use(RouterBuilder('api/', controllersPath));
    app.listen(3000);
  }
}
Server.load();
