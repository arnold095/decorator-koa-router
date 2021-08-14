import { AdapterTypes } from '../AdapterTypes';
import { UserController } from '../Controllers/UserController';
import { UserFinder } from '../Services/User/UserFinder';

export class UserContainer {
  public static container(): AdapterTypes {
    return {
      controllers: [UserController],
      services: [UserFinder],
    };
  }
}
