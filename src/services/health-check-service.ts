import "reflect-metadata";
import { TYPES } from '../interfaces/container';
import { ConfigServiceInterface } from "./config-service";
import { LoggerServiceInterface } from './logger-service';
import { injectable, inject, interfaces } from "inversify";
import { JsonSchemaServiceInterface } from './json-schema-service';
import { AbstractService, AbstractServiceInterface } from "./abstract-service";

export interface HealthCheckRequest { }
export interface HealthCheckResponse {
  success: boolean,
  message?: string,
  dependencies?: {
    databases: {
      type: string,
      name: string,
      success: boolean,
      latency: boolean,
      message: string,
    }[],
    apis: {
      type: string,
      name: string,
      success: boolean,
      latency: boolean,
      message: string,
    }[],
    schemas: {
      id: string,
      version: string,
      success: boolean,
      latency: boolean,
      message: string,
    }[],
  },
}

export interface HealthCheckServiceInterface extends AbstractServiceInterface {
  check(payload: HealthCheckRequest): Promise<HealthCheckResponse>;
}

@injectable()
export class HealthCheckService extends AbstractService implements HealthCheckServiceInterface {
  private logger: LoggerServiceInterface;
  private config: ConfigServiceInterface;
  private jsonSchema: JsonSchemaServiceInterface;

  constructor(@inject(TYPES.Container) protected _container: interfaces.Container) {
    super(_container);
    this.logger = _container.get<LoggerServiceInterface>(TYPES.LoggerServiceInterface)
    this.config = _container.get<ConfigServiceInterface>(TYPES.ConfigServiceInterface)
    this.jsonSchema = _container.get<JsonSchemaServiceInterface>(TYPES.JsonSchemaServiceInterface)
  }

  public async check(payload: HealthCheckRequest): Promise<HealthCheckResponse> {
    return Promise.resolve({
      success: true,
    });
  }
}