const express = require('express');
const oracledb = require('oracledb');
const bodyParser = require('body-parser');
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
app.use(bodyParser.json());
const PORT = 5000;

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
        await connection.close();

        const transformedResult = transformOracleResultToJSON(result);        
        res.json(transformedResult);
    } catch (error) {
        res.send([{Column1: 'Error', Column2: 'Error', Column3: 'Error', Column4: 'Error'}]);
    }
});

app.get('/api/players', async (req, res) => {
    try {
        const connection = await oracledb.getConnection(connectionObject);
        const result = await connection.execute('SELECT * FROM player');        
        await connection.close();

        const transformedResult = transformOracleResultToJSON(result);
        res.json(transformedResult);
    } catch (error) {
        res.send([{Column1: 'Error', Column2: 'Error', Column3: 'Error', Column4: 'Error', Column5: 'Error'}])
    }
});

app.get('/api/managers', async (req, res) => {
    try {
        const connection = await oracledb.getConnection(connectionObject);
        const result = await connection.execute('SELECT * FROM manager');        
        await connection.close();

        const transformedResult = transformOracleResultToJSON(result);
        res.json(transformedResult);
    } catch (error) {
        res.send([{Column1: 'Error', Column2: 'Error', Column3: 'Error', Column4: 'Error'}])
    }
});

app.get('/api/stadiums', async (req, res) => {
    try {
        const connection = await oracledb.getConnection(connectionObject);
        const result = await connection.execute('SELECT * FROM stadium');        
        await connection.close();

        const transformedResult = transformOracleResultToJSON(result);
        res.json(transformedResult);
    } catch (error) {
        res.send([{Column1: 'Error', Column2: 'Error', Column3: 'Error', Column4: 'Error'}])
    }
});

app.get('/api/matches', async (req, res) => {
    try {
        const connection = await oracledb.getConnection(connectionObject);
        const result = await connection.execute('SELECT * FROM match');        
        await connection.close();

        const transformedResult = transformOracleResultToJSON(result);
        res.json(transformedResult);
    } catch (error) {
        res.send([{Column1: 'Error', Column2: 'Error', Column3: 'Error', Column4: 'Error', Column5: 'Error', Column6: 'Error', Column7: 'Error'}])
    }
});

app.get('/api/goals', async (req, res) => {
    try {
        const connection = await oracledb.getConnection(connectionObject);
        const result = await connection.execute('SELECT * FROM goal');        
        await connection.close();

        const transformedResult = transformOracleResultToJSON(result);
        res.json(transformedResult);
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

app.post('/api/customQuery', async (req, res) => {
    try {
        const query = req.body.query;
        if (!query) {
            throw new Error('No query provided');
        }

        const connection = await oracledb.getConnection(connectionObject);
        const result = await connection.execute(query);
        await connection.close();

        const transformedResult = transformOracleResultToJSON(result);
        res.json(transformedResult);
    } catch (error) {
        res.json([{Column1: 'Error', Column2: 'Error'}]);
    }
});

app.delete('/api/teams/:id', async (req, res) => {
    const { id } = req.params;
    console.log(req.params)
    try {
      const connection = await oracledb.getConnection(connectionObject);
      const result = await connection.execute(
        `DELETE FROM team WHERE team_id = :id`,
        { id },
        { autoCommit: true }
      );
      await connection.close();
      res.json({ message: 'Record deleted successfully' });
      console.log("Record deleted successfully");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

app.delete('/api/players/:id', async (req, res) => {
    const { id } = req.params;
    console.log(req.params)
    try {
      const connection = await oracledb.getConnection(connectionObject);
      const result = await connection.execute(
        `DELETE FROM player WHERE player_id = :id`,
        { id },
        { autoCommit: true }
      );
      await connection.close();
      res.json({ message: 'Record deleted successfully' });
      console.log("Record deleted successfully");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

app.delete('/api/managers/:id', async (req, res) => {
    const { id } = req.params;
    console.log(req.params)
    try {
      const connection = await oracledb.getConnection(connectionObject);
      const result = await connection.execute(
        `DELETE FROM manager WHERE manager_id = :id`,
        { id },
        { autoCommit: true }
      );
      await connection.close();
      res.json({ message: 'Record deleted successfully' });
      console.log("Record deleted successfully");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

app.delete('/api/stadiums/:id', async (req, res) => {
    const { id } = req.params;
    console.log(req.params)
    try {
      const connection = await oracledb.getConnection(connectionObject);
      const result = await connection.execute(
        `DELETE FROM stadium WHERE stadium_id = :id`,
        { id },
        { autoCommit: true }
      );
      await connection.close();
      res.json({ message: 'Record deleted successfully' });
      console.log("Record deleted successfully");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

app.delete('/api/matches/:id', async (req, res) => {
    const { id } = req.params;
    console.log(req.params)
    try {
      const connection = await oracledb.getConnection(connectionObject);
      const result = await connection.execute(
        `DELETE FROM match WHERE match_id = :id`,
        { id },
        { autoCommit: true }
      );
      await connection.close();
      res.json({ message: 'Record deleted successfully' });
      console.log("Record deleted successfully");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

app.delete('/api/goals/:id', async (req, res) => {
    const { id } = req.params;
    console.log(req.params)
    try {
      const connection = await oracledb.getConnection(connectionObject);
      const result = await connection.execute(
        `DELETE FROM goal WHERE goal_id = :id`,
        { id },
        { autoCommit: true }
      );
      await connection.close();
      res.json({ message: 'Record deleted successfully' });
      console.log("Record deleted successfully");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));