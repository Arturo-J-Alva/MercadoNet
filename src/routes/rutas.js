const express = require("express");
const router = express.Router();
const pool = require("../database");


router.get("/", (req, res) => {
    res.render("index.hbs");
});

router.get("/allproducts", async(req, res) => {
    const productos = await pool.query("SELECT * FROM productos");
    //const { empresa } = await pool.query("SELECT * FROM empresas WHERE id = ?", [emp_id]);
    //console.log(productos[0]);
    const emp_id = {};
    const NombEmpr = {};
    const NuevaTabla = {}; // esta solución implica muchas lineas de código por ende más tiempo, debe haber una mejor solución
    const id = {};
    for (var i = 0; i < productos.length; i++) {
        emp_id[i] = productos[i].emp_id;
        id[i] = productos[i].id;
        const empresas = await pool.query("SELECT * FROM empresas WHERE id = ?", [emp_id[i]]);
        NombEmpr[i] = empresas[0].empresa;

        const fila = await pool.query("SELECT * FROM productos WHERE id = ?", [id[i]]);
        const { productname, price, description, created_at } = fila[0];
        NuevaTabla[i] = {
            productname, //es lo mismo que title:title, igual con url y description
            price,
            description,
            empresa: NombEmpr[i],
            created_at
        };
    }
    //solución con NuevaTabla


    console.log(NuevaTabla);
    //console.log(empresas[0].empresa);
    // const fila = await pool.query("SELECT * FROM productos WHERE id = ?", 2);
    // const { productname } = fila[0];
    // console.log(productname);
    // console.log(id);
    res.render("allproducts.hbs", { NuevaTabla });
});
module.exports = router;