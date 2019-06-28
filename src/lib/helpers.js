const bcrypt = require("bcryptjs");
const helpers = {};

helpers.encryptPassword = async(password) => {
    const salt = await bcrypt.genSalt(10); //se ejecuta 10 veces el algoritmo del cifrado, más veces más seguro
    const passwCifrado = await bcrypt.hash(password, salt);
    return passwCifrado;
};

helpers.matchPassword = async(password, savePassword) => { //Para comparar la contraseña digitada en la vista con la contraseña cifrada de un usuario al logearse, luego de crearse una cuenta
    try {
        return await bcrypt.compare(password, savePassword);
    } catch (e) {
        console.log(e);
    }
};


module.exports = helpers;