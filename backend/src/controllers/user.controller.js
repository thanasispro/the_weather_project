let userService = require('../service/user.service.js');

exports.register_user = async (req, res) => {
  try {
    await userService.registerUser(req.body, res);
  } catch (err) {
    console.error(err);
    res.status(400).send('Cannot save last cities');
  }
};

exports.login_user = async (req, res) => {
	try {
	  await userService.loginUser(req.body, res);
	} catch (err) {
	  console.error(err);
	  res.status(400).send('Cannot login');
	}
  };
