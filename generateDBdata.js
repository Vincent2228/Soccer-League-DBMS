const fileSystem = require('fs');

function randomJoinDateGenerator() {
    const day = Math.floor(Math.random() * 28) + 1;
    const month = Math.floor(Math.random() * 12) + 1;
    const year = Math.floor(Math.random() * (2023 - 2010 + 1)) + 2010;

    // Format to ensure two digits for day and month (for ex: 01 instead of 1)
    const formattedDay = String(day).padStart(2, '0');
    const formattedMonth = String(month).padStart(2, '0');
    
    return `${formattedDay}-${formattedMonth}-${year}`;
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

const playersDataArr = [{ name: "Michael Bradley", dob: "31-07-1987" }, { name: "Nicolas Lodeiro", dob: "09-02-1986" }, { name: "Kacper Przybylko", dob: "08-05-1987" }, { name: "Jozy Altidore", dob: "04-03-1994" }, { name: "Gonzalo Higuain", dob: "09-04-1986" }, { name: "Heber", dob: "23-08-1999" }, { name: "Lionel Messi", dob: "24-06-1987" }, { name: "Mauricio Pereyra", dob: "16-09-1995" }, { name: "Hany Mukhtar", dob: "11-04-1994" }, { name: "Javier Hernandez", dob: "15-06-1989" }, { name: "Gustavo Bou", dob: "20-03-1995" }, { name: "Raul Ruidiaz", dob: "27-01-2003" }, { name: "Nani", dob: "02-02-1987" }, { name: "Alejandro Pozuelo", dob: "06-11-1991" }, { name: "Diego Rossi", dob: "11-02-1993" }, { name: "Brad Guzan", dob: "14-02-2001" }, { name: "Chris Mueller", dob: "05-10-1993" }, { name: "Diego Chara", dob: "24-08-1993" }, { name: "Alejandro Bedoya", dob: "06-01-2000" }, { name: "Anton Tinnerholm", dob: "21-09-1993" }, { name: "Walker Zimmerman", dob: "07-02-2000" }, { name: "Federico Bernadeschi", dob: "27-07-2003" }, { name: "Nick Rimando", dob: "12-03-2001" }, { name: "Gyasi Zardes", dob: "03-01-1986" }, { name: "Chris Wondolowski", dob: "23-12-1986" }, { name: "Damir Kreilach", dob: "20-08-2003" }, { name: "Rodolfo Pizarro", dob: "07-11-1996" }, { name: "Carles Gil", dob: "28-06-1995" }, { name: "Cristian Pavon", dob: "02-08-1997" }, { name: "Eduard Atuesta", dob: "06-10-1987" }, { name: "Pedro Santos", dob: "17-10-1998" }, { name: "Carlos Vela", dob: "27-10-1998" }, { name: "Xherdan Shaqiri", dob: "19-11-2002" }, { name: "Cristian Roldan", dob: "12-07-2002" }, { name: "Andre Blake", dob: "12-12-1985" }, { name: "Diego Valeri", dob: "04-10-1992" }, { name: "Ethan Castillo", dob: "05-03-1998" }, { name: "Jordan Silva", dob: "22-11-1997" }, { name: "Luis Moreno", dob: "14-09-1994" }, { name: "Aaron Schmidt", dob: "18-06-2000" }, { name: "Tyler Johnson", dob: "30-12-1991" }, { name: "Oscar Martinez", dob: "27-04-1989" }, { name: "Carlos Thompson", dob: "16-05-1996" }, { name: "Maxwell Scott", dob: "03-01-1992" }, { name: "Ian Foster", dob: "10-07-1999" }, { name: "Victor Hughes", dob: "29-02-1995" }, { name: "Sebastian Reyes", dob: "08-08-1988" }, { name: "Nathan Collins", dob: "21-03-1993" }, { name: "Alex Peterson", dob: "09-10-2002" }, { name: "David Ortiz", dob: "15-01-1990" }, { name: "Benjamin Clarke", dob: "06-04-1998" }, { name: "Samuel Green", dob: "11-11-1986" }, { name: "Miguel Alvarez", dob: "17-02-1997" }, { name: "Kevin Brooks", dob: "24-08-2001" }, { name: "Ryan Fisher", dob: "02-05-1994" }, { name: "Lucas Grant", dob: "25-07-1999" }, { name: "Kylian Mbappe", dob: "25-07-1998" }, { name: "Erling Haaland", dob: "01-01-2000" }]
const teamNamesArr = ["Atlanta United FC", "Austin FC", "Charlotte FC", "Chicago Fire FC", "Colorado Rapids", "Columbus Crew", "DC United", "FC Cincinnati", "FC Dallas", "Houston Dynamo FC", "Inter Miami", "Los Angeles FC", "Los Angeles Galaxy", "Minnesota United FC", "Montreal Impact", "Nashville FC", "New England Revolution", "New York City FC", "New York Red Bulls", "Orlando City SC", "Philadelphia Union", "Portland Timbers", "Real Salt Lake", "San Jose Earthquakes", "Seattle Sounders FC", "Sporting Kansas City", "St. Louis City SC", "Toronto FC", "Vancouver Whitecaps FC"];
const managersDataArr = [ { name: "David Morgan", dob: "12-03-1982" }, { name: "Ethan Parker", dob: "23-06-1983" }, { name: "Alexander Smith", dob: "28-02-1980" }, { name: "Michael Brown", dob: "14-04-1982" }, { name: "Matthew Taylor", dob: "19-10-1984" }, { name: "Daniel Hernandez", dob: "30-05-1980" }, { name: "Benjamin Garcia", dob: "26-07-1982" }, { name: "William Martinez", dob: "15-05-1984" }, { name: "Oliver Davis", dob: "18-08-1982" }, { name: "Lucas Young", dob: "29-01-1980" }, { name: "Jack Clark", dob: "17-06-1984" }, { name: "Henry Lewis", dob: "21-03-1985" }, { name: "Samuel Walker", dob: "31-07-1982" }, { name: "Liam Allen", dob: "10-08-1984" }, { name: "James Wilson", dob: "04-12-1981" }, { name: "Noah Roberts", dob: "07-09-1983" }, { name: "Elijah Thompson", dob: "16-11-1984" }, { name: "Mason White", dob: "22-02-1982" }, { name: "Logan Garcia", dob: "13-05-1980" }, { name: "Aiden Martinez", dob: "20-07-1983" }, { name: "Jayden Clark", dob: "02-10-1984" }, { name: "Gabriel Rivera", dob: "15-03-1981" }, { name: "John Lee", dob: "28-06-1982" }, { name: "Joseph Martin", dob: "09-01-1980" }, { name: "Carter Young", dob: "17-04-1985" }, { name: "Owen Hernandez", dob: "21-08-1983" }, { name: "Dylan Lopez", dob: "30-10-1984" }, { name: "Gonzalo Pineda", dob: "31-10-1985" }, { name: "Chris Amas", dob: "05-10-1978" }  ];
const stadiumDataArr = [ { "name": "Mercedes-Benz Stadium", "capacity": 36000 }, { "name": "Q2 Stadium", "capacity": 24000 }, { "name": "Saputo Stadium", "capacity": 32000 }, { "name": "Bank of America Stadium", "capacity": 39000 }, { "name": "Soldier Field", "capacity": 28000 }, { "name": "Dick's Sporting Goods Park", "capacity": 21000 }, { "name": "Lower.com Field", "capacity": 26000 }, { "name": "Audi Field", "capacity": 33000 }, { "name": "TQL Stadium", "capacity": 31000 }, { "name": "Toyota Stadium", "capacity": 22000 }, { "name": "Shell Energy Stadium", "capacity": 35000 }, { "name": "DRV PNK Stadium", "capacity": 29000 }, { "name": "BMO Stadium", "capacity": 34000 }, { "name": "Dignity Health Sports Park", "capacity": 37000 }, { "name": "Allianz Field", "capacity": 23000 }, { "name": "Geodis Park", "capacity": 40000 }, { "name": "Gillette Stadium", "capacity": 27000 }, { "name": "Yankee Stadium", "capacity": 25000 }, { "name": "Red Bull Arena", "capacity": 30000 }, { "name": "Exploria Stadium", "capacity": 38000 }, { "name": "Subaru Park", "capacity": 20000 }, { "name": "Providence Park", "capacity": 36000 }, { "name": "America First Field", "capacity": 35000 }, { "name": "PayPal Park", "capacity": 21000 }, { "name": "Lumen Field", "capacity": 32000 }, { "name": "Children's Mercy Park", "capacity": 31000 }, { "name": "CityPark", "capacity": 34000 }, { "name": "BMO Field", "capacity": 22000 }, { "name": "BC Place", "capacity": 24000 } ] 

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