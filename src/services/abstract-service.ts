import "reflect-metadata";
import { TYPES } from '../interfaces/container';
import { inject, injectable, interfaces } from "inversify";
import { ApplicationServiceInterface } from './application-service';

export interface AbstractServiceInterface {
  container(): interfaces.Container;
  app(): ApplicationServiceInterface;
}

@injectable()
export abstract class AbstractService implements AbstractServiceInterface {
  constructor(@inject(TYPES.Container) protected _container: interfaces.Container) { }

  public container(): interfaces.Container {
    return this._container;
  }

  public app(): ApplicationServiceInterface {
    return this._container.get<ApplicationServiceInterface>(TYPES.ApplicationServiceInterface);
  }
}