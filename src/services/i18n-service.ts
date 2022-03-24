import "reflect-metadata";
import { ConfigServiceInterface } from './config-service';
import { LoggerServiceInterface } from './logger-service';
import { inject, injectable } from "inversify";
import TYPES from "interfaces/types";

export interface I18nServiceInterface {
  tr(key: string, params?: object): string;
}

@injectable()
export class I18nService implements I18nServiceInterface {
  constructor(
    @inject(TYPES.LoggerServiceInterface) private logger: LoggerServiceInterface,
    @inject(TYPES.ConfigServiceInterface) private config: ConfigServiceInterface,
  ) {}

  public tr(key: string, params?: object): string {
    return key;
  }
}