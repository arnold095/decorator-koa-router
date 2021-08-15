/* eslint-disable @typescript-eslint/ban-types */
import { ControllerActions, MethodTypes } from './ControllerActions';
import { Context, Next } from 'koa';

export type ControllerTypes = {
  target: Object & { name: string };
  route: string;
  middleware: ((context: Context, next: Next) => Promise<void>)[];
};

export const Controllers: ControllerTypes[] = [];

type ControllerWithActions = {
  actions: MethodTypes[];
} & ControllerTypes;

export const ControllerActionsMapper = (): ControllerWithActions[] => {
  const controllers: ControllerWithActions[] = [];
  for (const controller of Controllers) {
    controllers.push({
      ...controller,
      actions: ControllerActions[controller.target.name],
    });
  }
  return controllers;
};
