import { Model, Schema, model, models, UpdateQuery } from 'mongoose';
import { ObjectId } from 'mongodb';

export default abstract class AbstractODM <T> {
  protected schema: Schema;
  protected model: Model<T>;
  protected name: string;

  constructor(name: string, schema: Schema) {
    this.name = name;
    this.schema = schema;
    this.model = models[this.name] || model(this.name, this.schema);
  }

  public async create(car: T): Promise<T> {
    return this.model.create({ ...car });
  }

  public async findAll(): Promise<T[]> {
    return this.model.find();
  }

  public async findById(id: string): Promise<T | null> {
    return this.model.findOne({ _id: new ObjectId(id) });
  }

  public async updateById(id: string, vehicle: UpdateQuery<T>): Promise<T | null> {
    return this.model.findOneAndUpdate({ _id: new ObjectId(id) }, { ...vehicle }, { new: true });
  }

  public async deleteById(id: string): Promise<T | null> {
    return this.model.findOneAndDelete({ _id: new ObjectId(id) });
  }
}