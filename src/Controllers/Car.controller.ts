import { Request, Response, NextFunction } from 'express';
import ICar from '../Interfaces/ICar';
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
    const car: ICar = { ...this._req.body };

    try {
      const carCreated = await this._carService.create(car);

      return this._res.status(201).json(carCreated);
    } catch (error) {
      this._next(error);
    }
  }

  public async findAll() {
    try {
      const cars = await this._carService.findAll();

      return this._res.status(200).json(cars);
    } catch (error) {
      this._next(error);
    }
  }

  public async findById() {
    const { id } = this._req.params;

    try {
      const { status, response } = await this._carService.findById(id);

      return this._res.status(status).json(response);
    } catch (error) {
      this._next(error);
    }
  }

  public async updateById() {
    const { id } = this._req.params;
    const car: ICar = { ...this._req.body };

    try {
      const { status, response } = await this._carService.updateById(id, car);

      return this._res.status(status).json(response);
    } catch (error) {
      this._next(error);
    }
  }
}