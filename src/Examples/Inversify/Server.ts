import 'reflect-metadata';
import Koa from 'koa';
import path from 'path';
import { InversifyIocAdapter } from './InversifyIocAdapter';
import { RouterBuilder } from '../../RouterBuilder';

export class Server {
  public static async load(): Promise<void> {
    const port = 3000;
    const koaServer = new Koa();
    const controllersPath = path.join(__dirname, './Controllers/*.ts');
    const iocAdapter = new InversifyIocAdapter();
    const router = await RouterBuilder('/api', iocAdapter, controllersPath);
    koaServer.use(router);
    koaServer.listen(port);
    console.info(`Server running at port ${port}`);
  }
}
Server.load();
