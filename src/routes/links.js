const express = require("express");
const router = express.Router();
const pool = require("../database"); //Se requiere este modulo cuando se necesite conexion a BD
const { SiLogueado } = require("../lib/auth");

router.get("/add", SiLogueado, (req, res) => { // "/links/add"
    res.render("links/add.hbs");
});

router.post("/add", SiLogueado, async(req, res) => { // "/links/add"
    const { productname, price, description } = req.body;
    //console.log(req.body);

    const newproduct = { //nuevo objeto que copia los datos recibidos
        productname, //es lo mismo que title:title, igual con url y description
        price,
        description,
        emp_id: req.user.id
    };
    //console.log(newproduct);
    await pool.query("INSERT INTO productos set ?", [newproduct])

    req.flash("success", "Guardado satisfactoriamente"); //(nombre identificador, el mensaje)
    res.redirect("/links");
});

router.get("/", SiLogueado, async(req, res) => { //  "/links"
    //console.log(req.user);
    //console.log(req.user.id);
    const productos = await pool.query("SELECT * FROM productos WHERE emp_id = ?", [req.user.id]); //req.user:el el usurio(empresa) que inicio sesión
    console.log(productos);
    res.render("links/list.hbs", { productos });
});

router.get("/delete/:id", SiLogueado, async(req, res) => {
    const { id } = req.params;
    await pool.query("DELETE FROM productos WHERE ID = ?", [id]);
    req.flash("success", "Eliminado satisfactoriamente ");
    res.redirect("/links");
});

router.get("/edit/:id", SiLogueado, async(req, res) => {
    const { id } = req.params;
    const links = await pool.query("SELECT * FROM productos WHERE ID = ?", [id]);

    res.render("links/edit.hbs", { DatoEdit: links[0] });
    //console.log("---------------------");
    //console.log(links[0]);
});

router.post("/edit/:id", SiLogueado, async(req, res) => {
    const { id } = req.params;
    const DatosModif = req.body;
    await pool.query("UPDATE productos set ? WHERE id = ?", [DatosModif, id]);
    req.flash("success", "Editado satisfactoriamente ");
    res.redirect("/links");
});

module.exports = router;