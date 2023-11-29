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
        await connection.execute(`create table team ( team_id number, team_name varchar2(50) not null unique, wins number, losses number, primary key (team_id))`);
        await connection.execute(`create table player (player_id number, player_name varchar2(50) not null, dob date, team_id number not null, join_date date, primary key (player_id), foreign key (team_id) references team(team_id))`);
        await connection.execute(`create table manager (manager_id number, manager_name varchar2(50) not null, team_id number not null, join_date date, primary key (manager_id), foreign key (team_id) references team(team_id))`);
        await connection.execute(`create table stadium (stadium_id number, capacity number not null, stadium_name varchar2(50) not null, home_team_id number, primary key (stadium_id), foreign key (home_team_id) references team(team_id))`);
        await connection.execute(`create table match (match_id number, team1_score number not null, team2_score number not null, attendance number not null, stadium_id number not null, winner_id number not null, loser_id number not null, primary key (match_id), foreign key (stadium_id) references stadium(stadium_id), foreign key (winner_id) references team(team_id), foreign key (loser_id) references team(team_id))`);
        await connection.execute(`create table goal (goal_id number, goal_type varchar2(50), goal_time number, scoring_player_id number not null, match_id number not null, primary key (goal_id), foreign key (scoring_player_id) references player(player_id), foreign key (match_id) references match(match_id))`);
        console.log("Table succesfully created from back-end");
        await connection.close();
    } catch (error) {
        console.error("Error occurred:", error);
    }
}
//run();

module.exports = run;