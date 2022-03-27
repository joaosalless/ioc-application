import "reflect-metadata";
import { TYPES } from '../interfaces/container';
import { LoggerServiceInterface } from './logger-service';
import { injectable, inject, interfaces } from "inversify";
import { AbstractService, AbstractServiceInterface } from "./abstract-service";

export interface ApplicationServiceInterface extends AbstractServiceInterface {
  appName(): string;
  appVersion(): string;
}

@injectable()
export class ApplicationService extends AbstractService implements ApplicationServiceInterface {
  private logger: LoggerServiceInterface;

  constructor(@inject(TYPES.Container) protected _container: interfaces.Container) {
    super(_container);
    this.logger = _container.get<LoggerServiceInterface>(TYPES.LoggerServiceInterface)
  }

  public appName(): string {
    return this._container.get<string>(TYPES.AppName);
  }
  
  public appVersion(): string {
    return this._container.get<string>(TYPES.AppVersion);
  }
}