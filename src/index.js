const express = require("express");
const morgan = require("morgan");
const exphbs = require("express-handlebars");
const path = require("path");
const flash = require("connect-flash");
const session = require("express-session");
const mysqlstore = require("express-mysql-session");
const { database } = require("./keys");
const passport = require("passport");

//inicializaciones
const app = express();
require("./lib/passport");

//settings
app.set("port", process.env.PORT || 4000);
app.set("views", path.join(__dirname, "views"));
app.engine(".hbs", exphbs({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs", //usar extensión "hbs" en vez de "handlebars"(extension por defecto)
    helpers: require("./lib/handlebars")
}));
app.set("views engine", ".hbs");

//Middlewares
app.use(session({
    secret: "Mi primera session",
    resave: false,
    saveUninitialized: false,
    store: new mysqlstore(database)
}));
app.use(flash());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());


//global variables (para q puedan ser accedidas por cualquier vista)
app.use((req, res, next) => { //next:funcion para continuar con el resto del código
    app.locals.success = req.flash("success"); //el mensaje success ahora es disponilbe en todas las vistas
    app.locals.message = req.flash("message");
    app.locals.empresa = req.user; //req.user => "user" es parte del paquete npm
    next();
});


//rutas
app.use(require("./routes/rutas"));
app.use(require("./routes/authentication"));
app.use("/links", require("./routes/links")); //Significa que cuando se requiera "./routes/links" se debe de escribir el prefijo "/links" a traves de POST u otro metodo

//public
app.use(express.static(path.join(__dirname, "public")));

//Starting the server

app.listen(app.set("port"), () => {
    console.log("Server on port", app.set("port"));
});