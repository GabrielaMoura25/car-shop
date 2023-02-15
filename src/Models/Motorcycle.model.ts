import { Schema } from 'mongoose';
import IMotorcycle from '../Interfaces/IMotorcycle';
import AbstractODM from './AbstractODM';

export default class MotorcycleModel extends AbstractODM<IMotorcycle> {
  constructor() {
    super('Motorcycle', new Schema<IMotorcycle>({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean, required: false, default: false },
      buyValue: { type: Number, required: true },
      category: { type: String, required: true },
      engineCapacity: { type: Number, required: true },
    }));
  }

  public async create(motorcycle: IMotorcycle): Promise<IMotorcycle> {
    return this.model.create({ ...motorcycle });
  }
}