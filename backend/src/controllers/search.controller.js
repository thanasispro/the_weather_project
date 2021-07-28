let searchService = require('../service/search.service.js');

exports.most_common_searches = async(req, res) => {
	try {
	  let {limit} = req.params
	  let finalResults = [];
	  let results = await searchService.mostCommon(parseInt(limit));
	  results.forEach((r) => {
		  finalResults.push(r._id)
	  })
	  res.status(200).json(finalResults);
	} catch (e) {
	  console.error(e);
	  res.status(400).json({
		status: 'error',
		error: 'Unexpected error, please contact support team',
	  });
	}
  };