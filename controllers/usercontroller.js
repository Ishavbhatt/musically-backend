var User = require("../models/User");

var jwt = require("jsonwebtoken");

module.exports = {
  // User Sign up
  Usersignup: (req, res) => {
    User.create(req.body, (err, user) => {
      if (err) return res.json({ err });
      res.json({ Success: true, message: "Signup Successfully", user });
    });
  },

  // User Sign in
  Usersignin: (req, res) => {
    let { password, email } = req.body;
    User.findOne({ email }, (err, user) => {
      if (err) res.json({ err });
      if (!user) return res.json("Enter Valid Email");
      if (!user.verifyPassword(password)) {
        res.json("Incorrect Password");
      }
      jwt.sign(
        { username: user.username, userId: user._id, email: user.email },
        "thisissecret",
        (err, token) => {
          if (err)
            return res.json({ Success: false, Message: "Token not generated" });
          res.json({ token, Success: true, user });
        }
      );
    });
  },

  //   Get Single User
  getSingleuser: (req, res) => {
    User.findById(req.user.userId, "-password", (err, singleuser) => {
      if ({ err }) return res.json({ err });
      res.json({ Success: true, singleuser });
    });
  },
};
