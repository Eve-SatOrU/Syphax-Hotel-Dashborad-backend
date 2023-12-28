// here admin conroller 
const User = require('../models/user');
const Admin = require('../models/admin');
const bcrypt = require('bcrypt');
//register admin and login
exports.getAdminRegistration = (req, res, next) => {
    // json
    res.json({ message: 'Render Register form' });
};

exports.postAdminRegistration = async (req, res, next) => {
  const { userName, userPassword } = req.body;
  try {
    const existingAdmin = await Admin.findOne();
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already registered' });
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(userPassword, salt);

    const admin = await Admin.create({
      userName,
      userPassword: hashedPassword
    });

    res.status(200).json({"success": admin});
  } catch (error) {
    console.log(error);
  }
};
//admin login
exports.getLogin = (req, res, next) => {
    res.json({ message: 'Render Login form' });
  };
exports.postLogin= (async (req, res) => {
  const { userName, userPassword } = req.body;
  const admin = await Admin.findOne({ where: { userName } });
  if (!admin) {
    return res.status(500).send('Something broke!');
  }
  const isPasswordValid = await bcrypt.compare(userPassword, admin.userPassword);
  if (!isPasswordValid) {
    return res.status(500).send('your password wrong try again!');
  }
  else{
    req.session.admin = admin;
    req.session.id = admin.id; 
    res.json({success: admin});
      }
});
  //logout
  exports.postLogout=async(req, res) => {
    req.session.destroy();
    res.json(req.session);
}; 

//Dashboard
  exports.getDashboard = async (req, res, next) => {
    try {

      // const admin = req.session.admin;
      // if (req.session.admin) {
        const users = await User.findAll();
        res.json({success: users});

      // } else {
      //   // json
      //   res.json({ message: 'You are not logged in' });
      // }
    } catch (error) {
      console.error(error);
      res.json({message: 'Something went wrong'});
    }
  };
  //delete user
  exports.deleteUser = (req, res, next) => {
    const id = req.params.id;
    console.log("User ID: ", id);
    // if (!req.session.admin) {
    //     // json
    //     return res.json({ message: 'You are not logged in' });
    // }
  
    User.destroy({
      where: {
        id: id,
      }
    })
    .then(() => {
      if (req.session.user && req.session.user.id === id) {
        req.session.destroy((err) => {
          if (err) {
            console.log(err);
          }
          res.json({ message: 'User deleted successfully' });

        });
      } else {
        res.json({ message: 'User deleted successfully' })
        
      }
    })
    .catch(err => console.log(err));
  };
  
