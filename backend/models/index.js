const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.actors = require("./actor.model.js")(mongoose);
db.cines = require("./cine.model.js")(mongoose);
db.directors = require("./director.model.js")(mongoose);
db.peliculas = require("./pelicula.model.js")(mongoose);
db.proyeccions = require("./proyeccion.model.js")(mongoose);
db.salas = require("./sala.model.js")(mongoose);

module.exports = db;