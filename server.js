require('dotenv').config();

const dbUsername = process.env.ORACLE_USERNAME;
const dbPassword = process.env.ORACLE_PASSWORD;

console.log(dbUsername, dbPassword);