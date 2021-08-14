/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Instantiable } from '../Utils/GenericTypes/Instantiable';
export type ControllerTypes = {
  target: Instantiable;
  route: string;
  middleware: any;
};
export const Controllers: ControllerTypes[] = [];

export const controller = (path: string, middleware: any) => {
  return function (target: Instantiable): void {
    Controllers.push({
      target,
      route: path,
      middleware,
    });
  };
};
