const express = require("express");
const router = express.Router();
const oAuthController = require("../controller/google-auth-controller");
const { isLoggedIn } = require("../middleware/auth.js");

router.get("/", oAuthController.signIn);
router.get("/auth/google", oAuthController.googleAuth);
router.get("/auth/google/callback", oAuthController.googleAuthCallback);

router.get("/success", isLoggedIn, oAuthController.oAuthSuccess);
router.get("/error", oAuthController.oAuthError);
router.get("/logout", oAuthController.logOut);

module.exports = router;
