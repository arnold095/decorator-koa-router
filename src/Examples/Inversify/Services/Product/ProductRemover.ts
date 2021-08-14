import { injectable } from 'inversify';

@injectable()
export class ProductRemover {
  public async run(): Promise<void> {
    console.info('Remove!!');
  }
}
