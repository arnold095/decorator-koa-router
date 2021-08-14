/* eslint-disable @typescript-eslint/ban-types */
import { ControllerActions, HTTP_METHODS_SUPPORTED, MethodTypes } from '@decorators';

export function httpPut(route: string, ...middleware: MethodTypes['middleware']) {
  return function (object: Object, methodName: string): void {
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
