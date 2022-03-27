import { ConfigServiceInterface } from './config-service';
import "reflect-metadata";
import { TYPES } from '../interfaces/container';
import { AbstractService, AbstractServiceInterface } from "./abstract-service";
import { inject, injectable, interfaces } from "inversify";
import { LoggerServiceInterface } from './logger-service';

export interface JsonSchemaServiceInterface extends AbstractServiceInterface {
  load(schemas: { id: string, schema: object }[]): void;
  validate(schema: string, data: any): any;
}

@injectable()
export class JsonSchemaService extends AbstractService implements JsonSchemaServiceInterface {
  private keys: object;
  private logger: LoggerServiceInterface;
  private config: ConfigServiceInterface;

  constructor(@inject(TYPES.Container) protected _container: interfaces.Container) {
    super(_container);
    this.logger = _container.get<LoggerServiceInterface>(TYPES.LoggerServiceInterface)
    this.config = _container.get<ConfigServiceInterface>(TYPES.ConfigServiceInterface)
  }

  public async load(schemas: { id: string, schema: object }[]): Promise<void> {
    try {
      schemas.forEach((schema) => {
        this.logger.debug('loading schema', { schema });
        this.set(schema.id, schema.schema)
      });
      return Promise.resolve();
    } catch (error) {
      this.logger.error('JsonSchemaService.load error', { schemas, error });
      return Promise.reject(error);
    }
  }

  public async validate(schema: string, data: any): Promise<any> {
    try {
      const schemaData = this.get(schema);
      this.logger.info('JsonSchemaService.validate', { schema, schemaData, data });
      return Promise.reject(new Error('Not implemented.'));
    } catch (error) {
      this.logger.error('JsonSchemaService.load error', { schema, error });
      return Promise.reject(error);
    }
  }

  public async get(key?: string, format?: string): Promise<any> {
    return this.keys[key] || undefined;
  }

  public set(key: string, value: any): void {
    this.keys[key] = value;
  }
}