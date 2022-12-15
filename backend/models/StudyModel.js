import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Study= db.define(
  "studies",
  {
    study_code: DataTypes.STRING,
    study_name: DataTypes.STRING,
    short_desc: DataTypes.STRING,
    therapeutic_area: DataTypes.STRING,
    plansubject: DataTypes.STRING,
    actualsubject: DataTypes.STRING,
    status: DataTypes.STRING,
    start_date: DataTypes.STRING,
    enrol_rate: DataTypes.STRING,
    risk_score: DataTypes.STRING,
    
  },
  {
    freezeTableName: true,
  }
);

export default Study;

(async () => {
  await db.sync();
})();
