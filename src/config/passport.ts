import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
import dotenv from "dotenv";
import User from "../user/user.model";

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const firstname = profile.name?.givenName || "";
        const lastname = profile.name?.familyName || "";
        const email = profile.emails?.[0]?.value || "";

        let user = await User.findOne({ email });

        if (!user) {
          user = new User({
            googleId: profile.id,
            firstname,
            lastname,
            email,
            password: "",
            emailVerified: true,
          });

          await user.save();
        }

        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL!,
      profileFields: ["id", "displayName", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const fullName = profile.displayName || "";
        const [firstname, lastname] = fullName.split(" ");
        const email = profile.emails?.[0]?.value || "";

        let user = await User.findOne({ email });

        if (!user) {
          user = new User({
            googleId: profile.id,
            firstname,
            lastname,
            email,
            passport: "",
            emailVerified: true
          })

          await user.save()
        }

        return done(null, user)
      } catch (error) {
        return done(error, false);
      }
    }
  )
);
