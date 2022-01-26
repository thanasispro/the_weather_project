let History = require('../models/history.model');
const fetch = require('node-fetch');

exports.aggrate_city_actions = async (city, username, saveToDb) => {
  let { latitude, longitude } = city;
  const params = new URLSearchParams({
    lat: latitude,
    lon: longitude,
    units: process.env.WEATHER_API_UNITS,
    appid: process.env.WEATHER_KEY,
  });
  const apiResponse = await fetch(process.env.WEATHER_API + params.toString());
  const apiResponseJson = await apiResponse.json();
  if (!apiResponseJson.main) {
    return null;
  } else {
    if (saveToDb) {
      let history = new History({
        id: city.id,
        temperature: apiResponseJson.main.temp,
        countryCode: city.countryCode,
        username: username,
      });
      await history.save();
    }
    let avg = await History.aggregate([
      {
        $match: !saveToDb
          ? { id: city.id }
          : { id: city.id, username: username },
      },
      {
        $group: {
          _id: '$id',
          avgTemp: { $avg: '$temperature' },
          min: { $min: '$temperature' },
          max: { $max: '$temperature' },
        },
      },
    ]);
    return {
      min: avg[0].min,
      max: avg[0].max,
      avg: avg[0].avgTemp,
      city: city.city,
      country: city.country,
      countryCode: city.countryCode,
      now: apiResponseJson.main.temp,
    };
  }
};
