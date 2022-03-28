import "reflect-metadata";
import { TYPES } from '../interfaces/container';
import { ConfigServiceInterface } from "./config-service";
import { LoggerServiceInterface } from './logger-service';
import { injectable, inject, interfaces } from "inversify";
import { AbstractService, AbstractServiceInterface } from "./abstract-service";

export interface PutObjectPayload { }

export interface PutObjectResponse { }

export interface GetObjectPayload { }

export interface GetObjectResponse { }

export interface StorageDriverInterface {
  putObject(payload: PutObjectPayload): Promise<PutObjectResponse>;
  getObject(payload: GetObjectPayload): Promise<GetObjectResponse>;
}

export interface StorageServiceInterface extends AbstractServiceInterface {
  putObject(payload: PutObjectPayload): Promise<PutObjectResponse>;
  getObject(payload: GetObjectPayload): Promise<GetObjectResponse>;
}

export const DRIVERS = {
  S3: 'S3',
  LOCAL: 'LOCAL',
};

@injectable()
export class StorageService extends AbstractService implements StorageServiceInterface {
  private logger: LoggerServiceInterface;
  private config: ConfigServiceInterface;

  constructor(@inject(TYPES.Container) protected _container: interfaces.Container) {
    super(_container);
    this.logger = _container.get<LoggerServiceInterface>(TYPES.LoggerServiceInterface);
    this.config = _container.get<ConfigServiceInterface>(TYPES.ConfigServiceInterface);
  }

  public async putObject(payload: PutObjectPayload): Promise<PutObjectResponse> {
    throw new Error("Method not implemented.");
  }

  public async getObject(payload: GetObjectPayload): Promise<GetObjectResponse> {
    throw new Error("Method not implemented.");
  }
}