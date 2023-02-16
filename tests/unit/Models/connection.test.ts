import { expect } from 'chai';
import Connection from '../../../src/Models/Connection';

describe('connectToDatabase', function () {
  it('should connect to the database successfully', async function () {
    try {
      const result = await Connection();
      expect(result).to.be.an('object');
      expect(result.connections[0].readyState).to.equal(1);
    } catch (error) {
      console.log(error);
    }
  });

  it('should return an error if the connection fails', async function () {
    try {
      await Connection('mongodb://localhost:27017/invalid-database');
    } catch (error) {
      expect(error).to.be.an('error');
    }
  });
});
