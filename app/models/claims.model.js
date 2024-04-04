module.exports = (sequelize, Sequelize) => {
    const Claims = sequelize.define("claims", {
      ClaimID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      AppointmentID: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      Notes: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Status: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      }
    });
  
    return Claims;
  };
  