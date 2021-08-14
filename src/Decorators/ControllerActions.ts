export enum HTTP_METHODS_SUPPORTED {
  PUT = 'put',
  POST = 'post',
  GET = 'get',
  DELETE = 'delete',
}

export type MethodTypes = {
  type: HTTP_METHODS_SUPPORTED;
  route: string;
  method: string;
  middleware: any;
};

export type ActionTypes = {
  [controllerName: string]: MethodTypes[];
};

export const ControllerActions: ActionTypes = {};