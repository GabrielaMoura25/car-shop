import { Model, Schema, model, models } from 'mongoose';

export default abstract class AbstractODM <T> {
  protected schema: Schema;
  protected model: Model<T>;
  protected name: string;

  constructor(schema: Schema, name: string) {
    this.name = name;
    this.schema = schema;
    this.model = models[this.name] || model(this.name, this.schema);
  }
}