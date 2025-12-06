// app_api/config/passport.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

const User = mongoose.model('User');

// Local strategy using email as the username field
passport.use(
  new LocalStrategy(
    { usernameField: 'email' },
    // async so we can use await with Mongoose 7
    async (username, password, done) => {
      try {
        // Mongoose 7: exec() returns a promise, no callback
        const user = await User.findOne({ email: username }).exec();

        // No user with that email
        if (!user) {
          return done(null, false, { message: 'Incorrect email.' });
        }

        // Wrong password
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }

        // Success
        return done(null, user);
      } catch (err) {
        // Database or other error
        return done(err);
      }
    }
  )
);

module.exports = passport;


