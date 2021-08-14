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

  public container(): Container {
    return this._container;
  }

  public get<T>(className: string): T {
    return this.container().get<T>(className);
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
