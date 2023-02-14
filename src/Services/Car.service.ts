import Car from '../Domains/Car';
import Icar from '../Interfaces/ICar';
import CarModel from '../Models/Car.model';

export default class CarService {
  private _carModel = new CarModel();

  private createCarDomain(car: Icar) {
    if (car) return new Car(car);
    return null;
  }

  public async create(car: Icar) {
    const carCreated = await this._carModel.create(car);

    return this.createCarDomain(carCreated);
  }
}