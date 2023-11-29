const express = require('express');
const oracledb = require('oracledb');
require("dotenv").config();
const dropTables = require('./DropTables');
const createTables = require('./CreateTables');
const populateTables = require('./PopulateTables');

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

app.get('/api/teams', async (req, res) => {
    try {
        const connection = await oracledb.getConnection(connectionObject);
        const result = await connection.execute('SELECT * FROM team');
        const teams = result.rows.map(team => ({
            teamID: team[0],
            teamName: team[1],
            wins: team[2],
            losses: team[3]
        }));
        await connection.close();
        res.json(teams);
    } catch (error) {
        res.send([{Column1: 'Error', Column2: 'Error', Column3: 'Error', Column4: 'Error'}]);
    }
});

app.get('/api/players', async (req, res) => {
    try {
        const connection = await oracledb.getConnection(connectionObject);
        const result = await connection.execute('SELECT * FROM player');
        const players = result.rows.map(player => ({
            playerID: player[0],
            playerName: player[1],
            DOB: player[2],
            teamID: player[3],
            joinDate: player[4]
        }));
        await connection.close();
        res.json(players);
    } catch (error) {
        res.send([{Column1: 'Error', Column2: 'Error', Column3: 'Error', Column4: 'Error', Column5: 'Error'}])
    }
});

app.get('/api/managers', async (req, res) => {
    try {
        const connection = await oracledb.getConnection(connectionObject);
        const result = await connection.execute('SELECT * FROM manager');
        const managers = result.rows.map(manager => ({
            managerID: manager[0],
            managerName: manager[1],
            teamID: manager[2],
            joinDate: manager[3]
        }));
        await connection.close();
        res.json(managers);
    } catch (error) {
        res.send([{Column1: 'Error', Column2: 'Error', Column3: 'Error', Column4: 'Error'}])
    }
});

app.get('/api/stadiums', async (req, res) => {
    try {
        const connection = await oracledb.getConnection(connectionObject);
        const result = await connection.execute('SELECT * FROM stadium');
        const stadiums = result.rows.map(stadium => ({
            stadiumID: stadium[0],
            capacity: stadium[1],
            stadiumName: stadium[2],
            homeTeamID: stadium[3]
        }));
        await connection.close();
        res.json(stadiums);
    } catch (error) {
        res.send([{Column1: 'Error', Column2: 'Error', Column3: 'Error', Column4: 'Error'}])
    }
});

app.get('/api/matches', async (req, res) => {
    try {
        const connection = await oracledb.getConnection(connectionObject);
        const result = await connection.execute('SELECT * FROM match');
        const matches = result.rows.map(match => ({
            matchID: match[0],
            team1Score: match[1],
            team2Score: match[2],
            attendance: match[3],
            stadium: match[4],
            winnerID: match[5],
            loserID: match[6]
        }));
        await connection.close();
        res.json(matches);
    } catch (error) {
        res.send([{Column1: 'Error', Column2: 'Error', Column3: 'Error', Column4: 'Error', Column5: 'Error', Column6: 'Error', Column7: 'Error'}])
    }
});

app.get('/api/goals', async (req, res) => {
    try {
        const connection = await oracledb.getConnection(connectionObject);
        const result = await connection.execute('SELECT * FROM goal');
        const goals = result.rows.map(goal => ({
            goalID: goal[0],
            goalType: goal[1],
            goalTime: goal[2],
            scoringPlayerID: goal[3],
            matchID: goal[4]
        }));
        await connection.close();
        res.json(goals);
    } catch (error) {
        res.send([{Column1: 'Error', Column2: 'Error', Column3: 'Error', Column4: 'Error', Column5: 'Error'}])
    }
});

app.get('/api/DNE', async (req, res) => {
    try {
        const connection = await oracledb.getConnection(connectionObject);
        const result = await connection.execute('SELECT * FROM nonExistentTable');
        await connection.close();
        res.send(result.rows);
    } catch (error) {
        res.send([{Column1: 'Error', Column2: 'Error'}])
    }
});


function transformOracleResultToJSON(oracleResult) {
    const columns = oracleResult.metaData.map(col => col.name);
    const transformedRows = oracleResult.rows.map(row => {
        let rowObject = {};
        row.forEach((value, index) => {
            rowObject[columns[index]] = value;
        });
        return rowObject;
    });
    return transformedRows;
}


app.get('/api/sampleQuery1', async (req, res) => {
    try {
        const connection = await oracledb.getConnection(connectionObject);
        const result = await connection.execute('SELECT * FROM team WHERE wins > 2');
        await connection.close();
        
        const transformedResult = transformOracleResultToJSON(result);
        res.json(transformedResult);
    } catch (error) {
        res.send([{Column1: 'Error', Column2: 'Error'}]);
    }
});

app.get('/api/sampleQuery2', async (req, res) => {
    try {
        const connection = await oracledb.getConnection(connectionObject);
        const result = await connection.execute('SELECT p.player_name, COUNT(DISTINCT g.match_id) AS match_count, COUNT(g.goal_id) AS goal_count FROM player p JOIN goal g ON p.player_id = g.scoring_player_id GROUP BY p.player_name ORDER BY goal_count DESC');
        await connection.close();
        
        const transformedResult = transformOracleResultToJSON(result);
        res.json(transformedResult);
    } catch (error) {
        res.send([{Column1: 'Error', Column2: 'Error'}]);
    }
});

app.get('/api/sampleQuery3', async (req, res) => {
    try {
        const connection = await oracledb.getConnection(connectionObject);
        const result = await connection.execute('SELECT t.team_name, t.wins, t.losses, (t.wins + t.losses) AS total_matches FROM team t');
        await connection.close();
        
        const transformedResult = transformOracleResultToJSON(result);
        res.json(transformedResult);
    } catch (error) {
        res.send([{Column1: 'Error', Column2: 'Error'}]);
    }
});

app.get('/api/sampleQuery4', async (req, res) => {
    try {
        const connection = await oracledb.getConnection(connectionObject);
        const result = await connection.execute('SELECT m.match_id, t1.team_name AS team1, t2.team_name AS team2, m.team1_score, m.team2_score, s.stadium_name, m.attendance FROM match m JOIN team t1 ON m.winner_id = t1.team_id JOIN team t2 ON m.loser_id = t2.team_id JOIN stadium s ON m.stadium_id = s.stadium_id ORDER BY m.attendance DESC');
        await connection.close();
        
        const transformedResult = transformOracleResultToJSON(result);
        res.json(transformedResult);
    } catch (error) {
        res.send([{Column1: 'Error', Column2: 'Error'}]);
    }
});

app.post('/api/dropTables', async (req, res) => {
    try {
        await dropTables();
        res.send('All tables dropped successfully');
    } catch (error) {
        res.status(500).send('Error occurred while dropping tables');
    }
});

app.post('/api/createTables', async (req, res) => {
    try {
        await createTables();
        res.send('All tables created successfully');
    } catch (error) {
        res.status(500).send('Error occurred while creating tables');
    }
});

app.post('/api/populateTables', async (req, res) => {
    try {
        await populateTables();
        res.send('All tables populated successfully');
    } catch (error) {
        res.status(500).send('Error occurred while populating tables');
    }
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));