module.exports = app => {
  const aggregates = require("../controllers/aggregate.controller.js");

  var router = require("express").Router();

  // Retrieve friends' social network
  router.get("/social", aggregates.socialNetwork);

  // Retrieve
  router.get("/facet", aggregates.facet);

  // Retrieve 
  router.get("/nation", aggregates.nation);

  // 
  router.get("/actor/:nombre", aggregates.moviesByActor);

  // Delete a Cine with id
  router.get("/geo/:ubicacion", aggregates.location);

  app.use('/api/aggregates', router);
};