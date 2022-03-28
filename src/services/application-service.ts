import "reflect-metadata";
import { TYPES } from '../interfaces/container';
import { LoggerServiceInterface } from './logger-service';
import { injectable, inject, interfaces } from "inversify";
import { AbstractService, AbstractServiceInterface } from "./abstract-service";

export interface ApplicationServiceInterface extends AbstractServiceInterface {
  name(): string;
  version(): string;
  env(): string;
  shortEnv(): string;
}

@injectable()
export class ApplicationService extends AbstractService implements ApplicationServiceInterface {
  private logger: LoggerServiceInterface;

  constructor(
    @inject(TYPES.Container) protected _container: interfaces.Container,
    @inject(TYPES.AppName) private _name: string,
    @inject(TYPES.AppVersion) private _version: string,
    @inject(TYPES.AppEnv) private _env: string,
    @inject(TYPES.AppShortEnv) private _shortEnv: string,
  ) {
    super(_container);
    this.logger = _container.get<LoggerServiceInterface>(TYPES.LoggerServiceInterface);
  }

  public name(): string {
    return this._name;
  }

  public version(): string {
    return this._version;
  }

  public env(): string {
    return this._env;
  }

  public shortEnv(): string {
    return this._shortEnv;
  }
}