import "reflect-metadata";
import { TYPES } from './interfaces/container';
import { Container, interfaces } from "inversify";
import { HealthCheckService, HealthCheckServiceInterface } from 'services/health-check-service';
import { HttpService, HttpServiceInterface } from './services/http-service';
import { I18nService, I18nServiceInterface } from './services/i18n-service';
import { LoggerService, LoggerServiceInterface } from './services/logger-service';
import { ConfigService, ConfigServiceInterface } from './services/config-service';
import { JsonSchemaService, JsonSchemaServiceInterface } from './services/json-schema-service';
import { runnerHealthCheck } from "executor";
import { APIGateway } from "@aws-sdk/client-api-gateway";

const appName = 'application-container';
let container: interfaces.Container;

const bootContainer = async (): Promise<interfaces.Container> => {
  try {
    container = container ? container : new Container();
    container.bind<string>(TYPES.AppName).toConstantValue(appName);
    container.bind<interfaces.Container>(TYPES.Container).toConstantValue(container);
    container.bind<LoggerServiceInterface>(TYPES.LoggerServiceInterface).to(LoggerService);
    container.bind<JsonSchemaServiceInterface>(TYPES.JsonSchemaServiceInterface).to(JsonSchemaService);
    container.bind<ConfigServiceInterface>(TYPES.ConfigServiceInterface).to(ConfigService);
    container.bind<I18nServiceInterface>(TYPES.I18nServiceInterface).to(I18nService);
    container.bind<HttpServiceInterface>(TYPES.HttpServiceInterface).to(HttpService);
    container.bind<HealthCheckServiceInterface>(TYPES.HealthCheckServiceInterface).to(HealthCheckService);

    return Promise.resolve(container);
  } catch (error) {
    throw error;
  }
}

export const handleHealthCheck = async (event: APIGateway) => runnerHealthCheck(await bootContainer(), event);