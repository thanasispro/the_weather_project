let Selects = require('../models/selects.model');
let Search = require('../models/search.model');

export const selectData = async (username) => {
  let selections = [];
  await Selects.find({username: username}, function (err, selects) {
    selections = selects;
  });
  return selections;
};

export const saveSelections = async (data, username) => {
  data.forEach((c) => {
    const { id, latitude, longitude, city, country, countryCode } = c;
    let search = new Search({
        id: id,
        latitude: latitude,
        longitude: longitude,
        city: city,
        country: country,
        countryCode: countryCode,
        username: username
      });
    search.save()
  });
};
