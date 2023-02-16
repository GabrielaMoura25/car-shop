import sinon from 'sinon';
import { Request, NextFunction } from 'express';
import MotorcycleController from '../../../src/Controllers/Motorcycle.controller';

const reqMotorcycle = {
  model: 'Gol',
  year: 2002,
  color: 'Write',
  status: true,
  buyValue: 10.000,
  category: 'Sport',
  engineCapacity: 1.000,
};

const res = {
  status: sinon.stub().returnsThis(),
  json: sinon.stub().returnsThis(),
};

const next = sinon.stub();

describe('MotorcycleController', function () {
  it('should create a motorcycle', async function () {
    const req = { body: reqMotorcycle };
  
    const motorcycleController = new MotorcycleController(
      req as Request, 
      res as any, 
      next as NextFunction,
    );

    const motorcycle = { reqMotorcycle };

    const motorcycleServiceMock = sinon.mock(motorcycleController.motorcycleService);
    motorcycleServiceMock.expects('create').once().withArgs(req.body).resolves(motorcycle);

    await motorcycleController.create();

    motorcycleServiceMock.verify();
    motorcycleServiceMock.restore();
  });

  it('should find all motorcycles', async function () {
    const req = {};

    const motorcycleController = new MotorcycleController(
      req as Request,
      res as any,
      next as NextFunction,
    );

    const motorcycles = [
      { reqMotorcycle },
      {
        model: 'Uno',
        year: 2002,
        color: 'Write',
        status: true,
        buyValue: 10.000,
        capacity: 'Sport',
        engineCapacity: 800,
      },
    ];

    const motorcycleMock = sinon.mock(motorcycleController.motorcycleService);
    motorcycleMock.expects('findAll').once().resolves(motorcycles);

    await motorcycleController.findAll();

    motorcycleMock.verify();
    motorcycleMock.restore();
  });

  it('should find a motorcycle by id', async function () {
    const req = { params: { id: '1' } };

    const motorcycleController = new MotorcycleController(
      req as any,
      res as any,
      next as NextFunction,
    );

    const motorcycle = { reqMotorcycle };

    const motorcycleMock = sinon.mock(motorcycleController.motorcycleService);
    motorcycleMock.expects('findById').once().withArgs(req.params.id).resolves(motorcycle);

    await motorcycleController.findById();

    motorcycleMock.verify();
    motorcycleMock.restore();
  });

  it('should update a motorcycle', async function () {
    const req = { params: { id: '1' }, body: { reqMotorcycle } };

    const motorcycleController = new MotorcycleController(
      req as any,
      res as any,
      next as NextFunction,
    );

    const motorcycle = { reqMotorcycle };

    const motorcycleMock = sinon.mock(motorcycleController.motorcycleService);
    motorcycleMock.expects('updateById')
      .once().withArgs(req.params.id, req.body).resolves(motorcycle);

    await motorcycleController.updateById();

    motorcycleMock.verify();
    motorcycleMock.restore();
  });

  it('should delete a motorcycle', async function () {
    const req = { params: { id: '1' } };

    const motorcycleController = new MotorcycleController(
      req as any,
      res as any,
      next as NextFunction,
    );

    const motorcycleMock = sinon.mock(motorcycleController.motorcycleService);

    await motorcycleController.deleteById();

    motorcycleMock.verify();
    motorcycleMock.restore();
  });

  it('should return a error when create a motorcycle', async function () {
    const req = { body: { reqMotorcycle } };

    const motorcycleController = new MotorcycleController(
      req as any,
      res as any,
      next as NextFunction,
    );

    const motorcycleMock = sinon.mock(motorcycleController.motorcycleService);
    motorcycleMock.expects('create').once().withArgs(req.body).rejects();

    await motorcycleController.create();

    motorcycleMock.verify();
    motorcycleMock.restore();
  });

  it('should return a error when find all motorcycles', async function () {
    const req = {};

    const motorcycleController = new MotorcycleController(
      req as any,
      res as any,
      next as NextFunction,
    );

    const motorcycleMock = sinon.mock(motorcycleController.motorcycleService);
    motorcycleMock.expects('findAll').once().rejects();

    await motorcycleController.findAll();

    motorcycleMock.verify();
    motorcycleMock.restore();
  });

  it('should return a error when find a motorcycle by id', async function () {
    const req = { params: { id: '1' } };

    const motorcycleController = new MotorcycleController(
      req as any,
      res as any,
      next as NextFunction,
    );

    const motorcycleMock = sinon.mock(motorcycleController.motorcycleService);
    motorcycleMock.expects('findById').once().withArgs(req.params.id).rejects();

    await motorcycleController.findById();

    motorcycleMock.verify();
    motorcycleMock.restore();
  });

  it('should return a error when update a motorcycle', async function () {
    const req = { params: { id: '1' }, body: { reqMotorcycle } };

    const motorcycleController = new MotorcycleController(
      req as any,
      res as any,
      next as NextFunction,
    );

    const motorcycleMock = sinon.mock(motorcycleController.motorcycleService);
    motorcycleMock.expects('updateById')
      .once().withArgs(req.params.id, req.body).rejects();

    await motorcycleController.updateById();

    motorcycleMock.verify();
    motorcycleMock.restore();
  });

  it('should return a error when delete a motorcycle', async function () {
    const req = { params: { id: '1' } };

    const motorcycleController = new MotorcycleController(
      req as any,
      res as any,
      next as NextFunction,
    );

    const motorcycleMock = sinon.mock(motorcycleController.motorcycleService);
    motorcycleMock.expects('deleteById').once().withArgs(req.params.id).rejects();

    await motorcycleController.deleteById();

    motorcycleMock.verify();
    motorcycleMock.restore();
  });  
});