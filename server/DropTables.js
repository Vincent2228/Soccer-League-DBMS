const oracledb = require('oracledb');
require("dotenv").config();

const dbUsername = process.env.ORACLE_USERNAME;
const dbPassword = process.env.ORACLE_PASSWORD;
const dbConnectString = '(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(Host=oracle12c.scs.ryerson.ca)(Port=1521))(CONNECT_DATA=(SID=orcl12c)))';

async function run() {
    let connection;
    try {
        connection = await oracledb.getConnection({
            user: dbUsername,
            password: dbPassword,        
            connectString: dbConnectString
        });
        //console.log("Successfully connected to Oracle DB.");        
        await connection.execute(`DROP TABLE goal`);
        await connection.execute(`DROP TABLE manager`);
        await connection.execute(`DROP TABLE match`);
        await connection.execute(`DROP TABLE player`);
        await connection.execute(`DROP TABLE stadium`);
        await connection.execute(`DROP TABLE team`);
        console.log("Tables dropped successfully from back-end");
        await connection.close();
    } catch (error) {
        console.error("Error occurred:", error);
    }    
}
//run();

module.exports = run;