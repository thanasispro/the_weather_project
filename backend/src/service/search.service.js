let Searches = require('../models/search.model');

export const mostCommon = async (limit) => {
  let searches = await Searches.aggregate([
    {
      $group: {
        _id: {
          id: '$id',
          city: '$city',
          country: '$country',
          latitude: '$latitude',
          longitude: '$longitude',
          countryCode: '$countryCode',
        },
        total: { $sum: 1 },
      },
    },
    {
      $sort: {
        total: -1,
      },
    },
    {
      $limit: limit,
    },
  ]);
  return searches;
};
