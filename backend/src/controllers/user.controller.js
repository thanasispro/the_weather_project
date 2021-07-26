let User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'its a secret';

exports.register_user = async (req, res) => {
  try {
    const { username, password: inputVal } = req.body;
    if (!username || typeof username !== 'string' || username.length < 5) {
      return res.status(400).json({
        status: 'error',
        error: 'Invalid username',
      });
    }
    if (!inputVal || typeof inputVal !== 'string' || inputVal.length < 5) {
      return res.status(400).json({
        status: 'error',
        error: 'Invalid password',
      });
    }
    const password = await bcrypt.hash(inputVal, 10);
    await User.create({
      username: username,
      password: password,
    });

    return res.json({ status: 'OK', username: username });
  } catch {
    res.status(400).json({ status: 'error', error: 'Cant register the user general error' });
  }
};

exports.login_user = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username }).lean();
    if (!user) {
      return res
        .status(400)
        .json({ status: 'error', error: 'Invalid username/password' });
    }

    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        {
          id: user._id,
          username: user.username,
        },
        JWT_SECRET
      );

      return res.json({ status: 'OK', data: token, username: username });
    }

    res
      .status(400)
      .json({ status: 'error', error: 'Invalid username/password' });
  } catch {
    res.status(400).json({ status: 'error', error: 'Cant login the user general error' });
  }
};
