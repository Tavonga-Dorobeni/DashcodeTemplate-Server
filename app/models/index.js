const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.appointment = require("./appointments.model.js")(sequelize, Sequelize);
db.claim_procedure = require("./claims_procedures.model.js")(sequelize, Sequelize);
db.claim = require("./claims.model.js")(sequelize, Sequelize);
db.dependant = require("./dependants.model.js")(sequelize, Sequelize);
db.medical_history = require("./medical_history.model.js")(sequelize, Sequelize);
db.patient = require("./patients.model.js")(sequelize, Sequelize);
db.procedure = require("./procedures.model.js")(sequelize, Sequelize);
db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId",
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId",
});

db.dependant.belongsToMany(db.patient, {
  through: "dependants",
  foreignKey: "PatientID",
  otherKey: "DependantID",
});

db.claim.hasMany(db.claim_procedure, {
  as: "procedures",
  foreignKey: "ClaimID",
}, {foreignKeyConstraint: true});

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
