import { isValidObjectId } from 'mongoose';
import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleModel from '../Models/Motorcycle.model';

const invalid = { status: 422, response: { message: 'Invalid mongo id' } };
const notFound = { status: 404, response: { message: 'Motorcycle not found' } };

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

  public async findAll() {
    const motorcycles = await this.motorcycleModel.findAll();

    return motorcycles.map((motorcycle) => this.createMotorcycleDomain(motorcycle));
  }

  public async findById(id: string) {
    if (!isValidObjectId(id)) return invalid;
    const motorcycle = await this.motorcycleModel.findById(id);
    if (!motorcycle) return notFound;
    return { status: 200, response: this.createMotorcycleDomain(motorcycle) };
  }

  public async updateById(id: string, motorcycle: IMotorcycle) {
    if (!isValidObjectId(id)) return invalid;
    const motorcycleUpdated = await this.motorcycleModel.updateById(id, motorcycle);
    if (!motorcycleUpdated) return notFound;
    return { status: 200, response: this.createMotorcycleDomain(motorcycleUpdated) };
  }

  public async deleteById(id: string) {
    if (!isValidObjectId(id)) return invalid;
    const motorcycleDeleted = await this.motorcycleModel.deleteById(id);
    if (!motorcycleDeleted) return notFound;
    return { status: 204, response: this.createMotorcycleDomain(motorcycleDeleted) };
  }
}