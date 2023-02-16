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

  it('should not create a car', async function () {
    sinon.stub(Model, 'create').resolves(null);

    const carService = new CarService();
    const car = await carService.create(reqCar);

    expect(car).to.be.deep.equal(null);
  });

  it('should find all cars', async function () {
    sinon.stub(Model, 'find').resolves([{ id, ...reqCar }]);

    const carService = new CarService();
    const car = await carService.findAll();

    expect(car).to.be.deep.equal([{ id, ...reqCar }]);
  });

  it('should find a car by id when id exists', async function () {
    sinon.stub(Model, 'findOne').resolves({ id, ...reqCar });

    const carService = new CarService();
    const car = await carService.findById(id);

    const response = { id, ...reqCar };

    expect(car).to.be.deep.equal({ status: 200, response });
  });

  it('should find a car by id when id is not valid', async function () {
    const carService = new CarService();
    const car = await carService.findById('1');

    expect(car).to.be.deep.equal({ status: 422, response: invalid });
  });

  it('should find a car by id when id does not exist', async function () {
    sinon.stub(Model, 'findOne').resolves(null);

    const carService = new CarService();
    const car = await carService.findById(id);

    expect(car).to.be.deep.equal({ status: 404, response: notFound });
  });

  it('should find a car by id and update when id exists', async function () {
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

  it('should find a car by id and update when id is not valid', async function () {
    const carService = new CarService();
    const car = await carService.updateById('1', reqCar);

    expect(car).to.be.deep.equal({ status: 422, response: invalid });
  });

  it('should find a car by id and update when id does not exist', async function () {
    sinon.stub(Model, 'findOneAndUpdate').resolves(null);

    const carService = new CarService();
    const car = await carService.updateById(id, reqCar);

    expect(car).to.be.deep.equal({ status: 404, response: notFound });
  });

  it('should find a car by id and delete when id exists', async function () {
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

  it('should find a car by id and delete when id is not valid', async function () {
    const carService = new CarService();
    const car = await carService.deleteById('1');

    expect(car).to.be.deep.equal({ status: 422, response: invalid });
  });

  it('should find a car by id and delete when id does not exist', async function () {
    sinon.stub(Model, 'findOneAndDelete').resolves(null);

    const carService = new CarService();
    const car = await carService.deleteById(id);

    expect(car).to.be.deep.equal({ status: 404, response: notFound });
  });
});