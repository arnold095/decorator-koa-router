import { controller } from '../../Decorators/Controller';

@controller('/user', () => {
  console.info('user!');
})
export class UserController {}
