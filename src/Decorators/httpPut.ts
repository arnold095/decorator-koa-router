/* eslint-disable @typescript-eslint/ban-types */
import { ControllerActions, HTTP_METHODS_SUPPORTED } from './ControllerActions';

export function httpPut(route: string, middleware: any) {
  return function (object: Object, methodName: string) {
    if (!ControllerActions[object.constructor.name]) {
      ControllerActions[object.constructor.name] = [];
    }
    const definition = {
      type: HTTP_METHODS_SUPPORTED.PUT,
      route,
      method: methodName,
      middleware,
    };
    ControllerActions[object.constructor.name].push(definition);
  };
}
