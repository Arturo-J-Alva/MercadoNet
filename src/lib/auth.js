module.exports = {
        SiLogueado(req, res, next) {
            if (req.isAuthenticated()) { //metodo de password: devuelve true si un usuario se ha logueado
                return next(); //next:continuar con el resto del codigo
            }
            return res.redirect("/signin"); //sino...que se loguee
        },
        NoLogueado(req, res, next) {
            if (!req.isAuthenticated()) { //si no está autenticado
                return next();
            }
            return res.redirect("/profile");
        }
    }
    // Este metodo es para que proteger los rutas de cada usuario