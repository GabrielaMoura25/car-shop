import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import ICar from '../../../src/Interfaces/ICar';
import CarService from '../../../src/Services/Car.service';

const reqCar: ICar = {
  model: 'Gol',
  year: 2002,
  color: 'Write',
  status: true,
  buyValue: 10.000,
  doorsQty: 4,
  seatsQty: 5,
};

describe('Car Service', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('should create a car', async function () {
    sinon.stub(Model, 'create').resolves({ id: '6348513f34c397abcad040b2', ...reqCar });

    const carService = new CarService();
    const car = await carService.create(reqCar);

    expect(car).to.be.an('object');
    expect(car).to.have.property('id');
    expect(car).to.have.property('model');
    expect(car).to.have.property('year');
    expect(car).to.have.property('color');
    expect(car).to.have.property('status');
    expect(car).to.be.deep.equal({ id: '6348513f34c397abcad040b2', ...reqCar });
  });

  it('test method GET with function "findAll"', async function () {
    sinon.stub(Model, 'find').resolves([{ id: '6348513f34c397abcad040b2', ...reqCar }]);

    const carService = new CarService();
    const car = await carService.findAll();

    expect(car).to.be.deep.equal([{ id: '6348513f34c397abcad040b2', ...reqCar }]);
  });

  it('test method GET with function "finById" when id exists', async function () {
    sinon.stub(Model, 'findOne').resolves({ id: '6348513f34c397abcad040b2', ...reqCar });

    const carService = new CarService();
    const id = '6348513f34c397abcad040b2';
    const car = await carService.findById(id);

    const response = { id: '6348513f34c397abcad040b2', ...reqCar };

    expect(car).to.be.deep.equal({ status: 200, response });
  });

  it('test method GET with function "finById" when id is not valid', async function () {
    const carService = new CarService();
    const car = await carService.findById('1');

    const response = { message: 'Invalid mongo id' };

    expect(car).to.be.deep.equal({ status: 422, response });
  });

  it('test method GET with function "finById" when car  not exists', async function () {
    sinon.stub(Model, 'findOne').resolves(null);

    const carService = new CarService();
    const id = '6348513f34c397abcad040b2';
    const car = await carService.findById(id);

    const response = { message: 'Car not found' };

    expect(car).to.be.deep.equal({ status: 404, response });
  });

  it('test method PUT with function "updateById" when id exists', async function () {
    sinon.stub(Model, 'findOneAndUpdate').resolves({ id: '6348513f34c397abcad040b2', ...reqCar });

    const carService = new CarService();
    const id = '6348513f34c397abcad040b2';
    const car = await carService.updateById(id, reqCar);

    expect(car).to.be.an('object');
    expect(car.response).to.have.property('id');
    expect(car.response).to.have.property('model');
    expect(car.response).to.have.property('year');
    expect(car.response).to.have.property('color');
    expect(car.response).to.have.property('status');
    expect(car).to.be.deep.equal({ status: 200, 
      response: { id, ...reqCar } });
  });
});