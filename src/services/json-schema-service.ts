import "reflect-metadata";
import { ConfigServiceInterface } from './config-service';
import { LoggerServiceInterface } from './logger-service';
import { inject, injectable } from "inversify";
import TYPES from "interfaces/types";

export interface JsonSchemaServiceInterface {
  load(schemas: { id: string, schema: object }[]): void;
  validate(schema: string, data: any): any;
}

@injectable()
export class JsonSchemaService implements JsonSchemaServiceInterface {
  private keys: object;

  constructor(
    @inject(TYPES.LoggerServiceInterface) private logger: LoggerServiceInterface,
    @inject(TYPES.ConfigServiceInterface) private config: ConfigServiceInterface,
  ) {}

  public load(schemas: { id: string, schema: object }[]): void {
    schemas.forEach((schema) => {
      this.logger.debug('loading schema', { schema });
      this.set(schema.id, schema.schema)
    });
  }

  public validate(schema: string, data: any): any {
    
  }

  public get(key?: string): any {
      return this.keys[key] || undefined;
  }

  public set(key: string, value: any): void {
      this.keys[key] = value;
  }
}