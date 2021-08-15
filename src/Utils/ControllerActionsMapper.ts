import {
  Controllers,
  ControllerTypes,
  ControllerActions,
  MethodTypes,
} from '../Decorators/';

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
