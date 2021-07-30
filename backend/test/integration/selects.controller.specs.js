let sinon = require('sinon');
const chai = require('chai');
let Selects = require('../../src/controllers/selects.controller');
const expect = chai.expect;
let mongoose  = require('mongoose');
mongoose.connect('', { useNewUrlParser: true, useUnifiedTopology: true  });    

describe('Selects Contoller', function () {
  describe('can retrieve selections', function () {
	let status, json, res, req;
    beforeEach(() => {
      req = { params: { username: 'beos123' } };
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
    });
    it('should return suceess', async function () {
      await Selects.get_collected_cities(req, res);
      expect(status.args[0][0]).to.equal(200);
    //   expect(json.args[0][0].length).to.greaterThan(0);
    });
  });
});