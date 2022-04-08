import { SemaphoreService, SemaphoreServiceInterface } from './../src/services/semaphore-service';
import { ClockService, ClockServiceInterface } from './../src/services/clock-service';
// Imports
import "reflect-metadata";
import { TYPES } from '../src/interfaces/container';

import { AbstractServiceInterface } from "../src/services/abstract-service";
import { ApplicationService, ApplicationServiceInterface } from './../src/services/application-service';
import { AuditService, AuditServiceInterface } from './../src/services/audit-service';
import { AuthorizerService, AuthorizerServiceInterface } from './../src/services/authorizer-service';
import { ConfigService, ConfigServiceInterface } from '../src/services/config-service';
import { ConsentService, ConsentServiceInterface } from './../src/services/consent-service';
import { Container, interfaces, decorate, injectable } from "inversify";
import { CryptoService, CryptoServiceInterface } from './../src/services/crypto-service';
import { DatabaseService, DatabaseServiceInterface } from './../src/services/database-service';
import { DocumentationService, DocumentationServiceInterface } from './../src/services/documentation-service';
import { EntityService, EntityServiceInterface } from './../src/services/entity-service';
import { HealthCheckService, HealthCheckServiceInterface } from './../src/services/health-check-service';
import { HttpService, HttpServiceInterface } from '../src/services/http-service';
import { I18nService, I18nServiceInterface } from '../src/services/i18n-service';
import { JsonSchemaService, JsonSchemaServiceInterface } from '../src/services/json-schema-service';
import { LoggerService, LoggerServiceInterface } from '../src/services/logger-service';
import { MaskerService, MaskerServiceInterface } from './../src/services/masker-service';
import { SearchService, SearchServiceInterface } from './../src/services/search-service';
import { SerializerService, SerializerServiceInterface } from './../src/services/serializer-service';
import { StateService, StateServiceInterface } from './../src/services/state-service';
import { StorageService, StorageServiceInterface } from './../src/services/storage-service';

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
let applicationInstanceId: string;

// Tests
describe('IOC Application', () => {
  const SERVICES: string[] = [
    'ApplicationService',
    'AuditService',
    'AuthorizerService',
    'ClockService',
    'ConfigService',
    'ConsentService',
    'CryptoService',
    'DatabaseService',
    'DocumentationService',
    'EntityService',
    'HealthCheckService',
    'HttpService',
    'I18nService',
    'JsonSchemaService',
    'LoggerService',
    'MaskerService',
    'SearchService',
    'SemaphoreService',
    'SerializerService',
    'StateService',
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
      container.bind<ApplicationServiceInterface>(TYPES.ApplicationServiceInterface).to(ApplicationService).inSingletonScope();
      container.bind<AuditServiceInterface>(TYPES.AuditServiceInterface).to(AuditService);
      container.bind<AuthorizerServiceInterface>(TYPES.AuthorizerServiceInterface).to(AuthorizerService);
      container.bind<ClockServiceInterface>(TYPES.ClockServiceInterface).to(ClockService).inSingletonScope();
      container.bind<ConfigServiceInterface>(TYPES.ConfigServiceInterface).to(ConfigService).inSingletonScope();
      container.bind<ConsentServiceInterface>(TYPES.ConsentServiceInterface).to(ConsentService).inTransientScope();
      container.bind<CryptoServiceInterface>(TYPES.CryptoServiceInterface).to(CryptoService).inTransientScope();
      container.bind<DatabaseServiceInterface>(TYPES.DatabaseServiceInterface).to(DatabaseService).inSingletonScope();
      container.bind<DocumentationServiceInterface>(TYPES.DocumentationServiceInterface).to(DocumentationService);
      container.bind<EntityServiceInterface>(TYPES.EntityServiceInterface).to(EntityService);
      container.bind<HealthCheckServiceInterface>(TYPES.HealthCheckServiceInterface).to(HealthCheckService);
      container.bind<HttpServiceInterface>(TYPES.HttpServiceInterface).to(HttpService);
      container.bind<I18nServiceInterface>(TYPES.I18nServiceInterface).to(I18nService);
      container.bind<JsonSchemaServiceInterface>(TYPES.JsonSchemaServiceInterface).to(JsonSchemaService);
      container.bind<LoggerServiceInterface>(TYPES.LoggerServiceInterface).to(LoggerServiceMock);
      container.bind<MaskerServiceInterface>(TYPES.MaskerServiceInterface).to(MaskerService);
      container.bind<SearchServiceInterface>(TYPES.SearchServiceInterface).to(SearchService);
      container.bind<SemaphoreServiceInterface>(TYPES.SemaphoreServiceInterface).to(SemaphoreService);
      container.bind<SerializerServiceInterface>(TYPES.SerializerServiceInterface).to(SerializerService);
      container.bind<StateServiceInterface>(TYPES.StateServiceInterface).to(StateService);
      container.bind<StorageServiceInterface>(TYPES.StorageServiceInterface).to(StorageService);

      application = container.get<ApplicationServiceInterface>(TYPES.ApplicationServiceInterface);
      applicationInstanceId = application.instanceId();

    } catch (error) {
      throw error;
    }
  }

  beforeEach(() => {
    bootstrapContainer();
    LoggerServiceMock.prototype.container.mockReturnValue(container);
    LoggerServiceMock.prototype.app.mockReturnValue(application);
  });

  afterEach(() => {
    container.unbindAll();
    jest.clearAllMocks();
  });

  it('get Application name from Container instance', async () => {
    expect(container.get<string>(TYPES.AppName)).toBe(config.appName);
  });

  it('get Application from Container instance', async () => {
    const iocApplication = container.get<ApplicationServiceInterface>(TYPES.ApplicationServiceInterface);

    expect(iocApplication.instanceId()).toBe(applicationInstanceId);
  });

  it('get Container instance from LoggerService', async () => {
    // Setup
    const loggerService = container.get<LoggerServiceInterface>(TYPES.LoggerServiceInterface);
    const loggerContainer = loggerService.container();

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

  describe.each(SERVICES)('Application instance from Services:', (service) => {
    it(`should application instance from ${service} is equal to container application`, () => {
      const serviceInstance = container.get<AbstractServiceInterface>(TYPES[`${service}Interface`]);
      expect(serviceInstance.app()).toBe(application);
    });
  });
});
