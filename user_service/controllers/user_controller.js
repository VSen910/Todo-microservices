const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/user_model');

exports.register = async (req, res, next) => {
  try {
    const { email, name, password } = req.body;
    const user = await User.create({
      email,
      password,
    });
    const token = jwt.sign({ email }, process.env.JWT_SECRET);

    res.status(201).json({
      status: 'success',
      token,
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      status: 'fail',
      message: e.message,
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        status: 'fail',
        message: 'Incorrect credentials',
      });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET);

    res.status(200).json({
      status: 'success',
      token,
    });
  } catch (e) {
    res.status(400).json({
      status: 'fail',
      message: e.message,
    });
  }
};
