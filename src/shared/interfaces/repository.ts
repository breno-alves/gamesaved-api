import { FilterQuery, QueryOptions } from 'mongoose';
import { SchemaId } from '../types/schema-id.type';

export interface RepositoryContract<T = any> {
  findOne(query: Pick<T, keyof T>): Promise<T>;

  find(
    query: FilterQuery<T>,
    options?: QueryOptions,
    projection?: Record<keyof T, boolean>,
  ): Promise<Array<T>>;

  findPaginated(
    query: FilterQuery<T>,
    options?: QueryOptions,
    projection?: Record<keyof T, boolean>,
  ): Promise<Array<T>>;

  first(query: FilterQuery<T>): Promise<T>;

  update(id: SchemaId, data: Partial<T>): Promise<T>;

  create<DTOType = Partial<T>>(data: DTOType): Promise<T>;

  delete(id: SchemaId): Promise<void>;
}
