module.exports = app => {
  const procedures = require("../controllers/procedures.controller.js");

  var router = require("express").Router();

  // Create a new Procedure
  router.post("/", procedures.create);

  // Retrieve all Procedures
  router.get("/", procedures.findAll);

  // Retrieve a single Procedure with id
  router.get("/:id", procedures.findOne);

  // Update a Procedure with id
  router.put("/:id", procedures.update);

  // Delete a Procedure with id
  router.delete("/:id", procedures.delete);

  // Delete all Procedures
  router.delete("/", procedures.deleteAll);

  app.use('/api/procedures', router);
};
