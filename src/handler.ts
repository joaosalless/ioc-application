import { HttpServiceInterface } from './services/http-service';
import TYPES from 'interfaces/types';
import { Application } from './application';
import "reflect-metadata";
import { Container } from "inversify";

const app = new Application('poc-ioc', new Container());

(app: Application, event: APIGatewayEvent) {
  const userId = event.requestContext.authorizer?.uid;
  const processId = event.requestContext.processId || uuuid4();
  app.ioc().bind<number>('userId').toConstantValue(userId);
  app.ioc().bind<number>('processId').toConstantValue(processId);

  const body = event.body || {};

  const httpService = app.ioc().get<HttpServiceInterface>(TYPES.HttpServiceInterface)

  httpService.request();
}