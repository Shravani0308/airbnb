const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

// Signup Form Route
router.get("/signup", (req, res) => {
    res.render("users/signup.ejs");
});

// Signup Logic
router.post("/signup", wrapAsync(async (req, res, next) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        
        req.login(registeredUser, (err) => {
            if (err) return next(err);
            req.flash("success", "Welcome to Wanderlust!");
            res.redirect(req.session.redirectUrl);
        });
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
}));

// Login Form Route
router.get("/login", (req, res) => {
    res.render("users/login.ejs");
});

// Login Logic
router.post("/login",saveRedirectUrl, passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), (req, res) => {
    req.flash("success", "Welcome back to Wanderlust!");
    let redirectUrl=res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
});

// Logout Route
router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        req.flash("success", "You are logged out!");
        res.redirect("/listings");
    });
});

module.exports = router;
