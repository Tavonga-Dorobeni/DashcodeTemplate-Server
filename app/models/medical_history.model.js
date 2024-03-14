module.exports = (sequelize, Sequelize) => {
    const MedicalHistory = sequelize.define("medical_history", {
      HistoryID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      PatientID: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      Diabetes: {
        type: Sequelize.INTEGER(1),
        allowNull: false
      },
      Hypertension: {
        type: Sequelize.INTEGER(1),
        allowNull: false
      },
      Arthritis: {
        type: Sequelize.INTEGER(1),
        allowNull: false
      },
      Asthma: {
        type: Sequelize.INTEGER(1),
        allowNull: false
      },
      BoneProblems: {
        type: Sequelize.INTEGER(1),
        allowNull: false
      },
      HeartProblems: {
        type: Sequelize.INTEGER(1),
        allowNull: false
      },
      Cancer: {
        type: Sequelize.INTEGER(1),
        allowNull: false
      },
      RenalOrKidneyDisease: {
        type: Sequelize.INTEGER(1),
        allowNull: false
      },
      AbdominalProblems: {
        type: Sequelize.INTEGER(1),
        allowNull: false
      },
      Orthodontics: {
        type: Sequelize.INTEGER(1),
        allowNull: false
      },
    });
  
    return MedicalHistory;
  };
  