// ! Connection for Heroku's environment OR standard node environment
const Sequelize = require("sequelize");
require("dotenv").config();

let sequelize;

if (process.env.JAWSDB_URL) {
  // If running on Heroku with JawsDB
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  // If running locally or on other platforms
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST || "localhost",
      dialect: process.env.DB_DIALECT || "mysql",
      port: process.env.DB_PORT || 3306,
    }
  );
}

module.exports = sequelize;

// ! Connection to just standard node environment
// const Sequelize = require("sequelize");
// require("dotenv").config();

// const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASSWORD,
//   {
//     host: "localhost",
//     dialect: "mysql",
//     port: 3306,
//   }
// );

// module.exports = sequelize;
