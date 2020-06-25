var express = require("express");
var User = require("../models/User");
var userController = require("../controllers/usercontroller");
var jwt = require("jsonwebtoken");
var router = express.Router();

// /* GET users listing. */
// router.get("/", function (req, res, next) {
//   res.send("respond with a resource");
// });

// Signup
router.post("/", userController.Usersignup);

// SignIn
router.post("/login", userController.Usersignin);

// List of all users
router.get("/", (req, res, next) => {
  User.find({}, (err, users) => {
    if (err) return next(err);
    res.json({ users });
  });
});

module.exports = router;
