module.exports = (sequelize, Sequelize) => {
    const Patients = sequelize.define("patients", {
      PatientID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      MembershipNo: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      Plan: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Firstnames: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Surname: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Gender: {
        type: Sequelize.STRING,
        allowNull: false
      },
      MaritalStatus: {
        type: Sequelize.STRING,
        allowNull: false
      },
      IDNumber: {
        type: Sequelize.STRING,
        allowNull: false
      },
      DOB: {
        type: Sequelize.DATE,
        allowNull: false
      },
      Email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      PostalAddress: {
        type: Sequelize.STRING,
        allowNull: false
      },
      PhysicalAddress: {
        type: Sequelize.STRING,
        allowNull: false
      },
      CellNumber: {
        type: Sequelize.STRING,
        allowNull: false
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
  
    return Patients;
  };
  