import 'reflect-metadata';
import Koa from 'koa';
import path from 'path';
import { InversifyIocAdapter } from './InversifyIocAdapter';
import { RouterBuilder } from '../../RouterBuilder';

export class Server {
  public static async load(): Promise<void> {
    const app = new Koa();
    const controllersPath = path.join(__dirname, './Controllers/*.ts');
    const iocAdapter = new InversifyIocAdapter();
    const router = await RouterBuilder('api/', iocAdapter, controllersPath);
    app.use(router);
    app.listen(3000);
  }
}
Server.load();
