import { controller } from '@decorators';
import { injectable } from 'inversify';

@controller('/user', () => {
  console.info('user!');
})
@injectable()
export class UserController {}
