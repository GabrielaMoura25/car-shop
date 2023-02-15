import { isValidObjectId } from 'mongoose';
import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarModel from '../Models/Car.model';

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
    if (!isValidObjectId(id)) return { status: 422, response: { message: 'Invalid mongo id' } };
    const car = await this._carModel.findById(id);
    if (!car) return { status: 404, response: { message: 'Car not found' } };
    return { status: 200, response: this.createCarDomain(car) };
  }

  public async updateById(id: string, car: ICar) {
    if (!isValidObjectId(id)) return { status: 422, response: { message: 'Invalid mongo id' } };
    const carUpdated = await this._carModel.updateById(id, car);
    if (!carUpdated) return { status: 404, response: { message: 'Car not found' } };
    return { status: 200, response: this.createCarDomain(carUpdated) };
  }
}