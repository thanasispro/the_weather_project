const db = require("../db");
require("dotenv").config();
const fetch = require("node-fetch");
let cityService = require('../service/city.service.js')
let Selects = require("../models/selects.model");

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
    res.send(apiResponseJson);
  } catch (err) {
    console.error(err);
    res.status(400).send("Api to collect cities is out of service, please contact support team");
  }
};


exports.collected_cities = async (req, res) => {
  try {
    let result = [];    
    for (const sel of req.body.data) {
      const data = await cityService.aggrate_city_actions(sel, req.body.username, req.body.saveToDb);
      result.push(data);
    }
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(400).send("Api to collect cities is out of service, please contact support team");
  }
};

