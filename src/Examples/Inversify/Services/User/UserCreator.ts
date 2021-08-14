import { injectable } from 'inversify';

@injectable()
export class UserCreator {
  public async run(): Promise<void> {
    console.info('create!!');
  }
}
