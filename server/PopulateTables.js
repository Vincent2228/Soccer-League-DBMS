const oracledb = require('oracledb');
require("dotenv").config();
const fs = require('fs');

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
        const sqlStatements = fs.readFileSync('../extra/insertionCode.txt', 'utf8').split('\n');
        // Execute each SQL statement
        for (const sql of sqlStatements) {
            if (sql.trim()) {
                await connection.execute(sql);                
            }
        }
        await connection.commit();
        console.log("Table succesfully populated from back-end");
        await connection.close();
    } catch (error) {
        console.error("Error occurred:", error);
    }
}
//run();

module.exports = run;