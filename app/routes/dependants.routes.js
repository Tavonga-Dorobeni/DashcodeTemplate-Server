module.exports = app => {
    const dependants = require("../controllers/dependants.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Dependant
    router.post("/", dependants.create);
  
    // Retrieve all Dependants
    router.get("/", dependants.findAll);
  
    // Retrieve a single Dependant with id
    router.get("/:id", dependants.findOne);
  
    // Update a Dependant with id
    router.put("/:id", dependants.update);
  
    // Delete a Dependant with id
    router.delete("/:id", dependants.delete);
  
    // Delete all Dependants
    router.delete("/", dependants.deleteAll);
  
    app.use('/api/dependants', router);
  };
  