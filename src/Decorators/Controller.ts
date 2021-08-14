/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
// import { Instantiable } from '../Utils/GenericTypes/Instantiable';
export type ControllerTypes = {
  target: Object & { name: string };
  route: string;
  middleware: any;
};
export const Controllers: ControllerTypes[] = [];

export const controller = (path: string, middleware: any) => {
  return function (target: Object): void {
    Controllers.push({
      target,
      route: path,
      middleware,
    });
  };
};
