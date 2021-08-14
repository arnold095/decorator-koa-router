import Router from '@koa/router';
import { glob } from 'glob';
export const RouterBuilder = (
  prefix: string,
  controllersPath: string
): Router.Middleware => {
  const routes = glob.sync(controllersPath);
  routes.forEach(async (route) => {
    await import(route);
  });
  const router = new Router({ prefix });
  return router.routes();
};
