import Icar from '../Interfaces/Icar';

export default class Car {
  protected id?: string | undefined;
  protected model: string;
  protected year: number;
  protected color: string;
  protected status: boolean | undefined;
  protected buyValue: number;
  private _doorsQty: number;
  private _seatsQty: number;

  constructor(car: Icar) {
    this.model = car.model;
    this.year = car.year;
    this.color = car.color;
    this.status = car.status;
    this.buyValue = car.buyValue;
    this._doorsQty = car.doorsQty;
    this._seatsQty = car.seatsQty;
  }
}