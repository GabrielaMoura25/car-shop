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

  public async findAll() {
    try {
      const motorcycles = await this.motorcycleService.findAll();

      return this.res.status(200).json(motorcycles);
    } catch (error) {
      this.next(error);
    }
  }

  public async findById() {
    const { id } = this.req.params;

    try {
      const { status, response } = await this.motorcycleService.findById(id);

      return this.res.status(status).json(response);
    } catch (error) {
      this.next(error);
    }
  }

  public async updateById() {
    const { id } = this.req.params;
    const motorcycle: IMotorcycle = { ...this.req.body };

    try {
      const { status, response } = await this.motorcycleService.updateById(id, motorcycle);

      return this.res.status(status).json(response);
    } catch (error) {
      this.next(error);
    }
  }
}