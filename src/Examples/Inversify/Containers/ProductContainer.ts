import { AdapterTypes } from '../AdapterTypes';
import { ProductController } from '../Controllers/ProductController';
import { ProductFinder } from '../Services/Product/ProductFinder';
import { ProductCreator } from '../Services/Product/ProductCreator';
import { ProductModifier } from '../Services/Product/ProductModifier';
import { ProductRemover } from '../Services/Product/ProductRemover';

export class ProductContainer {
  public static container(): AdapterTypes {
    return {
      controllers: [ProductController],
      services: [ProductFinder, ProductCreator, ProductModifier, ProductRemover],
    };
  }
}
