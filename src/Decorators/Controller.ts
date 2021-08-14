/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
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
  return function (target: Object & { name: string }): void {
    Controllers.push({
      target,
      route: path,
      middleware,
    });
  };
};
