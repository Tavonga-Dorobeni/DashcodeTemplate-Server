module.exports = (sequelize, Sequelize) => {
    const Procedures = sequelize.define("procedures", {
      ProcedureID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      Name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Price: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });
  
    return Procedures;
  };
  