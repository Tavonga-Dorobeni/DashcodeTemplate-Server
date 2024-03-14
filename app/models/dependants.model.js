module.exports = (sequelize, Sequelize) => {
    const Dependants = sequelize.define("dependant", {
      DependantID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      PatientID: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      FirstNames: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Surname: {
        type: Sequelize.STRING,
        allowNull: false
      },
      DOB: {
        type: Sequelize.DATE,
        allowNull: true
      },
      Relationship: {
        type: Sequelize.STRING,
        allowNull: true
      },
      Gender: {
        type: Sequelize.STRING,
        allowNull: true
      },
      IDNumber: {
        type: Sequelize.DATE,
        allowNull: true
      },
      Diabetes: {
        type: Sequelize.INTEGER(1),
        allowNull: false,
        defaultValue: 0
      },
      Hypertension: {
        type: Sequelize.INTEGER(1),
        allowNull: false,
        defaultValue: 0
      },
      Arthritis: {
        type: Sequelize.INTEGER(1),
        allowNull: false,
        defaultValue: 0
      },
      Asthma: {
        type: Sequelize.INTEGER(1),
        allowNull: false,
        defaultValue: 0
      },
      BoneProblems: {
        type: Sequelize.INTEGER(1),
        allowNull: false,
        defaultValue: 0
      },
      HeartProblems: {
        type: Sequelize.INTEGER(1),
        allowNull: false,
        defaultValue: 0
      },
      Cancer: {
        type: Sequelize.INTEGER(1),
        allowNull: false,
        defaultValue: 0
      },
      RenalOrKidneyDisease: {
        type: Sequelize.INTEGER(1),
        allowNull: false,
        defaultValue: 0
      },
      AbdominalProblems: {
        type: Sequelize.INTEGER(1),
        allowNull: false,
        defaultValue: 0
      },
      Orthodontics: {
        type: Sequelize.INTEGER(1),
        allowNull: false,
        defaultValue: 0
      }
    });
  
    return Dependants;
  };
  