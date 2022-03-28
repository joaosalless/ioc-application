
const TYPES = {
  Container: Symbol.for("Container"),
  AppEnv: Symbol.for("AppEnv"),
  AppName: Symbol.for("AppName"),
  AppShortEnv: Symbol.for("AppShortEnv"),
  AppVersion: Symbol.for("AppVersion"),
  ApplicationServiceInterface: Symbol.for("ApplicationServiceInterface"),
  AuditServiceInterface: Symbol.for("AuditServiceInterface"),
  AuthorizerServiceInterface: Symbol.for("AuthorizerServiceInterface"),
  ConfigServiceInterface: Symbol.for("ConfigServiceInterface"),
  CryptoServiceInterface: Symbol.for("CryptoServiceInterface"),
  EntityServiceInterface: Symbol.for("EntityServiceInterface"),
  HealthCheckServiceInterface: Symbol.for("HealthCheckServiceInterface"),
  HttpServiceInterface: Symbol.for("HttpServiceInterface"),
  I18nServiceInterface: Symbol.for("I18nServiceInterface"),
  JsonSchemaServiceInterface: Symbol.for("JsonSchemaServiceInterface"),
  LoggerServiceInterface: Symbol.for("LoggerServiceInterface"),
  MaskerServiceInterface: Symbol.for("MaskerServiceInterface"),
  SearchServiceInterface: Symbol.for("SearchServiceInterface"),
  SerializerServiceInterface: Symbol.for("SerializerServiceInterface"),
  StorageServiceInterface: Symbol.for("StorageServiceInterface"),
};

const TAGS = {
  config: "config",
  service: "service",
  business: "business",
  dynamodbConnection: "dynamodbConnection",
  sequelizeConnection: "sequelizeConnection",
  sequelizeRepository: "sequelizeRepository",
};

export { TYPES, TAGS };