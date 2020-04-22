module.exports = app => {
  const salas = require("../controllers/sala.controller.js");

  var router = require("express").Router();

  // Create a new Sala
  router.post("/", salas.create);

  // Retrieve all salas
  router.get("/", salas.findAll);

  // Retrieve a single Sala with id
  router.get("/:id", salas.findOne);

  // Update a Sala with id
  router.put("/:id", salas.update);

  // Delete a Sala with id
  router.delete("/:id", salas.delete);

  // Delete every Sala
  router.delete("/", salas.deleteAll);

  app.use('/api/salas', router);
};