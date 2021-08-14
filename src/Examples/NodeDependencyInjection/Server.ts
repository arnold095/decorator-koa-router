import 'reflect-metadata';
import Koa from 'koa';
import { join } from 'path';
import { RouterBuilder } from '../../RouterBuilder';
import { NodeDependencyInjectionIocAdapter } from './NodeDependencyInjectionIocAdapter';

export class Server {
  public static async load(): Promise<void> {
    const port = 3000;
    const koaServer = new Koa();
    const controllersPath = join(__dirname, './Controllers/*.ts');
    const iocAdapter = new NodeDependencyInjectionIocAdapter();
    const router = await RouterBuilder('/api', iocAdapter, controllersPath);
    koaServer.use(router);
    koaServer.listen(port);
    console.info(`Server running at port ${port}`);
  }
}
Server.load();
