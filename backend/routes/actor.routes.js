module.exports = app => {
  const actors = require("../controllers/actor.controller.js");

  var router = require("express").Router();

  // Create a new Actor
  router.post("/", actors.create);

  // Retrieve all actors
  router.get("/", actors.findAll);

  // Retrieve a single Actor with id
  router.get("/:id", actors.findOne);

  // Update a Actor with id
  router.put("/:id", actors.update);

  // Delete a Actor with id
  router.delete("/:id", actors.delete);

  // Delete every Actor
  router.delete("/", actors.deleteAll);

  app.use('/api/actors', router);
};