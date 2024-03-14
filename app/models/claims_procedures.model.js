module.exports = (sequelize, Sequelize) => {
    const ClaimProcedures = sequelize.define("claim_procedures", {
      ClaimProceduresID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      ClaimID: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      ProcedureID: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });
  
    return ClaimProcedures;
  };
  