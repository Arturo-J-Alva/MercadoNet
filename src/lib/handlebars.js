const { format } = require("timeago.js"); //importando el metodo format de timeago.js


const helpers = {}; //objeto "helpers"

helpers.timeago = (timestamp) => { //metodo "timeago" del objeto helpers, recibe "timestamp" de la vista
    //console.log(timestamp); //timestamp es la hora y fecha de creacion del contenido
    return format(timestamp); // format indica cuanto tiempo ha pasado respecto al dato(fecha) timestamp
};

module.exports = helpers;