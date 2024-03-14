module.exports = app => {
    const claims = require("../controllers/claims.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Claim
    router.post("/", claims.create);
  
    // Retrieve all Claims
    router.get("/", claims.findAll);
  
    // Retrieve a single Claim with id
    router.get("/:id", claims.findOne);
  
    // Update a Claim with id
    router.put("/:id", claims.update);
  
    // Delete a Claim with id
    router.delete("/:id", claims.delete);
  
    // Delete all Claims
    router.delete("/", claims.deleteAll);
  
    app.use('/api/claims', router);
  };
  