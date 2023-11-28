const express = require('express');
const oracledb = require('oracledb');
require("dotenv").config();

const dbUsername = process.env.ORACLE_USERNAME;
const dbPassword = process.env.ORACLE_PASSWORD;
const dbConnectString = '(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(Host=oracle12c.scs.ryerson.ca)(Port=1521))(CONNECT_DATA=(SID=orcl12c)))';

const app = express();
const PORT = 5000;

app.get('/api', async (req, res) => {
    async function fetchDataSoccerLeague(){       
        const connection = await oracledb.getConnection({
            user: dbUsername,
            password: dbPassword,
            connectString: dbConnectString
        });
        //res.send("Successfully connected to Oracle!");
        const queryResult = await connection.execute('SELECT * FROM goal');               
        

        const jsonify_goal = queryResult.rows.map(item => {
            return {
              goalID: item[0],
              goalType: item[1],
              goalTime: item[2],
              scoringPlayerID: item[3],
              matchID: item[4]
            };
        });

        
        await connection.close();
        return jsonify_goal;
    }

    fetchDataSoccerLeague()
        .then((result) => res.json(result))
        .catch((error) => res.send(error))
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));