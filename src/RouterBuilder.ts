import Router from '@koa/router';
import { glob } from 'glob';
import { ControllerActionsMapper } from './Utils/ControllerActionsMapper';
export const RouterBuilder = async (
  prefix: string,
  controllersPath: string
): Promise<Router.Middleware> => {
  await loadRoutes(controllersPath);
  const controllers = ControllerActionsMapper();
  console.info(controllers);
  const router = new Router({ prefix });
  return router.routes();
};

const loadRoutes = async (controllersPath: string): Promise<void> => {
  const routes = glob.sync(controllersPath);
  for (const route of routes) {
    await import(route);
  }
};
