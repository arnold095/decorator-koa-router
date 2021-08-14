import 'reflect-metadata';
import Router from '@koa/router';
import { glob } from 'glob';
import { ControllerActionsMapper } from './Utils/ControllerActionsMapper';
import { IocAdapter } from './IocAdapter';
import { HTTP_METHODS_SUPPORTED } from '@decorators';

export const RouterBuilder = async (
  prefix = '/',
  iocAdapter: IocAdapter,
  controllersPath: string
): Promise<Router.Middleware> => {
  await loadRoutes(controllersPath);
  const controllers = ControllerActionsMapper();
  const router = new Router({ prefix });
  for (const controller of controllers) {
    if (!controller.actions) continue;
    const instanceOfController = iocAdapter.get<any>(controller.target.name);
    console.info(controller.middleware);
    for (const action of controller.actions) {
      const apiRoute = `${controller.route}${action.route}`;
      const { method } = action;
      if (action.type === HTTP_METHODS_SUPPORTED.POST) {
        router.post(
          apiRoute,
          controller.middleware,
          action.middleware,
          instanceOfController[method].bind(instanceOfController)
        );
      } else if (action.type === HTTP_METHODS_SUPPORTED.PUT) {
        router.put(apiRoute, instanceOfController[method].bind(instanceOfController));
      }
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
