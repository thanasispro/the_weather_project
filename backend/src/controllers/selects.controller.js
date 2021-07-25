let selectService = require('../service/selects.service.js');

exports.get_collected_cities = async (req, res) => {
  try {
    let result = await selectService.selectData();
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(400).send('Cannot retrieve saved cities');
  }
};

exports.save_last_search = async(req, res) => {
  try {
    await selectService.saveSelections(req.body.data);
    res.send('OK');
  } catch (e) {
    console.error(err);
    es.status(400).send('Cannot save last cities');
  }
};
