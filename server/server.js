const express = require('express');
const oracledb = require('oracledb');
require("dotenv").config();

const dbUsername = process.env.ORACLE_USERNAME;
const dbPassword = process.env.ORACLE_PASSWORD;
const dbConnectString = '(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(Host=oracle12c.scs.ryerson.ca)(Port=1521))(CONNECT_DATA=(SID=orcl12c)))';

const connectionObject = {
    user: dbUsername,
    password: dbPassword,
    connectString: dbConnectString
};

const app = express();
const PORT = 5000;

app.get('/api', async (req, res) => {
    async function fetchDataSoccerLeague(){       
        const connection = await oracledb.getConnection(connectionObject);
        res.send('Oracle Connection Successful');
        await connection.close();        
    }
    fetchDataSoccerLeague();
});

// Different Endpoints for the 5 tables:

app.get('/api/goals', async (req, res) => {
    try {
        const connection = await oracledb.getConnection(connectionObject);
        const result = await connection.execute('SELECT * FROM goal');
        await connection.close();
        res.send(result.rows);
    } catch (error) {
        res.send(error);
    }
});

app.get('/api/players', async (req, res) => {
    try {
        const connection = await oracledb.getConnection(connectionObject);
        const result = await connection.execute('SELECT * FROM player');
        await connection.close();
        res.send(result.rows);
    } catch (error) {
        res.send(error);
    }
});

app.get('/api/teams', async (req, res) => {
    try {
        const connection = await oracledb.getConnection(connectionObject);
        const result = await connection.execute('SELECT * FROM team');
        await connection.close();
        res.send(result.rows);
    } catch (error) {
        res.send(error);
    }
});

// managers
app.get('/api/managers', async (req, res) => {
    try {
        const connection = await oracledb.getConnection(connectionObject);
        const result = await connection.execute('SELECT * FROM manager');
        await connection.close();
        res.send(result.rows);
    } catch (error) {
        res.send(error);
    }
});

// matches
app.get('/api/matches', async (req, res) => {
    try {
        const connection = await oracledb.getConnection(connectionObject);
        const result = await connection.execute('SELECT * FROM match');
        await connection.close();
        res.send(result.rows);
    } catch (error) {
        res.send(error);
    }
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));