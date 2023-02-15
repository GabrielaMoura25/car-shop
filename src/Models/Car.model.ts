import { Schema } from 'mongoose';
import { ObjectId } from 'mongodb';
import ICar from '../Interfaces/ICar';
import AbstractODM from './AbstractODM';

export default class CarModel extends AbstractODM<ICar> {
  constructor() {
    super('Car', new Schema<ICar>({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean, required: false, default: false },
      buyValue: { type: Number, required: true },
      doorsQty: { type: Number, required: true },
      seatsQty: { type: Number, required: true },
    }));
  }

  public async create(car: ICar): Promise<ICar> {
    return this.model.create({ ...car });
  }

  public async findAll(): Promise<ICar[]> {
    return this.model.find();
  }

  public async findById(id: string): Promise<ICar | null> {
    return this.model.findOne({ _id: new ObjectId(id) });
  }

  public async updateById(id: string, car: ICar): Promise<ICar | null> {
    return this.model.findOneAndUpdate({ _id: new ObjectId(id) }, car, { new: true });
  }
}