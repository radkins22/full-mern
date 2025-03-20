const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const passport = require("passport");

module.exports = {
  register: (req, res) => {
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (user) {
          res.json({ msg: "Error", Error: "Email already exists." });
        } else {
          const hashedPassword = bcrypt.hashSync(req.body.password, 12);
          const newUser = new User({ ...req.body, password: hashedPassword });
          newUser.save();
          res.json({ msg: "Success", user: newUser });
        }
      })
      .catch((err) => res.json({ msg: "Error", Error: err }));
  },

  login: (req, res, next) => {
    passport.authenticate("local", (err, user) => {
      if (err) res.json({ msg: "Error", Error: err });

      if (!user) res.json({ msg: "Error", Error: "User not found" });
      else {
        req.login(user, (err) => {
          if (err) res.json({ msg: "Error", Error: err });
          res.json({ msg: "Success", user });
        });
      }
    })(req, res, next);
  },

  logout: (req, res) => {
    req.logout((err) => {
      if (err) res.json({ msg: "Error", Error: err });
      res.json({ msg: "Success", user: req.user });
    });
  },

  auth: (req, res) => {
    if (req.user) res.json({ msg: "Success", user: req.user });
    else res.json({ msg: "Error", Error: "User not authenticated" });
  },

  update: (req, res) => {
    User.findByIdAndUpdate(req.params._id, req.body)
      .save()
      .then((user) => res.json({ msg: "Success", user }))
      .catch((err) => res.json({ msg: "Error", Error: err }));
  },

  _delete: (req, res) => {
    User.find()
      .then((users) => res.json({ msg: "Success", users }))
      .catch((err) => res.json({ msg: "Error", Error: err }));
  },
};
