/* eslint-disable @typescript-eslint/ban-types */
import {
  ControllerActions,
  HTTP_METHODS_SUPPORTED,
  MethodTypes,
} from '../ControllerActions';

export function httpDelete(route: string, ...middleware: MethodTypes['middleware']) {
  return function (object: Object, methodName: string): void {
    if (!ControllerActions[object.constructor.name]) {
      ControllerActions[object.constructor.name] = [];
    }
    const definition = {
      type: HTTP_METHODS_SUPPORTED.DELETE,
      route,
      method: methodName,
      middleware,
    };
    ControllerActions[object.constructor.name].push(definition);
  };
}
