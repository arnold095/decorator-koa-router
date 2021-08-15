import { Controllers, ControllerTypes } from '../ControllerActionsMapper';
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
