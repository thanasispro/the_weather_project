const db = require('../db');
require('dotenv').config();
const fetch = require('node-fetch');
let cityService = require('../service/city.service.js');

exports.cities_get_all = async (req, res) => {
  try {
    const { city } = req.params;
    const params = new URLSearchParams({
      offset: process.env.CITY_URL_OFFSET,
      limit: process.env.CITY_URL_LIMIT,
      sort: process.env.CITY_URL_SORT,
      hateoasmode: false,
      namePrefix: city,
    });
    const apiResponse = await fetch(process.env.CITY_URL + params.toString());
    const apiResponseJson = await apiResponse.json();
    res.status(200).send(apiResponseJson);
  } catch (err) {
    res.status(400).json({
      status: 'error',
      error: 'Unexpected error, please contact support team',
    });
  }
};

exports.collected_cities = async (req, res) => {
  let result = [];
  let hasError = false;
  try {
    for (const sel of req.body.data) {
      const data = await cityService.aggrate_city_actions(
        sel,
        req.body.username,
        req.body.saveToDb
      );
      if (!data) {
        hasError = true;
        break;
      }
      result.push(data);
    }
    if (!hasError) {
      res.send(result);
    } else {
      res.status(400).json({
        status: 'error',
        error: 'Weather api is out of service or wrong data provided',
      });
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({
      status: 'error',
      error: 'Unexpected error, please contact support team',
    });
  }
};
