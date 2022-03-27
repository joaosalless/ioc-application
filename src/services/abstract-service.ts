import "reflect-metadata";
import { TYPES } from '../interfaces/container';
import { inject, injectable, interfaces } from "inversify";

export interface AbstractServiceInterface {
  container(): interfaces.Container;
}

@injectable()
export abstract class AbstractService implements AbstractServiceInterface {
  constructor(@inject(TYPES.Container) protected _container: interfaces.Container) {}

  public container(): interfaces.Container {
    return this._container;
  }
}