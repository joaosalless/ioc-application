import "reflect-metadata";
import { TYPES } from '../interfaces/container';
import { ConfigServiceInterface } from "./config-service";
import { LoggerServiceInterface } from './logger-service';
import { injectable, inject, interfaces } from "inversify";
import { AbstractService, AbstractServiceInterface } from "./abstract-service";

export interface CryptoEncryptOptions { }

export interface CryptoDecryptOptions { }

export interface CryptoServiceInterface extends AbstractServiceInterface {
  encrypt(text: string, options?: CryptoEncryptOptions): Promise<string>;
  decrypt(text: string, options?: CryptoDecryptOptions): Promise<string>;
}

@injectable()
export class CryptoService extends AbstractService implements CryptoServiceInterface {
  private config: ConfigServiceInterface;
  private logger: LoggerServiceInterface;

  constructor(@inject(TYPES.Container) protected _container: interfaces.Container) {
    super(_container);
    this.config = _container.get<ConfigServiceInterface>(TYPES.ConfigServiceInterface);
    this.logger = _container.get<LoggerServiceInterface>(TYPES.LoggerServiceInterface);
  }

  public async encrypt(text: string, options?: CryptoEncryptOptions): Promise<string> {
    try {
      this.logger.debug('CryptoService.encrypt: starting', { text, options });

      return Promise.reject(new Error('Method not implemented.'));
    } catch (error) {
      this.logger.error('CryptoService.encrypt: error', { error, text, options });
      return Promise.reject(error);
    }
  }

  public async decrypt(text: string, options?: CryptoDecryptOptions): Promise<string> {
    try {
      this.logger.debug('CryptoService.decrypt: starting', { text, options });

      return Promise.reject(new Error('Method not implemented.'));
    } catch (error) {
      this.logger.error('CryptoService.decrypt: error', { error, text, options });
      return Promise.reject(error);
    }
  }
}