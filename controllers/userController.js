const bcrypt = require('bcrypt');
const session = require('express-session');
const { Op } = require('sequelize');
const User = require('../models/user');



// lesssssssssssss go 
exports.getindex = async (req, res, next) => {
  const user = req.session.user;
  res.json({ user });
};

User.beforeCreate(async (user) => {
  const salt = await bcrypt.genSalt();
  user.userPassword = await bcrypt.hash(user.userPassword, salt);
});


function validateStrongPassword(password) {
  if (password.length < 8) {
    return false;
  }
  const letterRegex = /[a-zA-Z]/;
  const numberRegex = /[0-9]/;
  const specialCharRegex = /[!@#$%^&*]/;
  if (!letterRegex.test(password) || !numberRegex.test(password) || !specialCharRegex.test(password)) {
    return false;
  }
  return true;
}

exports.getRegister = (req, res, next) => {
  res.json({ message: 'Render Register form' });
};

exports.postRegister = async (req, res, next) => {
  const { userName, userPassword, email, picture, birthday, userStatus } = req.body;

  // Validate password strength
  if (!validateStrongPassword(userPassword)) {
    return res.status(400).json({
      message: "Password must be at least 8 characters long and must contain a combination of letters, numbers, and special characters."
    });
  }

  try {
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [
          { userName },
          { email }
        ]
      }
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Username or email is already taken.' });
    }

    const hashedPassword = await bcrypt.hash(userPassword, 10);

    const user = await User.create({
      userName,
      userPassword: hashedPassword,
      email,
      picture,
      birthday,
      status: userStatus 
    });

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getLogin = (req, res, next) => {
  res.json({ message: 'Render Login form' });
};

exports.postLogin = async (req, res) => {
  const { userName, userPassword } = req.body;
  try {
    const user = await User.findOne({ where: { userName } });
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }
    const isPasswordValid = await bcrypt.compare(userPassword, user.userPassword);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Incorrect password' });
    }
    req.session.user = user;
    req.session.userId = user.id;
    res.status(200).json({ message: 'User logged in successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.postLogout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Logout failed' });
    }
    res.clearCookie('sid');
    return res.status(200).json({ message: 'Logout successful' });
  });
};


// this json soooo  boring :"))))

