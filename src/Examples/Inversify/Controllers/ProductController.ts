import { Context } from 'koa';
import { ProductFinder } from '../Services/Product/ProductFinder';
import { controller, httpPost, httpPut } from '@decorators';
import { inject, injectable } from 'inversify';

@controller('/product', () => {
  console.info('product');
})
@injectable()
export class ProductController {
  constructor(@inject('ProductFinder') private readonly productFinder: ProductFinder) {}

  @httpPost('/', () => {
    console.info('entro');
  })
  public create(context: Context) {
    const product = this.productFinder.run();
    console.info(product);
  }

  @httpPut('/:productId', () => {
    console.info('Put middleware');
  })
  public modify(context: Context) {
    console.info('EEEEENTRO!!');
  }
}
