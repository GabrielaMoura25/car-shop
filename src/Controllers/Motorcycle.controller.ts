import { Request, Response, NextFunction } from 'express';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleService from '../Services/Motorcycle.service';

export default class MotorcycleController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private motorcycleService: MotorcycleService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.motorcycleService = new MotorcycleService();
  }

  public async create() {
    const motorcycle: IMotorcycle = { ...this.req.body };

    try {
      const motorcycleCreated = await this.motorcycleService.create(motorcycle);

      return this.res.status(201).json(motorcycleCreated);
    } catch (error) {
      this.next(error);
    }
  }
}