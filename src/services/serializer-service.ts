import "reflect-metadata";
import { TYPES } from '../interfaces/container';
import { ConfigServiceInterface } from "./config-service";
import { LoggerServiceInterface } from './logger-service';
import { injectable, inject, interfaces } from "inversify";
import { AbstractService, AbstractServiceInterface } from "./abstract-service";

export interface SerializerServiceInterface extends AbstractServiceInterface {
  serialize(data: any, contentType: string, schema?: string): Promise<any>;
  deserialize(data: any, contentType: string, schema?: string): Promise<any>;
}

@injectable()
export class SerializerService extends AbstractService implements SerializerServiceInterface {
  private logger: LoggerServiceInterface;
  private config: ConfigServiceInterface;

  constructor(@inject(TYPES.Container) protected _container: interfaces.Container) {
    super(_container);
    this.logger = _container.get<LoggerServiceInterface>(TYPES.LoggerServiceInterface);
    this.config = _container.get<ConfigServiceInterface>(TYPES.ConfigServiceInterface);
  }

  serialize(data: any, contentType: string, schema?: string): Promise<any> {
    try {
      this.logger.debug('SerializerService.serialize: serializing', { data, contentType, schema });

      return Promise.reject(new Error('Method not implemented.'));
    } catch (error) {
      this.logger.error('SerializerService.serialize: error', { error, data, contentType, schema });
      return Promise.reject(error);
    }
  }

  deserialize(data: any, contentType: string, schema?: string): Promise<any> {
    try {
      this.logger.debug('SerializerService.deserialize: deserializing', { data, contentType, schema });

      return Promise.reject(new Error('Method not implemented.'));
    } catch (error) {
      this.logger.error('SerializerService.deserialize: error', { error, data, contentType, schema });
      return Promise.reject(error);
    }
  }
}