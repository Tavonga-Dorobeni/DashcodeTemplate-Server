const db = require("../models");
const Claim = db.claim;
const ClaimProcedure = db.claim_procedure;
const Op = db.Sequelize.Op;

// Create and Save a new Claim
exports.create = async (req, res) => {
  const t = await db.sequelize.transaction();

  try {
    await Claim.create(req.body, { transaction: t })

    const data = await Claim.findOne({
      where: {},
      order: [ [ 'createdAt', 'DESC' ]],
      transaction: t
    });

    for (let i = 0; i < req.body.procedures.length; i++) {
      await ClaimProcedure.create({
        ClaimID: data.ClaimID,
        ProcedureID: req.body.procedures[i].ProcedureID
      }, { transaction: t })
    }

    const claim = await Claim.findOne({
      where: {ClaimID: data.ClaimID},
      include: [
        {
          all: true,
          nested: true
        }
      ],
      raw: false,
      transaction: t
    })

    res.send({
      claim: claim,
      message: "Claim posted successfully",
    });    

    await t.commit();
  } catch (error) {
    res.status(500).send({
      message:
      error.message || "Some error occurred while creating the Claim.",
    });
    console.log(error)    
    await t.rollback();
  }
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
exports.update = async (req, res) => {
  const t = await db.sequelize.transaction();
  const id = req.params.id;

  try {
    await Claim.update(req.body, {
      where: { ClaimID: id },
      transaction: t
    })    

    await ClaimProcedure.destroy({
      where: {
        ClaimID: id
      },
      transaction: t
    })

    for (let i = 0; i < req.body.procedures.length; i++) {
      await ClaimProcedure.create({
        ClaimID: id,
        ProcedureID: req.body.procedures[i].ProcedureID
      }, { transaction: t })
    }

    res.send({message: "Claim was updated successfully.",});
    await t.commit();
  } catch (error) {
    res.status(500).send({
      message: "Error while updating Claim",
    });
    console.log(">> Error while updating Claim: ", error);
    await t.rollback();
  }
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
