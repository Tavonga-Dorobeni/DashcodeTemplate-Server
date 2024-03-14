module.exports = (sequelize, Sequelize) => {
    const Claims = sequelize.define("claims", {
      ClaimID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      PatientID: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      Notes: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
  
    return Claims;
  };
  