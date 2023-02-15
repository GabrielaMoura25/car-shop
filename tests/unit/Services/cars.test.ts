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

const invalid = { message: 'Invalid mongo id' };
const notFound = { message: 'Car not found' };
const id = '6348513f34c397abcad040b2';

describe('Car Service', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('should create a car', async function () {
    sinon.stub(Model, 'create').resolves({ id, ...reqCar });

    const carService = new CarService();
    const car = await carService.create(reqCar);

    expect(car).to.be.an('object');
    expect(car).to.have.property('id');
    expect(car).to.have.property('model');
    expect(car).to.have.property('year');
    expect(car).to.have.property('color');
    expect(car).to.have.property('status');
    expect(car).to.be.deep.equal({ id, ...reqCar });
  });

  it('not exists car', async function () {
    sinon.stub(Model, 'create').resolves(null);

    const carService = new CarService();
    const car = await carService.create(reqCar);

    expect(car).to.be.deep.equal(null);
  });

  it('test method GET with function "findAll"', async function () {
    sinon.stub(Model, 'find').resolves([{ id, ...reqCar }]);

    const carService = new CarService();
    const car = await carService.findAll();

    expect(car).to.be.deep.equal([{ id, ...reqCar }]);
  });

  it('test method GET with function "finById" when id exists', async function () {
    sinon.stub(Model, 'findOne').resolves({ id, ...reqCar });

    const carService = new CarService();
    const car = await carService.findById(id);

    const response = { id, ...reqCar };

    expect(car).to.be.deep.equal({ status: 200, response });
  });

  it('test method GET with function "finById" when id is not valid', async function () {
    const carService = new CarService();
    const car = await carService.findById('1');

    expect(car).to.be.deep.equal({ status: 422, response: invalid });
  });

  it('test method GET with function "finById" when car  not exists', async function () {
    sinon.stub(Model, 'findOne').resolves(null);

    const carService = new CarService();
    const car = await carService.findById(id);

    expect(car).to.be.deep.equal({ status: 404, response: notFound });
  });

  it('test method PUT with function "updateById" when id exists', async function () {
    sinon.stub(Model, 'findOneAndUpdate').resolves({ id, ...reqCar });

    const carService = new CarService();
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

  it('test method PUT with function "updateById" when id is not valid', async function () {
    const carService = new CarService();
    const car = await carService.updateById('1', reqCar);

    expect(car).to.be.deep.equal({ status: 422, response: invalid });
  });

  it('test method PUT with function "updateById" when car not exists', async function () {
    sinon.stub(Model, 'findOneAndUpdate').resolves(null);

    const carService = new CarService();
    const car = await carService.updateById(id, reqCar);

    expect(car).to.be.deep.equal({ status: 404, response: notFound });
  });

  it('test method DELETE with function "deleteById" when id exists', async function () {
    sinon.stub(Model, 'findOneAndDelete').resolves({ id, ...reqCar });

    const carService = new CarService();
    const car = await carService.deleteById(id);

    expect(car).to.be.an('object');
    expect(car.response).to.have.property('id');
    expect(car.response).to.have.property('model');
    expect(car.response).to.have.property('year');
    expect(car.response).to.have.property('color');
    expect(car.response).to.have.property('status');
    expect(car).to.be.deep.equal({ status: 204, 
      response: { id, ...reqCar } });
  });

  it('test method DELETE with function "deleteById" when id is not valid', async function () {
    const carService = new CarService();
    const car = await carService.deleteById('1');

    expect(car).to.be.deep.equal({ status: 422, response: invalid });
  });

  it('test method DELETE with function "deleteById" when car not exists', async function () {
    sinon.stub(Model, 'findOneAndDelete').resolves(null);

    const carService = new CarService();
    const car = await carService.deleteById(id);

    expect(car).to.be.deep.equal({ status: 404, response: notFound });
  });
});