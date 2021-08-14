import { AdapterTypes } from '../AdapterTypes';
import { ProductController } from '../Controllers/ProductController';
import { ProductFinder } from '../Services/Product/ProductFinder';

export class ProductContainer {
  public static container(): AdapterTypes {
    return {
      controllers: [ProductController],
      services: [ProductFinder],
    };
  }
}
