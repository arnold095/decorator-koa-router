# Decorator koa router

### Usage

This library streamlines the declaration of routes, allowing an agile development of the APIs.

The integration has been done under the official package of the Koa team: https://www.npmjs.com/package/@koa/router


To use this library it is necessary to work with a dependency container. 

Examples have been made with the InversifyJS and node-dependency-injection packages.

You can integrate any other dependency injector as long as it complies with the "IocAdapter" interface


### Example with InversifyJS

Server.ts
```ts 
import 'reflect-metadata';
import Koa from 'koa';
import { join } from 'path';
import { InversifyIocAdapter } from './InversifyIocAdapter';
import { RouterBuilder } from '../../RouterBuilder';

export class Server {
  public static async load(): Promise<void> {
    const port = 3000;
    const koaServer = new Koa();
    
    const controllersPath = join(__dirname, './Controllers/*.ts');// The path where controllers are
    const iocAdapter = new InversifyIocAdapter();
    const router = await RouterBuilder('/api', iocAdapter, controllersPath);
    
    koaServer.use(router);
    koaServer.listen(port);
    console.info(`Server running at port ${port}`);
  }
}
Server.load();
```
InversifyIocAdapter
```ts
import { IocAdapter } from '../../IocAdapter';
import { Container } from 'inversify';
import { AdapterTypes } from './AdapterTypes';
import { ProductContainer } from './Containers/ProductContainer';
import { UserContainer } from './Containers/UserContainer';

export class InversifyIocAdapter implements IocAdapter {
  private _container: Container = new Container();

  constructor() {
    this.inject(ProductContainer.container());
    this.inject(UserContainer.container());
  }

  public get<T>(className: string): T {
    return this.container().get<T>(className);
  }

  private container(): Container {
    return this._container;
  }

  private inject(dependencies: AdapterTypes) {
    const { controllers, services } = dependencies;
    if (controllers) this.bindControllers(controllers);
    if (services) this.bindServices(services);
  }

  private bindControllers(controllers: AdapterTypes['controllers']) {
    if (controllers) {
      for (const controller of controllers) {
        this.container().bind(controller.name).to(controller).inRequestScope();
      }
    }
  }

  private bindServices(services: AdapterTypes['services']) {
    if (services) {
      for (const service of services) {
        this.container().bind(service.name).to(service).inRequestScope();
      }
    }
  }
}
```
ProductContainer
```ts
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
```
ProductController
```ts
import { Context, Response } from 'koa';
import { ProductFinder } from '../Services/Product/ProductFinder';
import { controller, httpPost, httpPut, httpGet, httpDelete } from '@decorators';
import { inject, injectable } from 'inversify';
import { ProductCreator } from '../Services/Product/ProductCreator';
import { ProductModifier } from '../Services/Product/ProductModifier';
import { ProductRemover } from '../Services/Product/ProductRemover';

@controller('/product')
@injectable()
export class ProductController {
  constructor(
    @inject('ProductFinder') private readonly productFinder: ProductFinder,
    @inject('ProductCreator') private readonly productCreator: ProductCreator,
    @inject('ProductModifier') private readonly productModifier: ProductModifier,
    @inject('ProductRemover') private readonly productRemover: ProductRemover
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
```
ProductFinder.ts (service)
```ts
import { injectable } from 'inversify';

@injectable()
export class ProductFinder {
  public async run(): Promise<Record<string, string | number>> {
    return {
      id: 1,
      name: 'test',
    };
  }
}
```

### Example with node-dependency-injection
server.ts
```ts
import 'reflect-metadata';
import Koa from 'koa';
import { join } from 'path';
import { RouterBuilder } from '../../RouterBuilder';
import { NodeDependencyInjectionIocAdapter } from './NodeDependencyInjectionIocAdapter';

export class Server {
  public static async load(): Promise<void> {
    const port = 3000;
    const koaServer = new Koa();
    const controllersPath = join(__dirname, './Controllers/*.ts');
    const iocAdapter = new NodeDependencyInjectionIocAdapter();
    const router = await RouterBuilder('/api', iocAdapter, controllersPath);
    koaServer.use(router);
    koaServer.listen(port);
    console.info(`Server running at port ${port}`);
  }
}
Server.load();
```
NodeDependencyInjectionIocAdapter.ts
```ts
import { IocAdapter } from '../../IocAdapter';
import { join } from 'path';
import { ContainerBuilder, YamlFileLoader } from 'node-dependency-injection';

export class NodeDependencyInjectionIocAdapter implements IocAdapter {
  private readonly container: ContainerBuilder;

  constructor() {
    this.container = new ContainerBuilder();
    const loader = new YamlFileLoader(this.container);
    loader.load(join(__dirname, './Containers/Container.yaml'));
  }

  get<T>(className: string): T {
    return this.container.get<T>(className);
  }
}
```
ProductController.ts

```ts
import { Context, Next, Response } from 'koa';
import { ProductFinder } from '../Services/Product/ProductFinder';
import { controller, httpPost, httpPut, httpGet, httpDelete } from '@decorators';
import { ProductCreator } from '../Services/Product/ProductCreator';
import { ProductModifier } from '../Services/Product/ProductModifier';
import { ProductRemover } from '../Services/Product/ProductRemover';

@controller('/product', (ctx: Context, next: Next) => {
  console.info('Middleware 1');
  next();
}, (ctx: Context, next: Next) => {
  console.info('Middleware 2...');
  next();
})
export class ProductController {
  constructor(
    private readonly productFinder: ProductFinder,
    private readonly productCreator: ProductCreator,
    private readonly productModifier: ProductModifier,
    private readonly productRemover: ProductRemover
  ) {
  }

  @httpGet('/', (ctx: Context, next: Next) => {
    console.info('Middleware 3');
    next();
  }, (ctx: Context, next: Next) => {
    console.info('Middleware 4...');
    next();
  })
  public async listAll({response}: Context): Promise<Response> {
    const product = await this.productFinder.run();
    response.status = 200;
    response.body = product;
    return response;
  }

  @httpPost('/')
  public async create({response}: Context): Promise<Response> {
    await this.productCreator.run();
    response.status = 201;
    return response;
  }

  @httpPut('/:productId')
  public async modify({response}: Context): Promise<Response> {
    await this.productModifier.run();
    response.status = 204;
    return response;
  }

  @httpDelete('/:productId')
  public async remove({response}: Context): Promise<Response> {
    await this.productRemover.run();
    response.status = 200;
    return response;
  }
}
```

ProductFinder.ts (service)
```ts
export class ProductFinder {
  public async run(): Promise<Record<string, string | number>> {
    return {
      id: 1,
      name: 'test',
    };
  }
}
```

### Decorators reference

| Signature                            | Example                                              | Description                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ------------------------------------ | ---------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@controller(controllerRoute: string, ...middlewares)`     | `@controller("/product") class ProductController`         | class defined as controller, the paths of the methods that contain this class will be concatenated.
| `@httpGet(methodRoute: string, ...middlewares)`     | `@httpGet("/") async getProduct()`         | This decorator defines a route of type GET    
| `@httpPost(methodRoute: string, ...middlewares)`     | `@httpPost("/") async createProduct()`         | This decorator defines a route of type POST    
| `@httpPut(methodRoute: string, ...middlewares)`     | `@httpPut("/:productId") async updateProduct()`         | This decorator defines a route of type PUT    
| `@httpDelete(methodRoute: string, ...middlewares)`     | `@httpDelete("/:productId") async removeProduct()`         | This decorator defines a route of type DELETE
