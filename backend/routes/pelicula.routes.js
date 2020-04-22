module.exports = app => {
  const peliculas = require("../controllers/pelicula.controller.js");

  var router = require("express").Router();

  // Create a new Pelicula
  router.post("/", peliculas.create);

  // Retrieve all peliculas
  router.get("/", peliculas.findAll);

  // Retrieve a single Pelicula with id
  router.get("/:id", peliculas.findOne);

  // Update a Pelicula with id
  router.put("/:id", peliculas.update);

  // Delete a Pelicula with id
  router.delete("/:id", peliculas.delete);

  // Delete every Pelicula
  router.delete("/", peliculas.deleteAll);

  app.use('/api/peliculas', router);
};