import { HttpService, HttpServiceInterface } from './services/http-service';
import { I18nService, I18nServiceInterface } from './services/i18n-service';
import { LoggerService, LoggerServiceInterface } from './services/logger-service';
import { ConfigService, ConfigServiceInterface } from './services/config-service';
import { JsonSchemaService, JsonSchemaServiceInterface } from './services/json-schema-service';
import { Container } from "inversify";
import TYPES from 'interfaces/types';

export class Application {
  constructor(private name: string, private _ioc: Container) {
    this.register();
  }

  public ioc(): Container {
    return this._ioc;
  }

  private register(): void {
    this._ioc.bind<string>(TYPES.AppName).toConstantValue(this.name);
    this._ioc.bind<ConfigServiceInterface>(TYPES.ConfigServiceInterface).to(ConfigService);
    this._ioc.bind<LoggerServiceInterface>(TYPES.LoggerServiceInterface).to(LoggerService);
    this._ioc.bind<I18nServiceInterface>(TYPES.I18nServiceInterface).to(I18nService);
    this._ioc.bind<HttpServiceInterface>(TYPES.HttpServiceInterface).to(HttpService);
    this._ioc.bind<JsonSchemaServiceInterface>(TYPES.JsonSchemaServiceInterface).to(JsonSchemaService);
  }
}

export default new Application('poc-ioc', new Container());