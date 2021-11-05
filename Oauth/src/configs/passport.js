const GoogleStrategy = require("passport-google-oauth2").Strategy;
const Google_api_id = "924433487602-rfi5rv6lnnplpeg80qduodj0ab9fnn1n.apps.googleusercontent.com";

const Google_api_key = "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";

const User = require("../models/userModel");
const passport = require("passport");


passport.use(
     new GoogleStrategy(
          {
               clientID: Google_api_id,
               clientSecret: Google_api_key,
               callbackURL: "http://localhost:3333/Auth/google/callback",
               passReqToCallback: true,
          },

          async function(request, accessToken, refreshToken, profile, done) {
               console.log("accessToken, refreshToken, profile ", accessToken, refreshToken, profile);
               try {
                    var user = await User.findOne({email: profile?._json?.email}).lean().exec();
                    if (!user) {
                         user = await User.create({
                              email: profile?._json?.email,
                              password: "randomstringhere"//hashed
                         });
                    }
                    return done(null, "user");
               } catch (err) {
                    console.log("inside err");
                    return done(null, err);
               }
          }
     )
);

module.exports = passport;
