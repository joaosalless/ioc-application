// Imports
import { HttpService, HttpServiceInterface } from '../src/services/http-service';
import { I18nService, I18nServiceInterface } from '../src/services/i18n-service';
import { LoggerService, LoggerServiceInterface } from '../src/services/logger-service';
import { ConfigService, ConfigServiceInterface } from '../src/services/config-service';
import { JsonSchemaService, JsonSchemaServiceInterface } from '../src/services/json-schema-service';
import { Container, interfaces } from "inversify";
import { TYPES } from '../src/interfaces/container';

// Mocks
// jest.mock('../src/services/logger-service');
// const LoggerServiceMock = Container as jest.MockedClass<typeof Container>;

// Data
const appName = 'application-container';
const appVersion = 'application-version';
let container: interfaces.Container;

// Tests
describe('Inversify Application', () => {
  const bootstrapContainer = (): void => {
    try {
      container = container ? container : new Container();
      container.bind<string>(TYPES.AppName).toConstantValue(appName);
      container.bind<string>(TYPES.AppVersion).toConstantValue(appVersion);
      container.bind<interfaces.Container>(TYPES.Container).toConstantValue(container);
      container.bind<LoggerServiceInterface>(TYPES.LoggerServiceInterface).to(LoggerService);
      container.bind<JsonSchemaServiceInterface>(TYPES.JsonSchemaServiceInterface).to(JsonSchemaService);
      container.bind<ConfigServiceInterface>(TYPES.ConfigServiceInterface).to(ConfigService);
      container.bind<I18nServiceInterface>(TYPES.I18nServiceInterface).to(I18nService);
      container.bind<HttpServiceInterface>(TYPES.HttpServiceInterface).to(HttpService);
    } catch (error) {
      throw error;
    }
  }

  beforeEach(() => {
    jest.clearAllMocks();
    bootstrapContainer();
  });

  afterEach(() => {
    jest.clearAllMocks();
    container.unbindAll();
  });

  it('get Application name from Container instance', async () => {
    expect(container.get<string>(TYPES.AppName)).toBe(appName);
  });

  it('get Container instance from LoggerService', async () => {
    // Setup
    const loggerService = container.get<LoggerServiceInterface>(TYPES.LoggerServiceInterface);
    const jsonSchemaService = container.get<JsonSchemaServiceInterface>(TYPES.JsonSchemaServiceInterface);
    const loggerContainer = loggerService.container();
    const jsonSchemaContainer = jsonSchemaService.container();
    
    // Call
    // loggerService.info('test', { data: { key: 'value' } });

    // Assert
    expect(loggerService instanceof LoggerService).toBe(true)
    expect(container.get<string>(TYPES.AppName)).toBe(appName);
    expect(loggerContainer).toEqual(container);
    expect(jsonSchemaContainer).toEqual(container);
  });

  it('get Container instance from JsonSchemaService', async () => {
    // Setup
    const jsonSchemaService = container.get<JsonSchemaServiceInterface>(TYPES.JsonSchemaServiceInterface);
    // Call
    const jsonSchemaContainer = jsonSchemaService.container();
    // Assert
    expect(jsonSchemaContainer).toEqual(container);
  });

  it('get Container instance from ConfigService', async () => {
    // Setup
    const config = container.get<ConfigServiceInterface>(TYPES.ConfigServiceInterface);
    // Call
    const configContainer = config.container();
    // Assert
    expect(configContainer).toEqual(container);
  });

  it('get Container instance from I18nService', async () => {
    // Setup
    const i18n = container.get<I18nServiceInterface>(TYPES.I18nServiceInterface);
    // Call
    const i18nContainer = i18n.container();
    // Assert
    expect(i18nContainer).toEqual(container);
  });

  it('get Container instance from HttpService', async () => {
    // Setup
    const httpService = container.get<HttpServiceInterface>(TYPES.HttpServiceInterface);
    // Call
    const httpServiceContainer = httpService.container();
    // Assert
    expect(httpServiceContainer).toEqual(container);
  });
});
