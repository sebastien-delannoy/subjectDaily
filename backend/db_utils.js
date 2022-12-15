const mysql = require("mysql2");

const getConnection = (addr, user, pwd, db) =>
  mysql.createConnection({
    host: addr,
    user: user,
    password: pwd,
    database: db,
  });

const getUser = (connection, callback) => {
  connection.query("SELECT * FROM Student", callback);
};

const getSite = (connection, callback) => {
  connection.query("SELECT * FROM Production_Site", callback);
};

const getLine = (connection, callback) => {
  connection.query("SELECT * FROM Production_Line", callback);
};

const getCountUser = (connection, callback) => {
  connection.query("SELECT count(*) FROM Student", callback);
};

const createUser = (connection, UserData, callback) => {
  connection.query(
    "INSERT INTO STUDENT (s_name, gender, s_level, class, date_of_birth) VALUES (?,?,?,?,?)",
    [
      UserData.s_name,
      UserData.gender,
      UserData.class,
      UserData.s_level,
      UserData.dob,
    ],
    callback
  );
};

const RegisterSite = (connection, UserData, callback) => {
  connection.query(
    "INSERT INTO Production_Site (s_num, s_name, adr, town, zip_code, country) VALUES (?,?,?,?,?,?)",
    [
      UserData.s_num,
      UserData.s_name,
      UserData.adr,
      UserData.town,
      UserData.zip_code,
      UserData.country,
    ],
    callback
  );
};

const updateUser = (connection, DatatoUpdate, callback) => {
  connection.query(
    "UPDATE STUDENT SET GENDER = ? WHERE S_NAME = ?",
    [DatatoUpdate.gender, DatatoUpdate.s_name],
    callback
  );
};

module.exports = {
  getConnection: getConnection,
  getUser: getUser,
  getSite: getSite,
  getLine: getLine,
  createuser: createUser,
  updateUser: updateUser,
  getCountUser: getCountUser,
  RegisterSite: RegisterSite,
};
