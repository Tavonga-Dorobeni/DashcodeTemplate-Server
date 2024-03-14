module.exports = app => {
    const appointments = require("../controllers/appointments.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Appointment
    router.post("/", appointments.create);
  
    // Retrieve all Appointments
    router.get("/", appointments.findAll);
  
    // Retrieve a single Appointment with id
    router.get("/:id", appointments.findOne);
  
    // Update a Appointment with id
    router.put("/:id", appointments.update);
  
    // Delete a Appointment with id
    router.delete("/:id", appointments.delete);
  
    // Delete all Appointments
    router.delete("/", appointments.deleteAll);
  
    app.use('/api/appointments', router);
  };
  