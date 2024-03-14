module.exports = app => {
    const medical_history = require("../controllers/medical_history.controller.js");
  
    var router = require("express").Router();
  
    // Create a new MedicalHistory
    router.post("/", medical_history.create);
  
    // Retrieve all MedicalHistorys
    router.get("/", medical_history.findAll);
  
    // Retrieve a single MedicalHistory with id
    router.get("/:id", medical_history.findOne);
  
    // Update a MedicalHistory with id
    router.put("/:id", medical_history.update);
  
    // Delete a MedicalHistory with id
    router.delete("/:id", medical_history.delete);
  
    // Delete all MedicalHistorys
    router.delete("/", medical_history.deleteAll);
  
    app.use('/api/medical_history', router);
  };
  