import React, {useEffect, useState} from 'react';
import './App.css';

function App() {

  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);
  const [goals, setGoals] = useState([]);
  const [managers, setManagers] = useState([]);
  const [matches, setMatches] = useState([]);
  const [stadiums, setStadiums] = useState([]);
  const [sampleQuery1, setSampleQuery1] = useState([]);
  const [sampleQuery2, setSampleQuery2] = useState([]);
  const [sampleQuery3, setSampleQuery3] = useState([]);
  const [sampleQuery4, setSampleQuery4] = useState([]);
  const [customQuery, setCustomQuery] = useState('');

  const [DNE, setDNE] = useState([]);
  
  const [activeDataType, setActiveDataType] = useState('');

  const dropTables = () => {
    fetch('/api/dropTables', { method: 'POST' })
      .then(response => response.text())
      .then(message => alert(message));
  };

  const createTables = () => {
    fetch('/api/createTables', { method: 'POST' })
      .then(response => response.text())
      .then(message => alert(message));
  };

  const populateTables = () => {
    fetch('/api/populateTables', { method: 'POST' })
      .then(response => response.text())
      .then(message => alert(message));
  };

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
  };

  const fetchMatches = () => {
    fetch('/api/matches')
    .then(response => response.json())
    .then(data => setMatches(data));
  };

  const fetchStadiums = () => {
    fetch('/api/stadiums')
      .then(response => response.json())
      .then(data => setStadiums(data));
  };
  
  const fetchDNE = () => {
    fetch('/api/DNE')
    .then(response => response.json())
    .then(data => setDNE(data));
  };

  const fetchSampleQuery1 = () => {
    fetch('/api/sampleQuery1')
      .then(response => response.json())
      .then(data => setSampleQuery1(data));
  };

  const fetchSampleQuery2 = () => {
    fetch('/api/sampleQuery2')
      .then(response => response.json())
      .then(data => setSampleQuery2(data));
  };

  const fetchSampleQuery3 = () => {
    fetch('/api/sampleQuery3')
      .then(response => response.json())
      .then(data => setSampleQuery3(data));
  };

  const fetchSampleQuery4 = () => {
    fetch('/api/sampleQuery4')
      .then(response => response.json())
      .then(data => setSampleQuery4(data));
  };

  const handleTableButtonClick = (dataType_Str) => {
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
      case 'sampleQuery1':
        fetchSampleQuery1();
        break;
      case 'sampleQuery2':
        fetchSampleQuery2();
        break;
      case 'sampleQuery3':
        fetchSampleQuery3();
        break;
      case 'sampleQuery4':
        fetchSampleQuery4();
        break;
      default:
        break;      
    }
    setActiveDataType(dataType_Str);
  };

  const handleQuerySubmit = (event) => {
    event.preventDefault();
    const query = event.target.query.value;
        
    fetch('/api/customQuery', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: query })
    })
    .then(response => response.json())
    .then(data => {
        setCustomQuery(data);
        setActiveDataType('customQuery');
    })
    .catch(error => console.error('Error:', error));
  };  

  const isMainTable = (dataType) => {
    return ['teams', 'players', 'goals', 'managers', 'matches', 'stadiums'].includes(dataType);
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
      case 'sampleQuery1':
        dataToRender = sampleQuery1;
        break;
      case 'sampleQuery2':
        dataToRender = sampleQuery2;
        break;
      case 'sampleQuery3':
        dataToRender = sampleQuery3;
        break;
      case 'sampleQuery4':
        dataToRender = sampleQuery4;
        break;
      case 'customQuery':
        dataToRender = customQuery;
        break;
      default:
        return <div></div>;
    }  
    if (dataToRender.length === 0) {
      return <div>No data available</div>;
    }  
    // Dynamically render table headers and rows based of JSON object property names and # of json properties
    const columnHeaders = Object.keys(dataToRender[0]);

    if (isMainTable(activeDataType)) {
      return renderMainTable(dataToRender, columnHeaders);
    } else {
      return renderQueryResultTable(dataToRender, columnHeaders);
    }    
  };

  const renderMainTable = (dataToRender, columnHeaders) => {
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
          <tr>
            {columnHeaders.map((header, index) => (
              <td key={`input-${index}`}>
                <input type="text" name={`${header}-add`} />
              </td>
            ))}
            <td>
              <button onClick={handleAddRecord}>ADD</button>
            </td>
          </tr>
          {dataToRender.map((item, rowIndex) => (
            <tr key={rowIndex}>
              {columnHeaders.map((header, colIndex) => (
                <td key={colIndex}>{item[header]}</td>
              ))}
              <td>
              <button onClick={() => deleteRecord(item[columnHeaders[0]], columnHeaders[0], activeDataType)}>DELETE</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const renderQueryResultTable = (dataToRender, columnHeaders) => {
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

  const deleteRecord = (idValue, idName, dataType) => {
    fetch(`/api/${dataType}/${idValue}`, { method: 'DELETE' })
      // .then(response => response.text())
      // .then(message => alert(message))
      .then(response => response.json())
      .then(() => {
        // Update the state to remove the deleted item
        let updatedData;

        switch (dataType) {
          case 'teams':
            updatedData = teams.filter(item => item[idName] !== idValue);
            setTeams(updatedData);
            break;
          case 'players':
            updatedData = players.filter(item => item[idName] !== idValue);
            setPlayers(updatedData);
            break; 
          case 'goals':
            updatedData = goals.filter(item => item[idName] !== idValue);
            setGoals(updatedData);
            break;
          case 'managers':
            updatedData = managers.filter(item => item[idName] !== idValue);
            setManagers(updatedData);
            break;
          case 'matches':
            updatedData = matches.filter(item => item[idName] !== idValue);
            setMatches(updatedData);
            break;
          case 'stadiums':
            updatedData = stadiums.filter(item => item[idName] !== idValue);
            setStadiums(updatedData);
            break;          
          default:
            break;
        }
      })
      .catch(error => console.error('Error:', error));
  };
  
  const handleAddRecord = () => {
    alert('Add record clicked');
  };
  

  return (
    <div className="App">      
      <div className="buttonPanel">
        <button onClick={() => handleTableButtonClick('teams')}>Get Teams</button>
        <button onClick={() => handleTableButtonClick('players')}>Get Players</button>
        <button onClick={() => handleTableButtonClick('goals')}>Get Goals</button>
        <button onClick={() => handleTableButtonClick('managers')}>Get Managers</button>
        <button onClick={() => handleTableButtonClick('matches')}>Get Matches</button>
        <button onClick={() => handleTableButtonClick('stadiums')}>Get Stadiums</button>
        <button onClick={() => handleTableButtonClick('dne')}>Get DNE</button>        
      </div>
      <div className="buttonPanelSecondary">
        <button className="dropButton" onClick={() => dropTables()}>DROP Tables</button>
        <button className="createButton" onClick={() => createTables()}>CREATE Tables</button>
        <button className="populateButton" onClick={() => populateTables()}>POPULATE Tables</button>        
      </div>
      <div className="queryPanelContainer">
        <div className="buttonPanelTertiary">
          <button className="sampleQuery1" onClick={() => handleTableButtonClick('sampleQuery1')}>Sample Query 1</button>
          <button className="sampleQuery2" onClick={() => handleTableButtonClick('sampleQuery2')}>Sample Query 2</button>
          <button className="sampleQuery3" onClick={() => handleTableButtonClick('sampleQuery3')}>Sample Query 3</button>
          <button className="sampleQuery4" onClick={() => handleTableButtonClick('sampleQuery4')}>Sample Query 4</button>
        </div>
        <form onSubmit={handleQuerySubmit} className="queryForm">
          <input type="text" name="query" placeholder="Enter your query" />
          <button type="submit">Submit Query</button>
        </form>
      </div>

      <div className="dataTable">
        {renderTable()}
      </div>
    </div>
  );
}

export default App;