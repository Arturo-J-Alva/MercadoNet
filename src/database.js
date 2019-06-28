const mysql = require("mysql");
const { database } = require("./keys");
const { promisify } = require("util"); //Convierte codigo de callback a codigo de promesas

const pool = mysql.createPool(database); //similar al mysl.connection
pool.getConnection((error, conn) => {
    if (error) {
        if (error.code == "PROTOCOL_CONNECTION_LOST")
            console.error("La conexion de la base de datos fue cerrada");

        if (error.code == "ER_CON_COUNT_ERROR")
            console.error("La base de datos tiene muchas conexiones");

        if (error.code == "ECONNREFUSED")
            console.error("La base de datos tiene muchas conexiones");
    }

    if (conn) conn.release(); //Empieza la conexión
    console.log("Db is connected");
    return

});
//por defecto mysql solo ejecuta callback, pero es mas facil hacerlo con promesas    
pool.query = promisify(pool.query); //Recibe el metodo query (consulta a BD) del modulo pool para poder hace promesas

module.exports = pool;