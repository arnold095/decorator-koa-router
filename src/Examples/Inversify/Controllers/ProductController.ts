import { Context, Next } from 'koa';
import { ProductFinder } from '../Services/Product/ProductFinder';
import { controller, httpPost, httpPut } from '@decorators';
import { inject, injectable } from 'inversify';

@controller('/product', async (context: Context, next: Next) => {
  console.info('Middleware 1');
  await next();
})
@injectable()
export class ProductController {
  constructor(@inject('ProductFinder') private readonly productFinder: ProductFinder) {}

  @httpPost('/', async (context: Context, next: Next) => {
    console.info('Middleware 2');
    await next();
  })
  public create(context: Context) {
    const product = this.productFinder.run();
    console.info(product);
  }

  @httpPut('/:productId', () => {
    console.info('Middleware2!!');
  })
  public modify(context: Context) {
    console.info('modify!!!');
  }
}
