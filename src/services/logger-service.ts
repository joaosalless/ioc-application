import "reflect-metadata";
import TYPES from "interfaces/types";
import { ConfigServiceInterface } from './config-service';
import { inject, injectable } from "inversify";

export interface LoggerServiceInterface {
  debug(message: string, data: object);
  info(message: string, data: object);
  warning(message: string, data: object);
  error(message: string, data: object);
}

@injectable()
export class LoggerService implements LoggerServiceInterface {
  constructor(
    @inject(TYPES.ConfigServiceInterface) private config: ConfigServiceInterface,
  ) {}

  log(message: string, data: object, level: string) {
    console.log(message, data, level);
  }

  debug(message: string, data: object) {
    this.log(message, data, 'debug');
  }
  
  info(message: string, data: object) {
    this.log(message, data, 'info');
  }
  
  warning(message: string, data: object) {
    this.log(message, data, 'warning');
  }
  
  error(message: string, data: object) {
    this.log(message, data, 'error');
  }
}