import "reflect-metadata";
import { TYPES } from '../interfaces/container';
import { LoggerServiceInterface } from './logger-service';
import { injectable, inject, interfaces } from "inversify";
import { AbstractService, AbstractServiceInterface } from "./abstract-service";

export interface ConfigServiceInterface extends AbstractServiceInterface {
    get(key?: string): any;
    set(key: string, value: any): void;
}

@injectable()
export class ConfigService extends AbstractService implements ConfigServiceInterface {
    private keys: {};
    private logger: LoggerServiceInterface;

    constructor(@inject(TYPES.Container) protected _container: interfaces.Container) {
        super(_container);
        this.logger = _container.get<LoggerServiceInterface>(TYPES.LoggerServiceInterface)
    }

    get(key?: string): any {
        return this.keys[key] || undefined;
    }

    set(key: string, value: any): void {
        this.keys[key] = value;
    }
}