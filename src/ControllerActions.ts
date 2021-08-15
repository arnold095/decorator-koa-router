import { Context, Next } from 'koa';

export enum HTTP_METHODS_SUPPORTED {
  PUT = 'put',
  POST = 'post',
  GET = 'get',
  DELETE = 'delete',
}

export const makeSureItIsASupportedMethod = (method: HTTP_METHODS_SUPPORTED): void => {
  if (!Object.values(HTTP_METHODS_SUPPORTED).includes(method)) {
    throw new Error(`This method is not allowed [${method}]`);
  }
};

export type MethodTypes = {
  type: HTTP_METHODS_SUPPORTED;
  route: string;
  method: string;
  middleware: ((context: Context, next: Next) => Promise<void>)[];
};

type ActionTypes = {
  [controllerName: string]: MethodTypes[];
};

export const ControllerActions: ActionTypes = {};
