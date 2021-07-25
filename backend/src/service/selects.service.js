let Selects = require('../models/selects.model');
let Search = require('../models/search.model');

export const selectData = async () => {
  let selections = [];
  await Selects.find({}, function (err, selects) {
    selections = selects;
  });
  return selections;
};

export const saveSelections = async (data) => {
  await Selects.deleteMany({ id: { $gt: 0 } });
  data.forEach((c) => {
    const { id, latitude, longitude, city, country, countryCode } = c;
    let select = new Selects({
      id: id,
      latitude: latitude,
      longitude: longitude,
      city: city,
      country: country,
      countryCode: countryCode,
    });
    let search = new Search({
        id: id,
        latitude: latitude,
        longitude: longitude,
        city: city,
        country: country,
        countryCode: countryCode,
      });
    select.save();
    search.save()
  });
};
