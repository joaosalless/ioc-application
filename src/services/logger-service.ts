import "reflect-metadata";
import { TYPES } from '../interfaces/container';
import { AbstractService, AbstractServiceInterface } from "./abstract-service";
import { Container, inject, injectable, interfaces } from "inversify";
import { ConfigServiceInterface } from "./config-service";

export interface LoggerServiceInterface extends AbstractServiceInterface {
  debug(message: string, data?: object);
  info(message: string, data?: object);
  warning(message: string, data?: object);
  error(message: string, data?: object);
}

@injectable()
export class LoggerService extends AbstractService implements LoggerServiceInterface {
  private logger: LoggerServiceInterface;
  private config: ConfigServiceInterface;

  constructor(@inject(TYPES.Container) protected _container: interfaces.Container) {
    super(_container);
    this.logger = _container.get<LoggerServiceInterface>(TYPES.LoggerServiceInterface);
    this.config = _container.get<ConfigServiceInterface>(TYPES.ConfigServiceInterface);
  }

  log(message: string, data: object, level: string) {
    console.log(`${level}:`, message, data);
  }

  debug(message: string, data?: object) {
    this.log(message, data || {}, 'debug');
  }

  info(message: string, data?: object) {
    this.log(message, data || {}, 'info');
  }

  warning(message: string, data?: object) {
    this.log(message, data || {}, 'warning');
  }

  error(message: string, data?: object) {
    this.log(message, data || {}, 'error');
  }
}