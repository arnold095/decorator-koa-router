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
