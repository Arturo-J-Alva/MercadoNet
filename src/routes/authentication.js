const express = require("express");
const router = express.Router();
const passport = require("passport");
const { SiLogueado, NoLogueado } = require("../lib/auth");

router.get("/signup", NoLogueado, (req, res) => {
    res.render("auth/signup.hbs");
});

router.post("/signup", NoLogueado, passport.authenticate("local.signup", {
    successRedirect: "/profile",
    failureRedirect: "/signup",
    failureFlash: true
}));

router.get("/signin", NoLogueado, (req, res) => {
    res.render("auth/signin.hbs");
});


router.post("/signin", NoLogueado, (req, res, next) => { //esta funcion cumple lo mismo que es equivalente a post("/signup"...
    passport.authenticate("local.signin", { //Pero se pone así para poder validar después
        successRedirect: "/profile",
        failureRedirect: "/signin",
        failureFlash: true
    })(req, res, next)
});

router.get("/profile", SiLogueado, (req, res) => { //isLogedIn:metodo exportado de auth.js que deja seguir el codigo solo si un usuario se ha logeado
    res.render("profile.hbs");
});

router.get("/logout", SiLogueado, (req, res) => {
    req.logOut();
    res.redirect("/signin");
});


module.exports = router;