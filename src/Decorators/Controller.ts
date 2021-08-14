/* eslint-disable @typescript-eslint/ban-types */
import { Context, Next } from 'koa';

export type ControllerTypes = {
  target: Object & { name: string };
  route: string;
  middleware: ((context: Context, next: Next) => Promise<void>)[];
};
export const Controllers: ControllerTypes[] = [];

export const controller = (
  path: string,
  ...middleware: ControllerTypes['middleware']
) => {
  return function (target: ControllerTypes['target']): void {
    Controllers.push({
      target,
      route: path,
      middleware,
    });
  };
};
