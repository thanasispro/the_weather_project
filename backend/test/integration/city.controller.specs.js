let sinon = require('sinon');
const chai = require('chai');
let CityContoller = require('../../src/controllers/city.controller');
const expect = chai.expect;
let mongoose  = require('mongoose');
mongoose.connect('', { useNewUrlParser: true, useUnifiedTopology: true  });    

describe('CityContoller', function () {
  describe('get cities', function () {
	let status, json, res, req;
    beforeEach(() => {
      req = { params: { city: 'c' } };
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
    });
    before(() => {
      process.env.CITY_URL_OFFSET = '0';
      process.env.CITY_URL_LIMIT = '10';
      process.env.CITY_URL_SORT = 'population';
      process.env.CITY_URL =
        'http://geodb-free-service.wirefreethought.com/v1/geo/cities?';
    });
    it('should get citys', async function () {
      await CityContoller.cities_get_all(req, res);
      expect(status.args[0][0]).to.equal(200);
      expect(json.args[0][0].data.length).to.equal(
        parseInt(process.env.CITY_URL_LIMIT)
      );
    });
    it('missing url', async function () {
      process.env.CITY_URL = '';
      await CityContoller.cities_get_all(req, res);
      expect(status.args[0][0]).to.equal(400);
    });
    it('missing offset', async function () {
      process.env.CITY_URL_OFFSET = '';
      await CityContoller.cities_get_all(req, res);
      expect(status.args[0][0]).to.equal(400);
    });
    it('missing limit', async function () {
      process.env.CITY_URL_LIMIT = '';
      await CityContoller.cities_get_all(req, res);
      expect(status.args[0][0]).to.equal(400);
    });
    it('missing sort', async function () {
      process.env.CITY_URL_SORT = '';
      await CityContoller.cities_get_all(req, res);
      expect(status.args[0][0]).to.equal(400);
    });
    it('wrong sort variable', async function () {
      process.env.CITY_URL_SORT = 'wrong';
      await CityContoller.cities_get_all(req, res);
      expect(status.args[0][0]).to.equal(400);
    });
  });
  describe('request cities', function () {
	let status, json, res, req;
	before(() => {
		process.env.WEATHER_KEY=''
		process.env.WEATHER_API='http://api.openweathermap.org/data/2.5/weather?'
		process.env.WEATHER_API_UNITS='metric'
	  });
	beforeEach(() => {
		req = { body: {data: [], username : '5h'}  };
		status = sinon.stub();
		json = sinon.spy();
		res = { json, status };
		status.returns(res);
	  });
	  it('should get an error', async function () {
		await CityContoller.collected_cities(req, res);
		expect(status.args[0][0]).to.equal(400);
		expect(json.args[0][0].status).to.equal('error');
		expect(json.args[0][0].error).to.equal('Unable to find user');
	  });
	  it('provided wrong values', async function () {
		req = { body: {data: [{longitude: 580, latitude:600}], username : 'thanasis'}  };
		await CityContoller.collected_cities(req, res);
		expect(status.args[0][0]).to.equal(400);
		expect(json.args[0][0].status).to.equal('error');
		expect(json.args[0][0].error).to.equal('Weather api is out of service or wrong data provided');
	  });
	  it('provided real values', async function () {
		req = { body: {data: [{id:8668, longitude: 50, latitude:-50, countryCode: 'GR', city:'Athens', country: 'Greece'}], username : 'thanasis', saveToDB: false}  };
		await CityContoller.collected_cities(req, res);
		expect(status.args[0][0]).to.equal(200);
	  });
  });
});
  
