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

const id = '6348513f34c397abcad040b2';

describe('Motorcycle Service', function () {
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

  it('should find all motorcycles', async function () {
    sinon.stub(Model, 'find').resolves([{ id, ...reqMotorcycle }]);

    const motorcycleService = new MotorcycleService();
    const motorcycle = await motorcycleService.findAll();

    expect(motorcycle).to.be.deep.equal([{ id, ...reqMotorcycle }]);
  });

  it('should find a motorcycle by id', async function () {
    sinon.stub(Model, 'findOne').resolves({ id, ...reqMotorcycle });

    const motorcycleService = new MotorcycleService();
    const motorcycle = await motorcycleService.findById(id);

    const response = { id, ...reqMotorcycle };

    expect(motorcycle).to.be.deep.equal({ status: 200, response });
  });

  it('should find a motorcycle by id and update', async function () {
    sinon.stub(Model, 'findOneAndUpdate').resolves({ id, ...reqMotorcycle });

    const motorcycleService = new MotorcycleService();
    const motorcycle = await motorcycleService.updateById(id, reqMotorcycle);

    const response = { id, ...reqMotorcycle };

    expect(motorcycle).to.be.deep.equal({ status: 200, response });
  });
});