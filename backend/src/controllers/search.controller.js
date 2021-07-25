let searchService = require('../service/search.service.js');

exports.most_common_searches = async(req, res) => {
	try {
	  let finalResults = [];
	  let results = await searchService.mostCommon();
	  results.forEach((r) => {
		  finalResults.push(r._id)
	  })
	  res.send(finalResults);
	} catch (e) {
	  console.error(err);
	  es.status(400).send('Cannot save last cities');
	}
  };