import { Context, Response } from 'koa';
import { ProductFinder } from '../Services/Product/ProductFinder';
import { controller, httpPost, httpPut, httpGet, httpDelete } from '@decorators';
import { ProductCreator } from '../Services/Product/ProductCreator';
import { ProductModifier } from '../Services/Product/ProductModifier';
import { ProductRemover } from '../Services/Product/ProductRemover';

@controller('/product')
export class ProductController {
  constructor(
    private readonly productFinder: ProductFinder,
    private readonly productCreator: ProductCreator,
    private readonly productModifier: ProductModifier,
    private readonly productRemover: ProductRemover
  ) {}

  @httpGet('/')
  public async listAll({ response }: Context): Promise<Response> {
    const product = await this.productFinder.run();
    response.status = 200;
    response.body = product;
    return response;
  }

  @httpPost('/')
  public async create({ response }: Context): Promise<Response> {
    await this.productCreator.run();
    response.status = 201;
    return response;
  }

  @httpPut('/:productId')
  public async modify({ response }: Context): Promise<Response> {
    await this.productModifier.run();
    response.status = 204;
    return response;
  }

  @httpDelete('/:productId')
  public async remove({ response }: Context): Promise<Response> {
    await this.productRemover.run();
    response.status = 200;
    return response;
  }
}
