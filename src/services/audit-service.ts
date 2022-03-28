import "reflect-metadata";
import { TYPES } from '../interfaces/container';
import { MaskerServiceInterface } from './masker-service';
import { ConfigServiceInterface } from "./config-service";
import { LoggerServiceInterface } from './logger-service';
import { injectable, inject, interfaces } from "inversify";
import { AbstractService, AbstractServiceInterface } from "./abstract-service";

export interface ActivityPayload { }
export interface ActivityResponse { }

export interface AuditServiceInterface extends AbstractServiceInterface {
  activity(payload: ActivityPayload): Promise<ActivityResponse>;
}

@injectable()
export class AuditService extends AbstractService implements AuditServiceInterface {
  private logger: LoggerServiceInterface;
  private config: ConfigServiceInterface;
  private masker: MaskerServiceInterface;

  constructor(@inject(TYPES.Container) protected _container: interfaces.Container) {
    super(_container);
    this.logger = _container.get<LoggerServiceInterface>(TYPES.LoggerServiceInterface);
    this.config = _container.get<ConfigServiceInterface>(TYPES.ConfigServiceInterface);
    this.masker = _container.get<MaskerServiceInterface>(TYPES.MaskerServiceInterface);
  }

  public async activity(payload: ActivityPayload): Promise<ActivityResponse> {
    try {
      this.logger.debug('AuditService.activity: starting', { payload });

      return Promise.reject(new Error('Method not implemented.'));
    } catch (error) {
      this.logger.error('AuditService.activity: error', { error, payload });
      return Promise.reject(error);
    }
  }
}