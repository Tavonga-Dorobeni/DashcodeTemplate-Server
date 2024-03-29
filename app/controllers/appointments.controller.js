const db = require("../models");
const Appointment = db.appointment;
const Op = db.Sequelize.Op;

// Create and Save a new Appointment
exports.create = (req, res) => {
  // Create a Appointment
  Appointment.create(req.body)
    .then((data) => {
      res.send({
        appointment: data,
        message: "Appointment posted successfully",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Appointment.",
      });
      console.log(err)
    });
};

// Retrieve all Appointments from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Appointment.findAll({
  where: condition,
  include: [
    {
      all: true,
      nested: true
    }
  ],
  raw: false
})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving applications.",
      });
    });
};

// Find a single Appointment with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Appointment.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Appointment with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error while retrieving Appointment",
      });
      console.log(">> Error while retrieving Appointment: ", err);
    });
};

// Update a Appointment by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Appointment.update(req.body, {
    where: { AppointmentID: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Appointment was updated successfully.",
        });
      } else {
        res.send({
          message: `Appointment was not found!`,
        });
      }
    })
    .catch(db.Sequelize.UniqueConstraintError, (err) => {
      res.status(500).send({
        message: `Duplication Error Occured. "${err.errors[0].value}" already exists!!`,
      });
      console.log(">> Duplication Error occured: ", err);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error while updating Appointment",
      });
      console.log(">> Error while updating Appointment: ", err);
    });
};

// Delete a Appointment with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Appointment.destroy({
    where: { AppointmentID: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Appointment was deleted successfully!",
        });
      } else {
        res.send({
          message: `Appointment was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Appointment",
      });
      console.log(">> Error while deleting Appointment: ", err);
    });
};

// Delete all Appointments from the database.
exports.deleteAll = (req, res) => {
  Appointment.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Appointments were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: "An error occurred while deleting all applications.",
      });
      console.log(">> Error while deleting all Appointments: ", err);
    });
};
