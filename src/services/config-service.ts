import "reflect-metadata";
import { injectable } from "inversify";

export interface ConfigServiceInterface {
    get(key?: string): any;
    set(key: string, value: any): void;
}

@injectable()
export class ConfigService implements ConfigServiceInterface {
    constructor(private keys?: object) {}

    get(key?: string): any {
        return this.keys[key] || undefined;
    }

    set(key: string, value: any): void {
        this.keys[key] = value;
    }
}