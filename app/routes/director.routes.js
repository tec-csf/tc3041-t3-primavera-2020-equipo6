module.exports = app => {
  const directors = require("../controllers/director.controller.js");

  var router = require("express").Router();

  // Create a new Director
  router.post("/", directors.create);

  // Retrieve all directors
  router.get("/", directors.findAll);

  // Retrieve a single Director with id
  router.get("/:id", directors.findOne);

  // Update a Director with id
  router.put("/:id", directors.update);

  // Delete a Director with id
  router.delete("/:id", directors.delete);

  // Delete every Director
  router.delete("/", directors.deleteAll);

  app.use('/api/directors', router);
};