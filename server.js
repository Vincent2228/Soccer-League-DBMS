const express = require('express');
const oracledb = require('oracledb');
require("dotenv").config();

const dbUsername = process.env.ORACLE_USERNAME;
const dbPassword = process.env.ORACLE_PASSWORD;
const dbConnectString = '(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(Host=oracle12c.scs.ryerson.ca)(Port=1521))(CONNECT_DATA=(SID=orcl12c)))';

const app = express();
const PORT = 5000;

// app.get('/', async (req, res) => {
//     res.send("Hello World!");
// });

app.get('/', async (req, res) => {
    async function fetchDataSoccerLeague(){       
        const connection = await oracledb.getConnection({
            user: dbUsername,
            password: dbPassword,
            connectString: dbConnectString
        });
        //res.send("Successfully connected to Oracle!");
        const queryResult = await connection.execute('SELECT * FROM team');
        await connection.close();
        return queryResult;
    }

    fetchDataSoccerLeague()
        .then((result) => res.send(result))
        .catch((error) => res.send(error))
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});