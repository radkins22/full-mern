const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user.model");

module.exports = (passport) => {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      User.findOne({ email })
        .then((user) => {
          if (!user)
            return done(null, false, {
              message: "That email is not registered",
            });
          if (!bcrypt.compareSync(password, user.password))
            return done(null, false, { message: "Password incorrect" });
          const { _id, email, username } = user;
          return done(null, { _id, email, username });
        })
        .catch((err) => {
          return done(null, err);
        });
    })
  );
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .then((user) => {
        const { _id, email, username } = user;
        return done(null, { _id, email, username });
      })
      .catch((err) => console.log(err));
  });
};
