import { PaginatorDto } from '../pipes/paginator/dtos/paginator.dto';

export type Projection<T> = Partial<Record<keyof T, boolean>>;

export interface ServiceContract<T = any> {
  create(data: Partial<T>): Promise<T>;

  findOne(where: Partial<T>): Promise<T>;

  find(where: Partial<T>, options?: PaginatorDto): Promise<Array<T>>;

  update(where: Partial<T>, data: Partial<T>): Promise<T>;

  delete(where: Partial<T>): Promise<void>;
}
