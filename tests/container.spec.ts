// Imports
import "reflect-metadata";
import { ApplicationService, ApplicationServiceInterface } from './../src/services/application-service';
import { AuditService, AuditServiceInterface } from './../src/services/audit-service';
import { AuthorizerService, AuthorizerServiceInterface } from './../src/services/authorizer-service';
import { ConfigService, ConfigServiceInterface } from '../src/services/config-service';
import { Container, interfaces, decorate, injectable } from "inversify";
import { CryptoService, CryptoServiceInterface } from './../src/services/crypto-service';
import { EntityService, EntityServiceInterface } from './../src/services/entity-service';
import { HealthCheckService, HealthCheckServiceInterface } from './../src/services/health-check-service';
import { HttpService, HttpServiceInterface } from '../src/services/http-service';
import { I18nService, I18nServiceInterface } from '../src/services/i18n-service';
import { JsonSchemaService, JsonSchemaServiceInterface } from '../src/services/json-schema-service';
import { LoggerService, LoggerServiceInterface } from '../src/services/logger-service';
import { MaskerService, MaskerServiceInterface } from './../src/services/masker-service';
import { SearchService, SearchServiceInterface } from './../src/services/search-service';
import { SerializerService, SerializerServiceInterface } from './../src/services/serializer-service';
import { StorageService, StorageServiceInterface } from './../src/services/storage-service';
import { TYPES } from '../src/interfaces/container';
import { AbstractServiceInterface } from "../src/services/abstract-service";

// Mocks
decorate(injectable(), LoggerService);
jest.mock('../src/services/logger-service');
const LoggerServiceMock = LoggerService as jest.MockedClass<typeof LoggerService>;

// Data
const config = {
  appName: 'application-container',
  appVersion: 'application-version',
  appEnv: 'development',
  appShortEnv: 'dev',
};

let container: interfaces.Container;
let application: ApplicationServiceInterface;

// Tests
describe('Inversify Application', () => {
  const SERVICES: string[] = [
    'ApplicationService',
    'AuditService',
    'AuthorizerService',
    'ConfigService',
    'CryptoService',
    'EntityService',
    'HealthCheckService',
    'HttpService',
    'I18nService',
    'JsonSchemaService',
    'LoggerService',
    'MaskerService',
    'SearchService',
    'SerializerService',
    'StorageService',
  ];

  const bootstrapContainer = (): void => {
    try {
      container = container ? container : new Container();
      container.bind<string>(TYPES.AppName).toConstantValue(config.appName);
      container.bind<string>(TYPES.AppVersion).toConstantValue(config.appVersion);
      container.bind<string>(TYPES.AppEnv).toConstantValue(config.appEnv);
      container.bind<string>(TYPES.AppShortEnv).toConstantValue(config.appShortEnv);
      container.bind<interfaces.Container>(TYPES.Container).toConstantValue(container);
      container.bind<ApplicationServiceInterface>(TYPES.ApplicationServiceInterface).to(ApplicationService);
      container.bind<AuditServiceInterface>(TYPES.AuditServiceInterface).to(AuditService);
      container.bind<AuthorizerServiceInterface>(TYPES.AuthorizerServiceInterface).to(AuthorizerService);
      container.bind<ConfigServiceInterface>(TYPES.ConfigServiceInterface).to(ConfigService);
      container.bind<CryptoServiceInterface>(TYPES.CryptoServiceInterface).to(CryptoService);
      container.bind<EntityServiceInterface>(TYPES.EntityServiceInterface).to(EntityService);
      container.bind<HealthCheckServiceInterface>(TYPES.HealthCheckServiceInterface).to(HealthCheckService);
      container.bind<HttpServiceInterface>(TYPES.HttpServiceInterface).to(HttpService);
      container.bind<I18nServiceInterface>(TYPES.I18nServiceInterface).to(I18nService);
      container.bind<JsonSchemaServiceInterface>(TYPES.JsonSchemaServiceInterface).to(JsonSchemaService);
      container.bind<LoggerServiceInterface>(TYPES.LoggerServiceInterface).to(LoggerServiceMock);
      container.bind<MaskerServiceInterface>(TYPES.MaskerServiceInterface).to(MaskerService);
      container.bind<SearchServiceInterface>(TYPES.SearchServiceInterface).to(SearchService);
      container.bind<SerializerServiceInterface>(TYPES.SerializerServiceInterface).to(SerializerService);
      container.bind<StorageServiceInterface>(TYPES.StorageServiceInterface).to(StorageService);
    } catch (error) {
      throw error;
    }
  }

  beforeEach(() => {
    bootstrapContainer();
    LoggerServiceMock.prototype.container.mockReturnValue(container);
  });

  afterEach(() => {
    container.unbindAll();
    jest.clearAllMocks();
  });

  it('get Application name from Container instance', async () => {
    expect(container.get<string>(TYPES.AppName)).toBe(config.appName);
  });

  it('get Container instance from LoggerService', async () => {
    // Setup
    const loggerService = container.get<LoggerServiceInterface>(TYPES.LoggerServiceInterface);
    const jsonSchemaService = container.get<JsonSchemaServiceInterface>(TYPES.JsonSchemaServiceInterface);
    const loggerContainer = loggerService.container();
    const jsonSchemaContainer = jsonSchemaService.container();

    // Assert
    expect(loggerService instanceof LoggerService).toBe(true)
    expect(container.get<string>(TYPES.AppName)).toBe(config.appName);
    expect(loggerContainer).toEqual(container);
  });

  describe.each(SERVICES)('Container instance from Services:', (service) => {
    it(`should get container instance from ${service}`, () => {
      const serviceInstance = container.get<AbstractServiceInterface>(TYPES[`${service}Interface`]);
      expect(serviceInstance.container()).toEqual(container);
    });
  });

  // describe.each(SERVICES)('Application instance from Services:', (service) => {
  //   it(`should application instance from ${service} is equal to container application`, () => {
  //     const serviceInstance = container.get<AbstractServiceInterface>(TYPES[`${service}Interface`]);
  //     const containerApp = container.get<ApplicationServiceInterface>(TYPES.ApplicationServiceInterface);
  //     expect(serviceInstance.app()).toBe(containerApp);
  //   });
  // });
});
