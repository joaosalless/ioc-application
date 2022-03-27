import "reflect-metadata";
import { TYPES } from '../interfaces/container';
import { ConfigServiceInterface } from './config-service';
import { I18nServiceInterface } from './i18n-service';
import { inject, injectable, interfaces } from "inversify";
import { JsonSchemaServiceInterface } from './json-schema-service';
import { LoggerServiceInterface } from './logger-service';
import { AbstractService, AbstractServiceInterface } from "./abstract-service";

export interface HttpRequestPayloadInterface {
  method: string; 
  url: string; 
  body: any; 
  headers: any; 
  schema?: string;
}

export interface HttpResponsePayloadInterface {
  code: number;
  data?: any;
  error?: any;
  schema?: any;
}

export interface HttpResponseErrorPayloadInterface {
  code: number;
  error?: any;
  schema?: any;
}

export interface HttpResponseInterface {
  code: number;
  data?: any;
  message?: any;
}

export interface HttpServiceInterface extends AbstractServiceInterface {
  request(params: HttpRequestPayloadInterface): Promise<HttpResponseInterface>;
  response(params: HttpResponsePayloadInterface): Promise<HttpResponseInterface>;
  responseError(params: HttpResponseErrorPayloadInterface): Promise<HttpResponseInterface>;
}

@injectable()
export class HttpService extends AbstractService implements HttpServiceInterface {
  private logger: LoggerServiceInterface;
  private config: ConfigServiceInterface;
  private i18n: I18nServiceInterface;
  private jsonSchema: JsonSchemaServiceInterface;

  constructor(@inject(TYPES.Container) protected _container: interfaces.Container) {
    super(_container);
    this.logger = _container.get<LoggerServiceInterface>(TYPES.LoggerServiceInterface);
    this.config = _container.get<ConfigServiceInterface>(TYPES.ConfigServiceInterface);
    this.i18n = _container.get<I18nServiceInterface>(TYPES.I18nServiceInterface);
    this.jsonSchema = _container.get<JsonSchemaServiceInterface>(TYPES.JsonSchemaServiceInterface);
  }

  public async request(params: HttpRequestPayloadInterface): Promise<HttpResponseInterface> {
    const { method, url, body, headers, schema } = params;

    try {
      return Promise.resolve({
        code: 500,
        message: 'Not implemented.',
      });
    } catch (error) {
      this.responseError({ code: 500, error });
    }
  }

  public async response(params: HttpResponsePayloadInterface): Promise<HttpResponseInterface> {
    const { code, data, error, schema } = params;

    try {
      const response: any = {
        code,
        data,
      };
      this.jsonSchema.validate(schema, data);

      return Promise.resolve(response);
    } catch (error) {
      this.responseError({ code: 500, error });
    }
  }

  public async responseError(params: HttpResponseErrorPayloadInterface): Promise<HttpResponseInterface> {
    const { code, error, schema } = params;

    const response: any = {
      code,
      message: error?.message,
    };

    try {
      this.jsonSchema.validate(schema, response);
      return Promise.resolve(response);
    } catch (error) {
      this.logger.error('HttpService.request error', { error })
    }
  }
}