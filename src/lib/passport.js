const passport = require("passport");
const localStrategy = require("passport-local");
const pool = require("../database");
const helpers = require("../lib/helpers");

// CODIGO SIGNUP
passport.use("local.signup", new localStrategy({
    usernameField: "empresa",
    passwordField: "password",
    passReqToCallback: true
}, async(req, empresa, password, done) => {
    console.log(req.body);
    const { fullname } = req.body;
    const newUser = {
        empresa, //username:username
        password,
        fullname
    };

    newUser.password = await helpers.encryptPassword(password); //ecriptamiento del password

    const result = await pool.query("INSERT INTO empresas SET ?", [newUser]);
    //console.log(result);
    newUser.id = result.insertId;
    return done(null, newUser); //retorna un null como error (no hay error), y el newUser
}));

passport.serializeUser((empresa, done) => {
    done(null, empresa.id); //Cuando serializo esta guardando el id del usuario
});

passport.deserializeUser(async(id, done) => { //Al deserializar, tomo el Id almacenado para volver a obtener los datos
    const rows = await pool.query("SELECT * FROM empresas WHERE id = ?", [id]);
    done(null, rows[0]);
}); //si todo se ejecuta correctamente, me direcciona a /profile

// CODIGO LOGIN (SIGNIN)
passport.use("local.signin", new localStrategy({
    usernameField: "empresa",
    passwordField: "password",
    passReqToCallback: true //aca no se guarda nada, pero por si se necesita guardar algun dato (req) se pone true.
}, async(req, empresa, password, done) => {
    console.log(req.body);
    const rows = await pool.query("SELECT * FROM empresas WHERE empresa = ?", [empresa]);
    if (rows.length > 0) {
        const empresa = rows[0]; //de aca venia el "user"
        //codigo para validar la contraseña...
        const validPassword = await helpers.matchPassword(password, empresa.password);
        if (validPassword) {
            done(null, empresa, req.flash("success", "Bienvenido" + empresa.empresa));
        } else {
            done(null, false, req.flash("message", "Contraseña incorrecta"));
        }
    } else {
        return done(null, false, req.flash("message", "El nombre de empresa no existe"));
    }

}));