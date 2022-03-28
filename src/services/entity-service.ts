import "reflect-metadata";
import { TYPES } from '../interfaces/container';
import { ConfigServiceInterface } from "./config-service";
import { LoggerServiceInterface } from './logger-service';
import { injectable, inject, interfaces } from "inversify";
import { JsonSchemaServiceInterface } from './json-schema-service';
import { AbstractService, AbstractServiceInterface } from "./abstract-service";

export interface EntityServiceInterface extends AbstractServiceInterface {
  //
}

@injectable()
export class EntityService extends AbstractService implements EntityServiceInterface {
  private logger: LoggerServiceInterface;
  private config: ConfigServiceInterface;
  private jsonSchema: JsonSchemaServiceInterface;

  constructor(@inject(TYPES.Container) protected _container: interfaces.Container) {
    super(_container);
    this.logger = _container.get<LoggerServiceInterface>(TYPES.LoggerServiceInterface)
    this.config = _container.get<ConfigServiceInterface>(TYPES.ConfigServiceInterface)
    this.jsonSchema = _container.get<JsonSchemaServiceInterface>(TYPES.JsonSchemaServiceInterface)
  }
}