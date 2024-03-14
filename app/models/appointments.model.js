module.exports = (sequelize, Sequelize) => {
  const Appointments = sequelize.define("appointments", {
    AppointmentID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    PatientID: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    DateScheduled: {
      type: Sequelize.DATE,
      allowNull: false
    },
    AttendingDoctor: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    Notes: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });

  return Appointments;
};
