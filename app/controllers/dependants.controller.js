const db = require("../models");
const Dependant = db.dependant;
const Op = db.Sequelize.Op;

// Create and Save a new Dependant
exports.create = (req, res) => {
  // Create a Dependant
  Dependant.create(req.body)
    .then((data) => {
      res.send({
        dependant: data,
        message: "Dependant posted successfully",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Dependant.",
      });
      console.log(err)
    });
};

// Retrieve all Dependants from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Dependant.findAll({
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

// Find a single Dependant with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Dependant.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Dependant with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error while retrieving Dependant",
      });
      console.log(">> Error while retrieving Dependant: ", err);
    });
};

// Update a Dependant by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Dependant.update(req.body, {
    where: { DependantID: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Dependant was updated successfully.",
        });
      } else {
        res.send({
          message: `Dependant was not found!`,
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
        message: "Error while updating Dependant",
      });
      console.log(">> Error while updating Dependant: ", err);
    });
};

// Delete a Dependant with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Dependant.destroy({
    where: { DependantID: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Dependant was deleted successfully!",
        });
      } else {
        res.send({
          message: `Dependant was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Dependant",
      });
      console.log(">> Error while deleting Dependant: ", err);
    });
};

// Delete all Dependants from the database.
exports.deleteAll = (req, res) => {
  Dependant.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Dependants were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: "An error occurred while deleting all applications.",
      });
      console.log(">> Error while deleting all Dependants: ", err);
    });
};
