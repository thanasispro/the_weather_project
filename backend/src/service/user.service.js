let User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'its a secret';

export const registerUser = async (inputs, res) => {
  try {
    const { username, password: inputVal } = inputs;

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
    res.status(400).send('Cannot save user');
  }
};

export const loginUser = async (inputs, res) => {
  try {
    const { username, password } = inputs;
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
    res.status(400).send('Cannot save user');
  }
};
