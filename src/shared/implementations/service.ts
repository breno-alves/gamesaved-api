import { RepositoryContract } from '../interfaces/repository';
import { ServiceContract } from '../interfaces/service';
import { HttpException, HttpStatus } from '@nestjs/common';
import { PaginatorDto } from '../pipes/paginator/dtos/paginator.dto';

export abstract class GenericService<T = any> implements ServiceContract<T> {
  constructor(protected readonly repo: RepositoryContract<T>) {}

  async create(data: Partial<T>): Promise<T> {
    return this.repo.create(data);
  }

  async findOne(where: Partial<T>): Promise<T> {
    return this.repo.findOne(where);
  }

  async find(
    where: Partial<T>,
    options = <PaginatorDto>{ limit: 25, page: 0 },
  ): Promise<Array<T>> {
    const queryOptions = {
      limit: options.limit,
      skip: options.limit * options.page,
    };
    return this.repo.findPaginated(where, queryOptions);
  }

  async update(where: Partial<T>, data: Partial<T>): Promise<T> {
    const exists = await this.repo.update(where, data);

    if (!exists) {
      throw new HttpException(
        { message: 'entity not found' },
        HttpStatus.NOT_FOUND,
      );
    }

    return exists;
  }

  async delete(where: Partial<T>): Promise<void> {
    const exists = await this.repo.delete(where);

    if (!exists) {
      throw new HttpException(
        { message: 'entity not found' },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
