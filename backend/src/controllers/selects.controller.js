let selectService = require('../service/selects.service.js');

exports.get_collected_cities = async (req, res) => {
  try {
    const { username } = req.params;
    let result = await selectService.selectData(username);
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(400).send('Cannot retrieve saved cities');
  }
};

exports.save_last_search = async(req, res) => {
  try {
    await selectService.saveSelections(req.body.data, req.body.username);
    res.send('OK');
  } catch (err) {
    console.error(err);
    res.status(400).send('Cannot save last cities');
  }
};
