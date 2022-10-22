import { RepositoryContract } from '../interfaces/repository';
import { FilterQuery, Model, QueryOptions, Types } from 'mongoose';
import { SchemaId } from '../types/schema-id.type';

export abstract class GenericRepository<ModelDocument>
  implements RepositoryContract<ModelDocument>
{
  protected model: Model<ModelDocument>;

  protected constructor(model: Model<ModelDocument>) {
    this.model = model;
  }

  async delete(id: SchemaId): Promise<void> {
    await this.model.findByIdAndDelete(id).exec();
  }

  async find(
    query: FilterQuery<ModelDocument>,
    options: QueryOptions = {},
    projection?: Record<keyof ModelDocument, boolean>,
  ): Promise<Array<ModelDocument>> {
    return this.model.find(query, projection, options).exec();
  }

  async findPaginated(
    query?: FilterQuery<ModelDocument>,
    options: QueryOptions = {
      skip: 0,
      limit: 10,
      lean: true,
    },
    projection?: Record<keyof ModelDocument, boolean>,
  ): Promise<ModelDocument[]> {
    const data = await this.model.find(query, projection, options).exec();
    return data;
  }

  async findOne(
    query: Pick<ModelDocument, keyof ModelDocument>,
  ): Promise<ModelDocument> {
    return this.model.findOne(query).exec();
  }

  async create<DTOType = Partial<ModelDocument>>(
    data: DTOType,
  ): Promise<ModelDocument> {
    return this.model.create(data);
  }

  async first(query: FilterQuery<ModelDocument>): Promise<ModelDocument> {
    return this.model.findOne(query).exec();
  }

  async update(
    id: Types.ObjectId,
    data: Partial<ModelDocument>,
  ): Promise<ModelDocument> {
    return this.model.findByIdAndUpdate(id, data, { new: true }).exec();
  }
}
