import { Model, Schema, model, models } from 'mongoose';
import Icar from '../Interfaces/Icar';

export default class CarModel {
  private _model: Model<Icar>;
  private schema: Schema;

  constructor() {
    this.schema = new Schema<Icar>({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean, required: true },
      buyValue: { type: Number, required: true },
      doorsQty: { type: Number, required: true },
      seatsQty: { type: Number, required: true },
    });

    this._model = models.Car || model('Car', this.schema);
  }

  public async create(car: Icar): Promise<Icar> {
    return this._model.create({ ...car });
  }
}