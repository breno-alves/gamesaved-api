import { FilterQuery, QueryOptions } from 'mongoose';

export type Projection<T> = Partial<Record<string, boolean | number>>;

export interface RepositoryContract<T = any> {
  create(data: Partial<T>): Promise<T>;

  findOne(where: Partial<Pick<T, keyof T>>, options?: QueryOptions): Promise<T>;

  findOne(
    where: Partial<Pick<T, keyof T>>,
    options?: QueryOptions,
    projection?: Projection<T>,
  ): Promise<Record<keyof Projection<T>, any>>;

  find(
    where: FilterQuery<T>,
    options?: QueryOptions,
    projection?: Projection<T>,
  ): Promise<Array<T>>;

  findPaginated(
    where: FilterQuery<T>,
    options?: QueryOptions,
    projection?: Projection<T>,
  ): Promise<Array<T>>;

  first(where: FilterQuery<T>): Promise<T>;

  update(where: Partial<T>, data: Partial<T>): Promise<T>;

  delete(where: Partial<T>): Promise<T>;
}
