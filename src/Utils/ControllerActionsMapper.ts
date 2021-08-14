import { Controllers, ControllerTypes } from '../Decorators/Controller';
import { ControllerActions, MethodTypes } from '../Decorators/ControllerActions';

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
