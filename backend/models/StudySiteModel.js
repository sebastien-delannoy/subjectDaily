import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const StudySite = db.define(
  "studysites",
  {
    study_id: DataTypes.STRING,
    country: DataTypes.STRING,
    site_reference: DataTypes.STRING,
    centre: DataTypes.STRING,
    principalinvest: DataTypes.STRING,
    plamenroll: DataTypes.STRING,
    actualenroll: DataTypes.STRING,
    status: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

export default StudySite;

(async () => {
  await db.sync();
})();
