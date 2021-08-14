import 'reflect-metadata';
import Router from '@koa/router';
import { glob } from 'glob';
import { ControllerActionsMapper } from './Utils/ControllerActionsMapper';
import { IocAdapter } from './IocAdapter';
export const RouterBuilder = async (
  prefix: string,
  iocAdapter: IocAdapter,
  controllersPath: string
): Promise<Router.Middleware> => {
  await loadRoutes(controllersPath);
  const controllers = ControllerActionsMapper();
  const router = new Router({ prefix });
  for (const controller of controllers) {
    if (!controller.actions) continue;
    const instanceOfController = iocAdapter.get(controller.target.name);
    console.info(instanceOfController);
    for (const action of controller.actions) {
      const apiRoute = `${controller.route}${action.route}`;
      console.info(apiRoute);
    }
  }
  return router.routes();
};

const loadRoutes = async (controllersPath: string): Promise<void> => {
  const routes = glob.sync(controllersPath);
  for (const route of routes) {
    await import(route);
  }
};
