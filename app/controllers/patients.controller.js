const db = require("../models");
const Patient = db.patient;
const Op = db.Sequelize.Op;

// Create and Save a new Patient
exports.create = (req, res) => {
  // Create a Patient
  Patient.create(req.body)
    .then((data) => {
      res.send({
        patient: data,
        message: "Patient posted successfully",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Patient.",
      });
      console.log(err)
    });
};

// Retrieve all Patients from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Patient.findAll({
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

// Find a single Patient with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Patient.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Patient with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error while retrieving Patient",
      });
      console.log(">> Error while retrieving Patient: ", err);
    });
};

// Update a Patient by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Patient.update(req.body, {
    where: { PatientID: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Patient was updated successfully.",
        });
      } else {
        res.send({
          message: `Patient was not found!`,
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
        message: "Error while updating Patient",
      });
      console.log(">> Error while updating Patient: ", err);
    });
};

// Delete a Patient with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Patient.destroy({
    where: { PatientID: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Patient was deleted successfully!",
        });
      } else {
        res.send({
          message: `Patient was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Patient",
      });
      console.log(">> Error while deleting Patient: ", err);
    });
};

// Delete all Patients from the database.
exports.deleteAll = (req, res) => {
  Patient.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Patients were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: "An error occurred while deleting all applications.",
      });
      console.log(">> Error while deleting all Patients: ", err);
    });
};
