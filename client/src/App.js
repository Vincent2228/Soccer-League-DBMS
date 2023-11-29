import React, {useEffect, useState} from 'react';
import './App.css';

function App() {
 
  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);
  const [goals, setGoals] = useState([]);
  const [managers, setManagers] = useState([]);
  const [matches, setMatches] = useState([]);

  const [activeDataType, setActiveDataType] = useState('');

  const fetchTeams = () => {
    fetch('/api/teams')
      .then(response => response.json())
      .then(data => setTeams(data));
  };

  const fetchPlayers = () => {
    fetch('/api/players')
      .then(response => response.json())
      .then(data => setPlayers(data));
  };

  const fetchGoals = () => {
    fetch('/api/goals')
    .then(response => response.json())
    .then(data => setGoals(data));
  };

  const fetchManagers = () => {
    fetch('/api/managers')
    .then(response => response.json())
    .then(data => setManagers(data));
  }

  const fetchMatches = () => {
    fetch('/api/matches')
    .then(response => response.json())
    .then(data => setMatches(data));
  }

  const handleButtonClick = (dataType_Str) => {
    switch (dataType_Str) {
      case 'teams':
        fetchTeams();
        break;
      case 'players':
        fetchPlayers();
        break;
      case 'goals':
        fetchGoals();
        break;
      case 'managers':
        fetchManagers();
        break;
      case 'matches':
        fetchMatches();
        break;
      default:
        break;      
    }
    setActiveDataType(dataType_Str);
  };

  const renderTable = () => {
    switch (activeDataType) {
      case 'teams':
        return (
          <table>
            <thead>
              <tr>
                <th>Team ID</th>
                <th>Team Name</th>
                <th>Wins</th>
                <th>Losses</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team, index) => (
                <tr key={index}>
                  <td>{team[0]}</td>
                  <td>{team[1]}</td>
                  <td>{team[2]}</td>
                  <td>{team[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case 'players':
        return (
          <table>
            <thead>
              <tr>
                <th>Player ID</th>
                <th>Name</th>
                <th>Date of Birth</th>
                <th>Team ID</th>
                <th>Join Date</th>
              </tr>
            </thead>
            <tbody>
              {players.map((player, index) => (
                <tr key={index}>
                  <td>{player[0]}</td>
                  <td>{player[1]}</td>
                  <td>{player[2]}</td>
                  <td>{player[3]}</td>
                  <td>{player[4]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case 'goals':
        return (
          <table>
            <thead>
              <tr>
                <th>Goal ID</th>
                <th>Type</th>
                <th>Time</th>
                <th>Scoring Player ID</th>
                <th>Match ID</th>
              </tr>
            </thead>
            <tbody>
              {goals.map((goal, index) => (
                <tr key={index}>
                  <td>{goal[0]}</td>
                  <td>{goal[1]}</td>
                  <td>{goal[2]}</td>
                  <td>{goal[3]}</td>
                  <td>{goal[4]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case 'managers':
        return (
          <table>
            <thead>
              <tr>
                <th>Manager ID</th>
                <th>Manager Name</th>
                <th>Team ID</th>
                <th>Join Date</th>
              </tr>
            </thead>
            <tbody>
              {managers.map((manager, index) => (
                <tr key={index}>
                  <td>{manager[0]}</td>
                  <td>{manager[1]}</td>
                  <td>{manager[2]}</td>
                  <td>{manager[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case 'matches':
        return (
          <table>
            <thead>
              <tr>
                <th>Match ID</th>
                <th>Team1 Score</th>
                <th>Team2 Score</th>
                <th>Attendance</th>
                <th>Stadium ID</th>
                <th>Winner ID</th>
                <th>Loser ID</th>
              </tr>
            </thead>
            <tbody>
              {matches.map((match, index) => (
                <tr key={index}>
                  <td>{match[0]}</td>
                  <td>{match[1]}</td>
                  <td>{match[2]}</td>
                  <td>{match[3]}</td>
                  <td>{match[4]}</td>
                  <td>{match[5]}</td>
                  <td>{match[6]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      default:
        return <div></div>;
    }
  };
  

  return (
    <div className="App">
      <header>
        <h1>Soccer League App</h1>
      </header>

      <div className="buttonPanel">
        <button onClick={() => handleButtonClick('teams')}>Get Teams</button>
        <button onClick={() => handleButtonClick('players')}>Get Players</button>
        <button onClick={() => handleButtonClick('goals')}>Get Goals</button>
        <button onClick={() => handleButtonClick('managers')}>Get Managers</button>
        <button onClick={() => handleButtonClick('matches')}>Get Matches</button>
      </div>

      <div className="dataTable">
        {renderTable()}
      </div>
    </div>
  );
}

export default App;