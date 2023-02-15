import { isValidObjectId } from 'mongoose';
import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarModel from '../Models/Car.model';

const invalid = { status: 422, response: { message: 'Invalid mongo id' } };
const notFound = { status: 404, response: { message: 'Car not found' } };

export default class CarService {
  private _carModel = new CarModel();

  private createCarDomain(car: ICar) {
    if (car) return new Car(car);
    return null;
  }

  public async create(car: ICar) {
    const carCreated = await this._carModel.create(car);

    return this.createCarDomain(carCreated);
  }

  public async findAll() {
    const cars = await this._carModel.findAll();

    return cars.map((car) => this.createCarDomain(car));
  }

  public async findById(id: string) {
    if (!isValidObjectId(id)) return invalid;
    const car = await this._carModel.findById(id);
    if (!car) return notFound;
    return { status: 200, response: this.createCarDomain(car) };
  }

  public async updateById(id: string, car: ICar) {
    if (!isValidObjectId(id)) return invalid;
    const carUpdated = await this._carModel.updateById(id, car);
    if (!carUpdated) return notFound;
    return { status: 200, response: this.createCarDomain(carUpdated) };
  }

  public async deleteById(id: string) {
    if (!isValidObjectId(id)) return invalid;
    const carDeleted = await this._carModel.deleteById(id);
    if (!carDeleted) return notFound;
    return { status: 204, response: this.createCarDomain(carDeleted) };
  }
}