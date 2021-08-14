import { controller } from '@decorators';
import { injectable } from 'inversify';

@controller('/user')
@injectable()
export class UserController {}
