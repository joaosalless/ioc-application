import "reflect-metadata";
import { TYPES } from '../interfaces/container';
import { inject, injectable, interfaces } from "inversify";
import { ApplicationServiceInterface } from './application-service';

export interface AbstractServiceInterface {
  container(): interfaces.Container;
  app(): ApplicationServiceInterface;
  instanceId(): string;
}

@injectable()
export abstract class AbstractService implements AbstractServiceInterface {
  protected _instanceId: string;

  constructor(@inject(TYPES.Container) protected _container: interfaces.Container) {
    this._instanceId = String((new Date).getTime());
  }

  public container(): interfaces.Container {
    return this._container;
  }

  public instanceId(): string {
    return this._instanceId;
  }

  public app(): ApplicationServiceInterface {
    return this._container.get<ApplicationServiceInterface>(TYPES.ApplicationServiceInterface);
  }
}