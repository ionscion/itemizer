const Sequelize = require('sequelize');
const path = require('path');
const dotenv = require('dotenv');

// Set the path to the root directory using __dirname
const rootDir = path.join(__dirname, '..'); // Go up one level from the 'server' folder

// Load the .env file from the root directory
dotenv.config({ path: path.join(rootDir, '.env') });

// create connection to our database, pass in your MySQL information for username and password
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PW,
  {
    host: '127.0.0.1',
    dialect: 'mysql',
    port: 3306
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

module.exports = sequelize;
