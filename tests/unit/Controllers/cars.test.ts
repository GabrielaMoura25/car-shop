import sinon from 'sinon';
import { Request, NextFunction } from 'express';
import CarController from '../../../src/Controllers/Car.controller';

const reqCar = {
  model: 'Gol',
  year: 2002,
  color: 'Write',
  status: true,
  buyValue: 10.000,
  doorsQty: 4,
  seatsQty: 5,
};

const res = {
  status: sinon.stub().returnsThis(),
  json: sinon.stub().returnsThis(),
};
const next = sinon.stub();

describe('CarController', function () {
  it('should create a car', async function () {
    const req = { body: reqCar };
    
    const carController = new CarController(req as Request, res as any, next as NextFunction);

    const car = reqCar;

    const carServiceMock = sinon.mock(carController._carService);
    carServiceMock.expects('create').once().withArgs(req.body).resolves(car);

    await carController.create();

    carServiceMock.verify();
    carServiceMock.restore();
  });

  it('should find all cars', async function () {
    const req = {};
    
    const carController = new CarController(req as Request, res as any, next as NextFunction);

    const cars = [reqCar,
      {
        model: 'Uno',
        year: 2002,
        color: 'Write',
        status: true,
        buyValue: 10.000,
        doorsQty: 4,
        seatsQty: 5,
      },
    ];

    const carServiceMock = sinon.mock(carController._carService);
    carServiceMock.expects('findAll').resolves(cars);

    await carController.findAll();

    carServiceMock.verify();
    carServiceMock.restore();
  });

  it('should find a car by id', async function () {
    const req = { params: { id: '5f5e9c9b6b8c1f0d1c0d3f3c' } };
    
    const carController = new CarController(req as any, res as any, next as NextFunction);

    const car = reqCar;

    const carServiceMock = sinon.mock(carController._carService);
    carServiceMock.expects('findById').withArgs(req.params.id).resolves(car);

    await carController.findById();

    carServiceMock.verify();
    carServiceMock.restore();
  });

  it('should update a car', async function () {
    const req = { params: { id: '5f5e9c9b6b8c1f0d1c0d3f3c' },
      body: reqCar };

    const carController = new CarController(req as any, res as any, next as NextFunction);

    const car = reqCar;

    const carServiceMock = sinon.mock(carController._carService);
    carServiceMock.expects('updateById').withArgs(req.params.id, req.body).resolves(car);

    await carController.updateById();

    carServiceMock.verify();
    carServiceMock.restore();
  });

  it('should delete a car', async function () {
    const req = { params: { id: '5' } };
    
    const carController = new CarController(req as any, res as any, next as NextFunction);

    const carServiceMock = sinon.mock(carController._carService);

    await carController.deleteById();

    carServiceMock.verify();
    carServiceMock.restore();
  });

  it('should return a error when create a car', async function () {
    const req = { body: reqCar };
    
    const carController = new CarController(req as Request, res as any, next as NextFunction);

    const carServiceMock = sinon.mock(carController._carService);
    carServiceMock.expects('create').once().withArgs(req.body).rejects();

    await carController.create();

    carServiceMock.verify();
    carServiceMock.restore();
  });

  it('should return a error when find all cars', async function () {
    const req = {};
    
    const carController = new CarController(req as Request, res as any, next as NextFunction);

    const carServiceMock = sinon.mock(carController._carService);
    carServiceMock.expects('findAll').rejects();

    await carController.findAll();

    carServiceMock.verify();
    carServiceMock.restore();
  });

  it('should return a error when find a car by id', async function () {
    const req = { params: { id: '5f5e9c9b6b8c1f0d1c0d3f3c' } };
    
    const carController = new CarController(req as any, res as any, next as NextFunction);

    const carServiceMock = sinon.mock(carController._carService);
    carServiceMock.expects('findById').withArgs(req.params.id).rejects();

    await carController.findById();

    carServiceMock.verify();
    carServiceMock.restore();
  });

  it('should return a error when update a car', async function () {
    const req = { params: { id: '5f5e9c9b6b8c1f0d1c0d3f3c' },
      body: reqCar };

    const carController = new CarController(req as any, res as any, next as NextFunction);

    const carServiceMock = sinon.mock(carController._carService);
    carServiceMock.expects('updateById').withArgs(req.params.id, req.body).rejects();

    await carController.updateById();

    carServiceMock.verify();
    carServiceMock.restore();
  });

  it('should return a error when delete a car', async function () {
    const req = { params: { id: '5f5e9c9b6b8c1f0d1c0d3f3c' } };

    const carController = new CarController(req as any, res as any, next as NextFunction);

    const carServiceMock = sinon.mock(carController._carService);
    carServiceMock.expects('deleteById').withArgs(req.params.id).rejects();

    await carController.deleteById();

    carServiceMock.verify();
    carServiceMock.restore();
  });
});