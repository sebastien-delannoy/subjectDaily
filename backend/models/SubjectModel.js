import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Subject= db.define(
  "subjects",
  {
    study_id: DataTypes.STRING,
    site_id: DataTypes.STRING,
    subject_number: DataTypes.STRING,
    subject_status: DataTypes.STRING,
    current_visit: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

export default Subject;

(async () => {
  await db.sync();
})();
