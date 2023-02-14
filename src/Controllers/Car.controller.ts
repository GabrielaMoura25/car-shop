import { Request, Response, NextFunction } from 'express';
import Icar from '../Interfaces/ICar';
import CarService from '../Services/Car.service';

export default class CarController {
  private _req: Request;
  private _res: Response;
  private _next: NextFunction;
  private _carService: CarService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this._req = req;
    this._res = res;
    this._next = next;
    this._carService = new CarService();
  }

  public async create() {
    const car: Icar = { ...this._req.body };

    try {
      const carCreated = await this._carService.create(car);

      return this._res.status(201).json(carCreated);
    } catch (error) {
      this._next(error);
    }
  }
}