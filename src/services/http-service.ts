import "reflect-metadata";
import TYPES from "interfaces/types";
import { JsonSchemaServiceInterface } from './json-schema-service';
import { ConfigServiceInterface } from './config-service';
import { LoggerServiceInterface } from './logger-service';
import { I18nServiceInterface } from './i18n-service';
import { inject, injectable } from "inversify";

export interface HttpServiceInterface {
  request(params: { method: string, url: string, body: any, headers: any }): any;
  response(params: { code: number, data: any, error: any }): any;
}

@injectable()
export class HttpService implements HttpServiceInterface {
  constructor(
    @inject(TYPES.LoggerServiceInterface) private logger: LoggerServiceInterface,
    @inject(TYPES.ConfigServiceInterface) private config: ConfigServiceInterface,
    @inject(TYPES.I18nServiceInterface) private i18n: I18nServiceInterface,
    @inject(TYPES.JsonSchemaServiceInterface) private jsonSchema: JsonSchemaServiceInterface,
  ) {}

  request(params: { method: string; url: string; body: any; headers: any; schemaId?: string; }) {
    try {
      this.jsonSchema.validate(schemaId, body);

      //
    } catch (error) {
      this.logger.error('HttpService.request error', { error })
    }
  }

  response(params: { code: number; data: any; error?: any; schema?: string; }) {
    try {
      this.jsonSchema.validate(schema, data);

      //
    } catch (error) {
      this.logger.error('HttpService.request error', { error })
    }
  }

  responseError(params: { code: number; data: any; error?: any; schema?: string; }) {
    try {
      this.jsonSchema.validate(schema, data);

      //
    } catch (error) {
      this.logger.error('HttpService.request error', { error })
    }

    const createResponse = (statusCode: number, body: any): Promise<any> => Promise.resolve({
      statusCode,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(body),
    });
  }
}