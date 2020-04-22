module.exports = app => {
  const proyeccions = require("../controllers/proyeccion.controller.js");

  var router = require("express").Router();

  // Create a new Proyeccion
  router.post("/", proyeccions.create);

  // Retrieve all proyeccions
  router.get("/", proyeccions.findAll);

  // Retrieve a single Proyeccion with id
  router.get("/:id", proyeccions.findOne);

  // Update a Proyeccion with id
  router.put("/:id", proyeccions.update);

  // Delete a Proyeccion with id
  router.delete("/:id", proyeccions.delete);

  // Delete every Proyeccion
  router.delete("/", proyeccions.deleteAll);

  app.use('/api/proyeccions', router);
};