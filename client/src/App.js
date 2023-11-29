import React, {useEffect, useState} from 'react';
import './App.css';

function App() {

  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);
  const [goals, setGoals] = useState([]);
  const [managers, setManagers] = useState([]);
  const [matches, setMatches] = useState([]);
  const [stadiums, setStadiums] = useState([]);  
  const [DNE, setDNE] = useState([]);

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

  const fetchStadiums = () => {
    fetch('/api/stadiums')
      .then(response => response.json())
      .then(data => setStadiums(data));
  };
  
  const fetchDNE = () => {
    fetch('/api/DNE')
    .then(response => response.json())
    .then(data => setDNE(data));
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
      case 'stadiums':
        fetchStadiums();
        break;
      case 'dne':
        fetchDNE();
        break;
      default:
        break;      
    }
    setActiveDataType(dataType_Str);
  };

  const renderTable = () => {
    let dataToRender = [];
    switch (activeDataType) {
      case 'teams':
        dataToRender = teams;
        break;
      case 'players':
        dataToRender = players;
        break;
      case 'goals':
        dataToRender = goals;
        break;
      case 'managers':
        dataToRender = managers;
        break;
      case 'matches':
        dataToRender = matches;
        break;
      case 'stadiums':
        dataToRender = stadiums;
        break;
      case 'dne':
        dataToRender = DNE;
        break;
      default:
        return <div></div>;
    }  
    if (dataToRender.length === 0) {
      return <div>No data available</div>;
    }  
    // Dynamically render table headers and rows based of JSON object property names and # of json properties
    const columnHeaders = Object.keys(dataToRender[0]);
    return (
      <table>
        <thead>
          <tr>
            {columnHeaders.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataToRender.map((item, rowIndex) => (
            <tr key={rowIndex}>
              {columnHeaders.map((header, colIndex) => (
                <td key={colIndex}>{item[header]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
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
        <button onClick={() => handleButtonClick('stadiums')}>Get Stadiums</button>
        <button onClick={() => handleButtonClick('dne')}>Get DNE</button>
      </div>

      <div className="dataTable">
        {renderTable()}
      </div>
    </div>
  );
}

export default App;