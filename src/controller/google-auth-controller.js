const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
let user = null;

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL:
                "https://google-profile.herokuapp.com/auth/google/callback",
        },
        async (accessToken, refreshToken, profile, cb) => {
            user = profile;
            return cb(null, profile);
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

const googleAuth = passport.authenticate("google", {
    scope: ["email", "profile"],
});

const googleAuthCallback = passport.authenticate("google", {
    failureRedirect: "/error",
    successRedirect: "/success",
});

const signIn = async (req, res) => {
    return res.render("index.ejs");
};

const logOut = async (req, res) => {
    req.session.destroy();
    return res.redirect("/");
};

const oAuthSuccess = async (req, res) => {
    res.render("success.ejs", { user: user });
};

const oAuthError = async (req, res) => {
    res.render("error.ejs");
};

module.exports = {
    signIn,
    googleAuth,
    googleAuthCallback,
    oAuthSuccess,
    oAuthError,
    logOut,
};
