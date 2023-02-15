import { Model, Schema, model, models } from 'mongoose';
import { ObjectId } from 'mongodb';
import ICar from '../Interfaces/ICar';

export default class CarModel {
  private _model: Model<ICar>;
  private schema: Schema;

  constructor() {
    this.schema = new Schema<ICar>({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean, required: false, default: false },
      buyValue: { type: Number, required: true },
      doorsQty: { type: Number, required: true },
      seatsQty: { type: Number, required: true },
    });

    this._model = models.Car || model('Car', this.schema);
  }

  public async create(car: ICar): Promise<ICar> {
    return this._model.create({ ...car });
  }

  public async findAll(): Promise<ICar[]> {
    return this._model.find();
  }

  public async findById(id: string): Promise<ICar | null> {
    return this._model.findOne({ _id: new ObjectId(id) });
  }

  public async updateById(id: string, car: ICar): Promise<ICar | null> {
    return this._model.findOneAndUpdate({ _id: new ObjectId(id) }, car, { new: true });
  }
}