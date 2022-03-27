import { TYPES } from './interfaces/container';
import { interfaces } from "inversify";
import { HttpServiceInterface } from './services/http-service';
import { LoggerServiceInterface } from './services/logger-service';
import { HealthCheckServiceInterface } from 'services/health-check-service';

export const runnerHealthCheck = async (container: interfaces.Container, event: any): Promise<any> => {
  const logger = container.get<LoggerServiceInterface>(TYPES.LoggerServiceInterface);
  const http = container.get<HttpServiceInterface>(TYPES.HttpServiceInterface);
  const healthCheck = container.get<HealthCheckServiceInterface>(TYPES.HealthCheckServiceInterface);

  logger.info('executor.runnerHealthCheck: start', { event });

  return new Promise((resolve) => {
    healthCheck.check({})
      .then((data) => resolve(http.response({ code: 200, data })))
      .catch((error) => resolve(http.responseError({ code: 400, error })));
  });
};