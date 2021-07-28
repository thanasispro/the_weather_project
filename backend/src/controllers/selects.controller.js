let selectService = require('../service/selects.service.js');
let User = require('../models/user.model');

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
    let user = await User.find({username: req.body.username})
    if (!user.length) {
      res.status(400).json({
        status: 'error',
        error: 'Unable to find user',
      });
    } else {
      await selectService.saveSelections(req.body.data, req.body.username);
      res.status(201).send('Created succefully');
    }
  } catch (err) {
    console.error(err);
    res.status(400).send('Cannot save last cities');
  }
};
