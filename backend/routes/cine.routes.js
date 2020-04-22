module.exports = app => {
  const cines = require("../controllers/cine.controller.js");

  var router = require("express").Router();

  // Create a new Cine
  router.post("/", cines.create);

  // Retrieve all cines
  router.get("/", cines.findAll);

  // Retrieve a single Cine with id
  router.get("/:id", cines.findOne);

  // Update a Cine with id
  router.put("/:id", cines.update);

  // Delete a Cine with id
  router.delete("/:id", cines.delete);

  // Delete every Cine
  router.delete("/", cines.deleteAll);

  app.use('/api/cines', router);
};