import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleModel from '../Models/Motorcycle.model';

export default class MotorcycleService {
  private motorcycleModel = new MotorcycleModel();

  private createMotorcycleDomain(motorcycle: IMotorcycle) {
    if (!motorcycle) return null;
    return new Motorcycle(motorcycle);
  }

  public async create(motorcycle: IMotorcycle) {
    const motorcycleCreated = await this.motorcycleModel.create(motorcycle);

    return this.createMotorcycleDomain(motorcycleCreated);
  }
}