import { injectable } from 'inversify';

@injectable()
export class ProductCreator {
  public async run(): Promise<void> {
    console.info('create!!');
  }
}
