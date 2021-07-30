let sinon = require('sinon');
const chai = require('chai');
let Search = require('../../src/controllers/search.controller');
const expect = chai.expect;
let mongoose  = require('mongoose');
mongoose.connect('', { useNewUrlParser: true, useUnifiedTopology: true  });    

describe('Search Contoller', function () {
  describe('get cities', function () {
	let status, json, res, req;
    beforeEach(() => {
      req = { params: { limit: '12' } };
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
    });
    it('should return suceess', async function () {
      await Search.most_common_searches(req, res);
      expect(status.args[0][0]).to.equal(200);
      expect(json.args[0][0].length).to.equal(parseInt(req.params.limit));
    });
	it('should return error', async function () {
		req = { params: { limit: 'nffhfhf' } };
		await Search.most_common_searches(req, res);
		expect(status.args[0][0]).to.equal(400);
		expect(json.args[0][0].status).to.equal('error');
	  });
  });
});