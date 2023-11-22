const fileSystem = require('fs');

function randomJoinDateGenerator() {
    const day = Math.floor(Math.random() * 28) + 1;
    const month = Math.floor(Math.random() * 12) + 1;
    const year = Math.floor(Math.random() * (2023 - 2010 + 1)) + 2010;

    // Format to ensure two digits for day and month (for ex: 01 instead of 1)
    const formattedDay = String(day).padStart(2, '0');
    const formattedMonth = String(month).padStart(2, '0');
    
    return `${year}-${formattedMonth}-${formattedDay}`;
}

function randomGoalTypeGenerator() {
    const goalTypes = ["corner-kick header", "corner-kick rebound", "penalty", "free-kick", "header", "volley", "long shot", "tap-in", "rebound"];
    return goalTypes[Math.floor(Math.random() * goalTypes.length)];
}

class Player {
    static totalNumberOfPlayers = 0;
    constructor(playerName, dob){
        this.playerID = Player.totalNumberOfPlayers + 1;
        this.playerName = playerName;
        this.dob = dob;
        this.teamID = null;
        this.teamJoinDate = null;
        Player.totalNumberOfPlayers++;
    }    
    setTeam(TeamInstance) {
        this.teamID = TeamInstance.teamID;
    }
}

class Team {
    static totalNumberOfTeams = 0;
    constructor(teamName){
        this.teamID = Team.totalNumberOfTeams + 1;
        this.teamName = teamName;
        this.manager = null;
        this.players = [];
        this.wins = 0;
        this.losses = 0;
        Team.totalNumberOfTeams++;
    }
    setManager(manager){
        this.manager = manager;
    }
    addPlayer(player){
        this.players.push(player);
    }
    addWin(){
        this.wins++;
    }
    addLoss(){
        this.losses++;
    }
}

class Manager {
    static totalNumberOfManagers = 0;
    constructor(managerName){
        this.managerID = Manager.totalNumberOfManagers + 1;
        this.managerName = managerName;        
        this.teamID = null;
        this.teamJoinDate = null;
        Manager.totalNumberOfManagers++;
    }
    setTeam(TeamInstance) {
        this.teamID = TeamInstance.teamID;
    }
}

class Stadium {
    static totalNumberOfStadiums = 0;
    constructor(stadiumName, capacity){
        this.stadiumID = Stadium.totalNumberOfStadiums + 1;
        this.stadiumName = stadiumName;
        this.capacity = capacity;
        this.homeTeamID = null;
        Stadium.totalNumberOfStadiums++;
    }
    setTeam(TeamInstance) {
        this.homeTeamID = TeamInstance.teamID;
    }
}

class Goal{
    static totalNumberOfGoals = 0;
    constructor(player, time, type, match){
        this.goalID = Goal.totalNumberOfGoals + 1;
        this.scoringPlayerID = player.playerID;
        this.goalTime = time;
        this.matchID = match.matchID;
        this.goalType = type;
        Goal.totalNumberOfGoals++;
    }
}

class Match{
    static totalNumberOfMatches = 0;
    constructor(team1, team2, stadium){
        this.matchID = Match.totalNumberOfMatches + 1;        
        this.stadiumID = stadium.stadiumID;
        this.team1 = team1;
        this.team2 = team2;
        this.Goals = [];
        this.attendance = null;
        this.team1Score = null;
        this.team2Score = null;
        this.winnerID = null;        
        this.loserID = null;
        // this.winnerID = null;
        // this.loserID = null;
        Match.totalNumberOfMatches++;
    }
    setAttendance(attendance){
        this.attendance = attendance;
    }
    setWinner(winnerTeamInstance){
        this.winnerID = winnerTeamInstance.teamID;
        //this.winnerID = winner.teamID;
    }
    setLoser(loserTeamInstance){
        this.loserID = loserTeamInstance.teamID;
        //this.loserID = loser.teamID;
    }
    setTeam1Score(team1Score){
        this.team1Score = team1Score;
    }
    setTeam2Score(team2Score){
        this.team2Score = team2Score;
    }
    addGoal(goal){       
        this.Goals.push(goal);
    }
}

const playersDataArr = [{ name: "Michael Bradley", dob: "1987-07-31" }, { name: "Nicolas Lodeiro", dob: "1986-02-09" }, { name: "Kacper Przybylko", dob: "1987-05-08" }, { name: "Jozy Altidore", dob: "1994-03-04" }, { name: "Gonzalo Higuain", dob: "1986-04-09" }, { name: "Heber", dob: "1999-08-23" }, { name: "Lionel Messi", dob: "1987-06-24" }, { name: "Mauricio Pereyra", dob: "1995-09-16" }, { name: "Hany Mukhtar", dob: "1994-04-11" }, { name: "Javier Hernandez", dob: "1989-06-15" }, { name: "Gustavo Bou", dob: "1995-03-20" }, { name: "Raul Ruidiaz", dob: "2003-01-27" }, { name: "Nani", dob: "1987-02-02" }, { name: "Alejandro Pozuelo", dob: "1991-11-06" }, { name: "Diego Rossi", dob: "1993-02-11" }, { name: "Brad Guzan", dob: "2001-02-14" }, { name: "Chris Mueller", dob: "1993-10-05" }, { name: "Diego Chara", dob: "1993-08-24" }, { name: "Alejandro Bedoya", dob: "2000-01-06" }, { name: "Anton Tinnerholm", dob: "1993-09-21" }, { name: "Walker Zimmerman", dob: "2000-02-07" }, { name: "Federico Bernadeschi", dob: "2003-07-27" }, { name: "Nick Rimando", dob: "2001-03-12" }, { name: "Gyasi Zardes", dob: "1986-01-03" }, { name: "Chris Wondolowski", dob: "1986-12-23" }, { name: "Damir Kreilach", dob: "2003-08-20" }, { name: "Rodolfo Pizarro", dob: "1996-11-07" }, { name: "Carles Gil", dob: "1995-06-28" }, { name: "Cristian Pavon", dob: "1997-08-02" }, { name: "Eduard Atuesta", dob: "1987-10-06" }, { name: "Pedro Santos", dob: "1998-10-17" }, { name: "Carlos Vela", dob: "1998-10-27" }, { name: "Xherdan Shaqiri", dob: "2002-11-19" }, { name: "Cristian Roldan", dob: "2002-07-12" }, { name: "Andre Blake", dob: "1985-12-12" }, { name: "Diego Valeri", dob: "1992-10-04" }, { name: "Ethan Castillo", dob: "1998-03-05" }, { name: "Jordan Silva", dob: "1997-11-22" }, { name: "Luis Moreno", dob: "1994-09-14" }, { name: "Aaron Schmidt", dob: "2000-06-18" }, { name: "Tyler Johnson", dob: "1991-12-30" }, { name: "Oscar Martinez", dob: "1989-04-27" }, { name: "Carlos Thompson", dob: "1996-05-16" }, { name: "Maxwell Scott", dob: "1992-01-03" }, { name: "Ian Foster", dob: "1999-07-10" }, { name: "Victor Hughes", dob: "1995-02-27" }, { name: "Sebastian Reyes", dob: "1988-08-08" }, { name: "Nathan Collins", dob: "1993-03-21" }, { name: "Alex Peterson", dob: "2002-10-09" }, { name: "David Ortiz", dob: "1990-01-15" }, { name: "Benjamin Clarke", dob: "1998-04-06" }, { name: "Samuel Green", dob: "1986-11-11" }, { name: "Miguel Alvarez", dob: "1997-02-17" }, { name: "Kevin Brooks", dob: "2001-08-24" }, { name: "Ryan Fisher", dob: "1994-05-02" }, { name: "Lucas Grant", dob: "1999-07-25" }, { name: "Kylian Mbappe", dob: "1998-07-25" }, { name: "Erling Haaland", dob: "2000-01-01" } ]
const teamNamesArr = ["Atlanta United FC", "Austin FC", "Charlotte FC", "Chicago Fire FC", "Colorado Rapids", "Columbus Crew", "DC United", "FC Cincinnati", "FC Dallas", "Houston Dynamo FC", "Inter Miami", "Los Angeles FC", "Los Angeles Galaxy", "Minnesota United FC", "Montreal Impact", "Nashville FC", "New England Revolution", "New York City FC", "New York Red Bulls", "Orlando City SC", "Philadelphia Union", "Portland Timbers", "Real Salt Lake", "San Jose Earthquakes", "Seattle Sounders FC", "Sporting Kansas City", "St. Louis City SC", "Toronto FC", "Vancouver Whitecaps FC"];
const managersDataArr = [ { "name": "David Morgan", "dob": "1982-03-12" }, { "name": "Ethan Parker", "dob": "1983-06-23" }, { "name": "Alexander Smith", "dob": "1980-02-28" }, { "name": "Michael Brown", "dob": "1982-04-14" }, { "name": "Matthew Taylor", "dob": "1984-10-19" }, { "name": "Daniel Hernandez", "dob": "1980-05-30" }, { "name": "Benjamin Garcia", "dob": "1982-07-26" }, { "name": "William Martinez", "dob": "1984-05-15" }, { "name": "Oliver Davis", "dob": "1982-08-18" }, { "name": "Lucas Young", "dob": "1980-01-29" }, { "name": "Jack Clark", "dob": "1984-06-17" }, { "name": "Henry Lewis", "dob": "1985-03-21" }, { "name": "Samuel Walker", "dob": "1982-07-31" }, { "name": "Liam Allen", "dob": "1984-08-10" }, { "name": "James Wilson", "dob": "1981-12-04" }, { "name": "Noah Roberts", "dob": "1983-09-07" }, { "name": "Elijah Thompson", "dob": "1984-11-16" }, { "name": "Mason White", "dob": "1982-02-22" }, { "name": "Logan Garcia", "dob": "1980-05-13" }, { "name": "Aiden Martinez", "dob": "1983-07-20" }, { "name": "Jayden Clark", "dob": "1984-10-02" }, { "name": "Gabriel Rivera", "dob": "1981-03-15" }, { "name": "John Lee", "dob": "1982-06-28" }, { "name": "Joseph Martin", "dob": "1980-01-09" }, { "name": "Carter Young", "dob": "1985-04-17" }, { "name": "Owen Hernandez", "dob": "1983-08-21" }, { "name": "Dylan Lopez", "dob": "1984-10-30" }, { "name": "Gonzalo Pineda", "dob": "1985-10-31" }, { "name": "Chris Amas", "dob": "1978-10-05" } ]; 
const stadiumDataArr = [ { "name": "Mercedes-Benz Stadium", "capacity": 36000 }, { "name": "Q2 Stadium", "capacity": 24000 }, { "name": "Saputo Stadium", "capacity": 32000 }, { "name": "Bank of America Stadium", "capacity": 39000 }, { "name": "Soldier Field", "capacity": 28000 }, { "name": "Dicks Sporting Goods Park", "capacity": 21000 }, { "name": "Lower.com Field", "capacity": 26000 }, { "name": "Audi Field", "capacity": 33000 }, { "name": "TQL Stadium", "capacity": 31000 }, { "name": "Toyota Stadium", "capacity": 22000 }, { "name": "Shell Energy Stadium", "capacity": 35000 }, { "name": "DRV PNK Stadium", "capacity": 29000 }, { "name": "BMO Stadium", "capacity": 34000 }, { "name": "Dignity Health Sports Park", "capacity": 37000 }, { "name": "Allianz Field", "capacity": 23000 }, { "name": "Geodis Park", "capacity": 40000 }, { "name": "Gillette Stadium", "capacity": 27000 }, { "name": "Yankee Stadium", "capacity": 25000 }, { "name": "Red Bull Arena", "capacity": 30000 }, { "name": "Exploria Stadium", "capacity": 38000 }, { "name": "Subaru Park", "capacity": 20000 }, { "name": "Providence Park", "capacity": 36000 }, { "name": "America First Field", "capacity": 35000 }, { "name": "PayPal Park", "capacity": 21000 }, { "name": "Lumen Field", "capacity": 32000 }, { "name": "Children's Mercy Park", "capacity": 31000 }, { "name": "CityPark", "capacity": 34000 }, { "name": "BMO Field", "capacity": 22000 }, { "name": "BC Place", "capacity": 24000 } ] 

let PlayerArray = [];
playersDataArr.forEach(player => {
    PlayerArray.push(new Player(player.name, player.dob));
});
//console.log(PlayerArray.length);

let TeamArray = [];
teamNamesArr.forEach(team => {
    TeamArray.push(new Team(team));
});
//console.log(TeamArray.length);

let ManagerArray = [];
managersDataArr.forEach(manager => {
    ManagerArray.push(new Manager(manager.name));
});
//console.log(ManagerArray.length);

TeamArray.forEach(TeamInstance => {
    assignedManager = ManagerArray[TeamInstance.teamID-1];
    TeamInstance.setManager(assignedManager);
    assignedManager.setTeam(TeamInstance); 
    assignedManager.teamJoinDate = randomJoinDateGenerator();
    
    /*mapping which teams get which players.
        team1 (teamID = 1) gets player1 (playerID = 1) and player2 (playerID = 2)
        team2 (teamID = 2) gets player3 (playerID = 3) and player4 (playerID = 4)
        example math for team2 assignment:
        i = 2*teamID-1 = 2*(2)-1 = 3
        j = i+1 = 4
    */
    let i = 2*TeamInstance.teamID-1, j = i+1;

    TeamInstance.addPlayer(PlayerArray[i-1]); //i-1 because array index starts at 0
    TeamInstance.addPlayer(PlayerArray[j-1]);
    PlayerArray[i-1].setTeam(TeamInstance);
    PlayerArray[j-1].setTeam(TeamInstance);
    PlayerArray[i-1].teamJoinDate = randomJoinDateGenerator();
    PlayerArray[j-1].teamJoinDate = randomJoinDateGenerator();
});

let StadiumArray = [];
stadiumDataArr.forEach(stadium => {
    StadiumArray.push(new Stadium(stadium.name, stadium.capacity));
});
StadiumArray.forEach(stadium => {
    assignedTeam = TeamArray[stadium.stadiumID-1];
    stadium.setTeam(assignedTeam);
});

// console.log(PlayerArray);
// console.log(ManagerArray);
// console.log(StadiumArray);
// console.dir(TeamArray, { depth: null });

function simulateMatch(team1, team2, stadium){
    let match = new Match(team1, team2, stadium);
    match.setAttendance(Math.floor(Math.random() * stadium.capacity) + 1);

    //insure no draws
    let team1Score = 0;
    let team2Score = 0;
    while (team1Score == team2Score){
        team1Score = Math.floor(Math.random() * 6);
        team2Score = Math.floor(Math.random() * 6);
    }
    match.setTeam1Score(team1Score);
    match.setTeam2Score(team2Score);

    //generate goals for each team
    for (let i = 0; i < match.team1Score; i++){
        let goal = new Goal(team1.players[Math.floor(Math.random() * team1.players.length)], Math.floor(Math.random() * 90) + 1, randomGoalTypeGenerator(), match);
        match.addGoal(goal);
    }
    for (let i = 0; i < match.team2Score; i++){
        let goal = new Goal(team2.players[Math.floor(Math.random() * team2.players.length)], Math.floor(Math.random() * 90) + 1, randomGoalTypeGenerator(), match);
        match.addGoal(goal);
    }

    if (match.team1Score > match.team2Score){
        match.setWinner(team1);
        match.setLoser(team2);
        team1.addWin();
        team2.addLoss();
    } else {
        match.setWinner(team2);
        match.setLoser(team1);
        team2.addWin();
        team1.addLoss();
    }
    return match;
}
function chooseMatchUp(){
    let team1 = TeamArray[Math.floor(Math.random() * TeamArray.length)];
    let team2 = TeamArray[Math.floor(Math.random() * TeamArray.length)];
    while (team1 === team2){
        team2 = TeamArray[Math.floor(Math.random() * TeamArray.length)];
    }
    // choose home stadium of either team1 or team2 randomly
    let stadium = StadiumArray[Math.floor(Math.random() * 2) === 0 ? team1.teamID-1 : team2.teamID-1];

    //return team1, team2, and stadium
    return [team1, team2, stadium];
}

let GoalArray = [];
let MatchArray = [];

function simulate_n_matches(n){
    for (let i = 0; i < n; i++){
        let matchUp = chooseMatchUp();
        let match = simulateMatch(...matchUp);
        MatchArray.push(match);
        GoalArray.push(...match.Goals);
    }
}

simulate_n_matches(50);
// console.dir(MatchArray, { depth: 3 });
// console.log(GoalArray)

// mapping to SQL Insertion Code
/**
 * team:    INSERT INTO team VALUES (teamID, teamName, wins, losses)
 * player:  INSERT INTO player VALUES (playerID, playerName, dob, teamID, teamJoinDate)
 * manager: INSERT INTO manager VALUES (managerID, managerName, teamID, teamJoinDate)
 * stadium: INSERT INTO stadium VALUES (stadiumID, capacity, stadiumName, homeTeamID)
 * match:   INSERT INTO match VALUES (matchID, team1Score, team2Score, attendance, stadiumID, winnerID, loserID)
 * goal:    INSERT INTO goal VALUES (goalID, goalType, goalTime, scoringPlayerID, matchID)
 */

// SQL Insertion Code
function allTeamInsertionCode(){
    let teamInsertionCode = "";
    TeamArray.forEach(TeamInstance => {
        teamInsertionCode += `INSERT INTO team VALUES (${TeamInstance.teamID}, '${TeamInstance.teamName}', ${TeamInstance.wins}, ${TeamInstance.losses});\n`;
    });
    return teamInsertionCode;
}
function allPlayerInsertionCode(){
    let playerInsertionCode = "";
    PlayerArray.forEach(PlayerInstance => {
        playerInsertionCode += `INSERT INTO player VALUES (${PlayerInstance.playerID}, '${PlayerInstance.playerName}', DATE '${PlayerInstance.dob}', ${PlayerInstance.teamID}, DATE '${PlayerInstance.teamJoinDate}');\n`;
    });
    return playerInsertionCode;
}
function allManagerInsertionCode(){
    let managerInsertionCode = "";
    ManagerArray.forEach(ManagerInstance => {
        managerInsertionCode += `INSERT INTO manager VALUES (${ManagerInstance.managerID}, '${ManagerInstance.managerName}', ${ManagerInstance.teamID}, DATE '${ManagerInstance.teamJoinDate}');\n`;
    });
    return managerInsertionCode;
}
function allStadiumInsertionCode(){
    let stadiumInsertionCode = "";
    StadiumArray.forEach(StadiumInstance => {
        stadiumInsertionCode += `INSERT INTO stadium VALUES (${StadiumInstance.stadiumID}, ${StadiumInstance.capacity}, '${StadiumInstance.stadiumName}', ${StadiumInstance.homeTeamID});\n`;
    });
    return stadiumInsertionCode;
}
function allMatchInsertionCode(){
    let matchInsertionCode = "";
    MatchArray.forEach(MatchInstance => {
        matchInsertionCode += `INSERT INTO match VALUES (${MatchInstance.matchID}, ${MatchInstance.team1Score}, ${MatchInstance.team2Score}, ${MatchInstance.attendance}, ${MatchInstance.stadiumID}, ${MatchInstance.winnerID}, ${MatchInstance.loserID});\n`;
    });
    return matchInsertionCode;
}
function allGoalInsertionCode(){
    let goalInsertionCode = "";
    GoalArray.forEach(GoalInstance => {
        goalInsertionCode += `INSERT INTO goal VALUES (${GoalInstance.goalID}, '${GoalInstance.goalType}', ${GoalInstance.goalTime}, ${GoalInstance.scoringPlayerID}, ${GoalInstance.matchID});\n`;
    });
    return goalInsertionCode;
}

// console.log(allTeamInsertionCode());
// console.log("-----------------------------------------------------------------------");
// console.log(allPlayerInsertionCode());
// console.log("-----------------------------------------------------------------------");
// console.log(allManagerInsertionCode());
// console.log("-----------------------------------------------------------------------");
// console.log(allStadiumInsertionCode());
// console.log("-----------------------------------------------------------------------");
// console.log(allMatchInsertionCode());
// console.log("-----------------------------------------------------------------------");
// console.log(allGoalInsertionCode());

function allSQLInsertionCode(){
    let allInsertionCode = "";
    allInsertionCode += allTeamInsertionCode();
    allInsertionCode += allPlayerInsertionCode();
    allInsertionCode += allManagerInsertionCode();
    allInsertionCode += allStadiumInsertionCode();
    allInsertionCode += allMatchInsertionCode();
    allInsertionCode += allGoalInsertionCode();
    return allInsertionCode;
}

fileSystem.writeFile("insertionCode.txt", allSQLInsertionCode(), (err) => {
    if (err) throw err;
    console.log("insertionCode.txt has been updated.");
});