import Koa from 'koa';
import { RouterBuilder } from '../RouterBuilder';
import path from 'path';

export class Server {
  public static async load(): Promise<void> {
    const app = new Koa();
    const controllersPath = path.join(__dirname, './Controllers/*.ts');
    const router = await RouterBuilder('api/', controllersPath);
    app.use(router);
    app.listen(3000);
  }
}
Server.load();
