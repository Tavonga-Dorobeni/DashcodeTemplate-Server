const db = require("../models");
const Procedure = db.procedure;
const Op = db.Sequelize.Op;

// Create and Save a new Procedure
exports.create = (req, res) => {
  // Create a Procedure
  Procedure.create(req.body)
    .then((data) => {
      res.send({
        procedure: data,
        message: "Procedure posted successfully",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Procedure.",
      });
      console.log(err)
    });
};

// Retrieve all Procedures from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Procedure.findAll({
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

// Find a single Procedure with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Procedure.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Procedure with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error while retrieving Procedure",
      });
      console.log(">> Error while retrieving Procedure: ", err);
    });
};

// Update a Procedure by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Procedure.update(req.body, {
    where: { ProcedureID: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Procedure was updated successfully.",
        });
      } else {
        res.send({
          message: `Procedure was not found!`,
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
        message: "Error while updating Procedure",
      });
      console.log(">> Error while updating Procedure: ", err);
    });
};

// Delete a Procedure with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Procedure.destroy({
    where: { ProcedureID: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Procedure was deleted successfully!",
        });
      } else {
        res.send({
          message: `Procedure was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Procedure",
      });
      console.log(">> Error while deleting Procedure: ", err);
    });
};

// Delete all Procedures from the database.
exports.deleteAll = (req, res) => {
  Procedure.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Procedures were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: "An error occurred while deleting all applications.",
      });
      console.log(">> Error while deleting all Procedures: ", err);
    });
};
