import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import MotorcycleService from '../../../src/Services/Motorcycle.service';

const reqMotorcycle: IMotorcycle = {
  model: 'Gol',
  year: 2002,
  color: 'Write',
  status: true,
  buyValue: 10.000,
  category: 'Sport',
  engineCapacity: 1.000,
};

const notFound = { message: 'Motorcycle not found' };
const invalid = { message: 'Invalid mongo id' };

const id = '6348513f34c397abcad040b2';

describe('Motorcycle Service', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('should create a motorcycle', async function () {
    sinon.stub(Model, 'create').resolves({ id, ...reqMotorcycle });

    const motorcycleService = new MotorcycleService();
    const motorcycle = await motorcycleService.create(reqMotorcycle);

    expect(motorcycle).to.be.an('object');
    expect(motorcycle).to.have.property('id');
    expect(motorcycle).to.have.property('model');
    expect(motorcycle).to.have.property('year');
    expect(motorcycle).to.have.property('color');
    expect(motorcycle).to.have.property('status');
    expect(motorcycle).to.be.deep.equal({ id, ...reqMotorcycle });
  });

  it('should not create a motorcycle', async function () {
    sinon.stub(Model, 'create').resolves(null);

    const motorcycleService = new MotorcycleService();
    const motorcycle = await motorcycleService.create(reqMotorcycle);

    expect(motorcycle).to.be.deep.equal(null);
  });

  it('should find all motorcycles', async function () {
    sinon.stub(Model, 'find').resolves([{ id, ...reqMotorcycle }]);

    const motorcycleService = new MotorcycleService();
    const motorcycle = await motorcycleService.findAll();

    expect(motorcycle).to.be.deep.equal([{ id, ...reqMotorcycle }]);
  });

  it('should find a motorcycle by id when id exists', async function () {
    sinon.stub(Model, 'findOne').resolves({ id, ...reqMotorcycle });

    const motorcycleService = new MotorcycleService();
    const motorcycle = await motorcycleService.findById(id);

    const response = { id, ...reqMotorcycle };

    expect(motorcycle).to.be.deep.equal({ status: 200, response });
  });

  it('should find a motorcycle by id when id is not valid', async function () {
    const motorcycleService = new MotorcycleService();
    const motorcycle = await motorcycleService.findById('1');

    expect(motorcycle).to.be.deep.equal({ status: 422, response: invalid });
  });

  it('should find a motorcycle by id when id does not exist', async function () {
    sinon.stub(Model, 'findOne').resolves(null);

    const motorcycleService = new MotorcycleService();
    const motorcycle = await motorcycleService.findById(id);

    expect(motorcycle).to.be.deep.equal({ status: 404, response: notFound });
  });

  it('should find a motorcycle by id and update when id exists', async function () {
    sinon.stub(Model, 'findOneAndUpdate').resolves({ id, ...reqMotorcycle });

    const motorcycleService = new MotorcycleService();
    const motorcycle = await motorcycleService.updateById(id, reqMotorcycle);

    const response = { id, ...reqMotorcycle };

    expect(motorcycle).to.be.deep.equal({ status: 200, response });
  });

  it('should find a motorcycle by id and update when id is not valid', async function () {
    const motorcycleService = new MotorcycleService();
    const motorcycle = await motorcycleService.updateById('1', reqMotorcycle);

    expect(motorcycle).to.be.deep.equal({ status: 422, response: invalid });
  });

  it('should find a motorcycle by id and update when id does not exist', async function () {
    sinon.stub(Model, 'findOneAndUpdate').resolves(null);

    const motorcycleService = new MotorcycleService();
    const motorcycle = await motorcycleService.updateById(id, reqMotorcycle);

    expect(motorcycle).to.be.deep.equal({ status: 404, response: notFound });
  });

  it('should find a motorcycle by id and delete when id exists', async function () {
    sinon.stub(Model, 'findOneAndDelete').resolves({ id, ...reqMotorcycle });

    const motorcycleService = new MotorcycleService();
    const motorcycle = await motorcycleService.deleteById(id);

    const response = { id, ...reqMotorcycle };

    expect(motorcycle).to.be.deep.equal({ status: 204, response });
  });

  it('should find a motorcycle by id and delete when id is not valid', async function () {
    const motorcycleService = new MotorcycleService();
    const motorcycle = await motorcycleService.deleteById('1');

    expect(motorcycle).to.be.deep.equal({ status: 422, response: invalid });
  });

  it('should find a motorcycle by id and delete when id does not exist', async function () {
    sinon.stub(Model, 'findOneAndDelete').resolves(null);

    const motorcycleService = new MotorcycleService();
    const motorcycle = await motorcycleService.deleteById(id);

    expect(motorcycle).to.be.deep.equal({ status: 404, response: notFound });
  });
});