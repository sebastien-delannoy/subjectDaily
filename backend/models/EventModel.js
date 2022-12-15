import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Event= db.define(
  "events",
  {
    study_id: DataTypes.STRING,
    site_id: DataTypes.STRING,
    subject_id: DataTypes.STRING,
    event_category: DataTypes.STRING,
    event_desc: DataTypes.STRING,
    event_res: DataTypes.STRING,
    event_critic: DataTypes.STRING,
    event_closed: DataTypes.STRING,
  
  },
  {
    freezeTableName: true,
  }
);

export default Event;

(async () => {
  await db.sync();
})();
