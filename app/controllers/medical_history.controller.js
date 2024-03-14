const db = require("../models");
const MedicalHistory = db.medical_history;
const Op = db.Sequelize.Op;

// Create and Save a new MedicalHistory
exports.create = (req, res) => {
  // Create a MedicalHistory
  MedicalHistory.create(req.body)
    .then((data) => {
      res.send({
        medical_history: data,
        message: "MedicalHistory posted successfully",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the MedicalHistory.",
      });
      console.log(err)
    });
};

// Retrieve all MedicalHistorys from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  MedicalHistory.findAll({
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

// Find a single MedicalHistory with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  MedicalHistory.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find MedicalHistory with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error while retrieving MedicalHistory",
      });
      console.log(">> Error while retrieving MedicalHistory: ", err);
    });
};

// Update a MedicalHistory by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  MedicalHistory.update(req.body, {
    where: { MedicalHistoryID: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "MedicalHistory was updated successfully.",
        });
      } else {
        res.send({
          message: `MedicalHistory was not found!`,
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
        message: "Error while updating MedicalHistory",
      });
      console.log(">> Error while updating MedicalHistory: ", err);
    });
};

// Delete a MedicalHistory with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  MedicalHistory.destroy({
    where: { MedicalHistoryID: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "MedicalHistory was deleted successfully!",
        });
      } else {
        res.send({
          message: `MedicalHistory was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete MedicalHistory",
      });
      console.log(">> Error while deleting MedicalHistory: ", err);
    });
};

// Delete all MedicalHistorys from the database.
exports.deleteAll = (req, res) => {
  MedicalHistory.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} MedicalHistorys were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: "An error occurred while deleting all applications.",
      });
      console.log(">> Error while deleting all MedicalHistorys: ", err);
    });
};
