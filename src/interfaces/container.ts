const TYPES = {
  AppName: Symbol.for("AppName"),
  AppVersion: Symbol.for("AppVersion"),
  Container: Symbol.for("Container"),
  ApplicationService: Symbol.for("ApplicationService"),
  ConfigServiceInterface: Symbol.for("ConfigServiceInterface"),
  HealthCheckServiceInterface: Symbol.for("HealthCheckServiceInterface"),
  HttpServiceInterface: Symbol.for("HttpServiceInterface"),
  I18nServiceInterface: Symbol.for("I18nServiceInterface"),
  JsonSchemaServiceInterface: Symbol.for("JsonSchemaServiceInterface"),
  LoggerServiceInterface: Symbol.for("LoggerServiceInterface"),
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