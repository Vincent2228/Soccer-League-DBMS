const oracledb = require('oracledb');
require("dotenv").config();

const dbUsername = process.env.ORACLE_USERNAME;
const dbPassword = process.env.ORACLE_PASSWORD;
const dbConnectString = '(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(Host=oracle12c.scs.ryerson.ca)(Port=1521))(CONNECT_DATA=(SID=orcl12c)))';

async function run() {
    const connection = await oracledb.getConnection({
        user: dbUsername,
        password: dbPassword,        
        connectString: dbConnectString
    });
    console.log("Successfully connected to Oracle DB.");

    const result = await connection.execute(`SELECT * FROM goal`);
    console.dir(result);

    await connection.close();   // Always close connections
}

run();