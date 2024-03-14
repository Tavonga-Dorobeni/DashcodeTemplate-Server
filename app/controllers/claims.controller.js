const db = require("../models");
const Claim = db.claim;
const Op = db.Sequelize.Op;

// Create and Save a new Claim
exports.create = (req, res) => {
  // Create a Claim
  Claim.create(req.body)
    .then((data) => {
      res.send({
        claim: data,
        message: "Claim posted successfully",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Claim.",
      });
      console.log(err)
    });
};

// Retrieve all Claims from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Claim.findAll({
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

// Find a single Claim with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Claim.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Claim with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error while retrieving Claim",
      });
      console.log(">> Error while retrieving Claim: ", err);
    });
};

// Update a Claim by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Claim.update(req.body, {
    where: { ClaimID: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Claim was updated successfully.",
        });
      } else {
        res.send({
          message: `Claim was not found!`,
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
        message: "Error while updating Claim",
      });
      console.log(">> Error while updating Claim: ", err);
    });
};

// Delete a Claim with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Claim.destroy({
    where: { ClaimID: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Claim was deleted successfully!",
        });
      } else {
        res.send({
          message: `Claim was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Claim",
      });
      console.log(">> Error while deleting Claim: ", err);
    });
};

// Delete all Claims from the database.
exports.deleteAll = (req, res) => {
  Claim.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Claims were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: "An error occurred while deleting all applications.",
      });
      console.log(">> Error while deleting all Claims: ", err);
    });
};
