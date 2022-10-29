import { Projection, RepositoryContract } from '../interfaces/repository';
import { FilterQuery, Model, QueryOptions, UpdateQuery } from 'mongoose';

export abstract class GenericRepository<ModelDocument>
  implements RepositoryContract<ModelDocument>
{
  protected model: Model<ModelDocument>;

  protected constructor(model: Model<ModelDocument>) {
    this.model = model;
  }

  async delete(
    query: FilterQuery<Pick<ModelDocument, keyof ModelDocument>>,
  ): Promise<ModelDocument> {
    return this.model.findOneAndDelete(query).exec();
  }

  async find(
    query: FilterQuery<ModelDocument>,
    options: QueryOptions = {
      skip: 0,
      limit: 25,
      lean: true,
    },
    projection?: Projection<ModelDocument>,
  ): Promise<Array<ModelDocument>> {
    return this.model.find(query, projection, options).exec();
  }

  async findPaginated(
    query?: FilterQuery<ModelDocument>,
    options: QueryOptions = {
      skip: 0,
      limit: 25,
      lean: true,
    },
    projection?: Projection<ModelDocument>,
  ): Promise<ModelDocument[]> {
    const data = await this.model.find(query, projection, options).exec();
    return data;
  }

  async findOne(
    query: FilterQuery<Pick<ModelDocument, keyof ModelDocument>>,
  ): Promise<ModelDocument> {
    return this.model.findOne(query).exec();
  }

  async create(data: Partial<ModelDocument>): Promise<ModelDocument> {
    return this.model.create(data);
  }

  async first(query: FilterQuery<ModelDocument>): Promise<ModelDocument> {
    return this.model.findOne(query).exec();
  }

  async update(
    query: FilterQuery<Pick<ModelDocument, keyof ModelDocument>>,
    data: UpdateQuery<ModelDocument>,
  ): Promise<ModelDocument> {
    return this.model.findOneAndUpdate(query, data, { new: true }).exec();
  }
}
