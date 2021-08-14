import { controller } from '../../Decorators/Controller';

@controller('/product', () => {
  console.info('product');
})
export class ProductController {}
