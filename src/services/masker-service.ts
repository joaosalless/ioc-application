import "reflect-metadata";
import MaskData from 'maskdata';
import { TYPES } from '../interfaces/container';
import { ConfigServiceInterface } from "./config-service";
import { LoggerServiceInterface } from './logger-service';
import { injectable, inject, interfaces } from "inversify";
import { AbstractService, AbstractServiceInterface } from "./abstract-service";

export namespace MaskOptions {
  export interface Mask { }

  export interface CARD extends Mask {
    maskWith: string,
    unmaskedStartDigits: number,
    unmaskedEndDigits: number,
  }
}

export interface MaskerServiceInterface extends AbstractServiceInterface {
  mask(data: string, mask: string, options: MaskOptions.Mask): string;
}

@injectable()
export class MaskerService extends AbstractService implements MaskerServiceInterface {
  private logger: LoggerServiceInterface;
  private config: ConfigServiceInterface;

  constructor(@inject(TYPES.Container) protected _container: interfaces.Container) {
    super(_container);
    this.logger = _container.get<LoggerServiceInterface>(TYPES.LoggerServiceInterface);
    this.config = _container.get<ConfigServiceInterface>(TYPES.ConfigServiceInterface);
  }

  public mask(data: string, mask: string, options: MaskOptions.Mask): string {
    throw new Error("Method not implemented.");
  }

  public maskCard(data: any, options?: MaskOptions.CARD) {
    return MaskData.maskCard(data, options);
  }
}