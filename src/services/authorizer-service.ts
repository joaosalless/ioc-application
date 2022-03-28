import "reflect-metadata";
import { TYPES } from '../interfaces/container';
import { ConfigServiceInterface } from './config-service';
import { I18nServiceInterface } from './i18n-service';
import { LoggerServiceInterface } from './logger-service';
import { inject, injectable, interfaces } from "inversify";
import { AbstractService, AbstractServiceInterface } from "./abstract-service";

export interface AuthorizationCheckPayload {

}

export interface AuthorizationCheckResponse {
  success: boolean,
  message: string,
}

export interface AuthorizerServiceInterface extends AbstractServiceInterface {
  check(payload: AuthorizationCheckPayload): Promise<AuthorizationCheckResponse>;
}

@injectable()
export class AuthorizerService extends AbstractService implements AuthorizerServiceInterface {
  private logger: LoggerServiceInterface;
  private config: ConfigServiceInterface;
  private i18n: I18nServiceInterface;

  constructor(@inject(TYPES.Container) protected _container: interfaces.Container) {
    super(_container);
    this.logger = _container.get<LoggerServiceInterface>(TYPES.LoggerServiceInterface);
    this.config = _container.get<ConfigServiceInterface>(TYPES.ConfigServiceInterface);
    this.i18n = _container.get<I18nServiceInterface>(TYPES.I18nServiceInterface);
  }

  public async check(payload: AuthorizationCheckPayload): Promise<AuthorizationCheckResponse> {
    try {
      this.logger.debug('AuthorizerService.check: starting', { payload });

      return Promise.reject(new Error('Method not implemented.'));
    } catch (error) {
      this.logger.error('AuthorizerService.check: error', { error, payload });
      return Promise.reject(error);
    }
  }
}