import 'reflect-metadata';
import Router from '@koa/router';
import { glob } from 'glob';
import { ControllerActionsMapper, ControllerTypes } from './ControllerActionsMapper';
import { IocAdapter } from './IocAdapter';
import {
  HTTP_METHODS_SUPPORTED,
  makeSureItIsASupportedMethod,
  MethodTypes,
} from './ControllerActions';

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
    for (const action of controller.actions) {
      makeSureItIsASupportedMethod(action.type);
      declareRoute(
        router,
        action.type,
        apiRoute(controller.route, action.route),
        middlewares(controller.middleware, action.middleware),
        instanceOfController,
        action.method
      );
    }
  }
  return router.routes();
};

const apiRoute = (controllerRoute: string, methodRoute: string) =>
  `${controllerRoute}${methodRoute}`.replace(/\/\//g, '/');

const middlewares = (
  controllerMiddleware: ControllerTypes['middleware'],
  actionMiddleware: MethodTypes['middleware']
) => [...controllerMiddleware, ...actionMiddleware];

const declareRoute = (
  router: Router,
  httpMethod: HTTP_METHODS_SUPPORTED,
  route: string,
  middlewares: ControllerTypes['middleware'],
  controller: any,
  controllerMethod: string
): void => {
  router[httpMethod](
    route,
    ...middlewares,
    controller[controllerMethod].bind(controller)
  );
};

const loadRoutes = async (controllersPath: string): Promise<void> => {
  const routes = glob.sync(controllersPath);
  for (const route of routes) {
    await import(route);
  }
};
