import "reflect-metadata";
import { TYPES } from '../interfaces/container';
import { ConfigServiceInterface } from "./config-service";
import { LoggerServiceInterface } from './logger-service';
import { injectable, inject, interfaces } from "inversify";
import { EntityServiceInterface } from "./entity-service";
import { AbstractService, AbstractServiceInterface } from "./abstract-service";
import { AuthorizerServiceInterface } from "./authorizer-service";

export interface SearchTerm {
  key: string,
  value: string,
  providers?: string,
}

export interface SearchPayload {
  terms?: SearchTerm[],
  entity?: string,
}

export interface SearchResponse { }

export interface SearchServiceInterface extends AbstractServiceInterface {
  search(payload: SearchPayload): Promise<SearchResponse>;
}

@injectable()
export class SearchService extends AbstractService implements SearchServiceInterface {
  private logger: LoggerServiceInterface;
  private config: ConfigServiceInterface;
  private entity: EntityServiceInterface;
  private authorizer: AuthorizerServiceInterface;

  constructor(@inject(TYPES.Container) protected _container: interfaces.Container) {
    super(_container);
    this.logger = _container.get<LoggerServiceInterface>(TYPES.LoggerServiceInterface);
    this.config = _container.get<ConfigServiceInterface>(TYPES.ConfigServiceInterface);
    this.entity = _container.get<EntityServiceInterface>(TYPES.EntityServiceInterface);
    this.authorizer = _container.get<AuthorizerServiceInterface>(TYPES.AuthorizerServiceInterface);
  }

  public async search(payload: SearchPayload): Promise<SearchResponse> {
    try {
      this.logger.debug('SearchService.search: start', { payload });
      this.authorizer.check({ scopes: [`${payload.entity}:read`] });

      this.logger.debug('SearchService.search: end', { payload });
      return Promise.reject(new Error('Method not implemented.'));
    } catch (error) {
      this.logger.error('SearchService.search: error', { error, payload });
      return Promise.reject(error);
    }
  }
}