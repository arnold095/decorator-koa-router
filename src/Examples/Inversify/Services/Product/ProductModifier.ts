import { injectable } from 'inversify';

@injectable()
export class ProductModifier {
  public async run(): Promise<void> {
    console.info('modify!!');
  }
}
