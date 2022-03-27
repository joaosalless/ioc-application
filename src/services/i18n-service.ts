import "reflect-metadata";
import { TYPES } from '../interfaces/container';
import { AbstractService, AbstractServiceInterface } from "./abstract-service";
import { ConfigServiceInterface } from './config-service';
import { LoggerServiceInterface } from './logger-service';
import { inject, injectable, interfaces } from "inversify";

export interface I18nServiceInterface extends AbstractServiceInterface {
  tr(key: string, params?: object): string;
}

@injectable()
export class I18nService extends AbstractService implements I18nServiceInterface {
  private logger: LoggerServiceInterface;
  private config: ConfigServiceInterface;

  constructor(@inject(TYPES.Container) protected _container: interfaces.Container) {
    super(_container);
    this.logger = _container.get<LoggerServiceInterface>(TYPES.LoggerServiceInterface)
    this.config = _container.get<ConfigServiceInterface>(TYPES.ConfigServiceInterface)
  }

  public tr(key: string, params?: object): string {
    return key;
  }
}