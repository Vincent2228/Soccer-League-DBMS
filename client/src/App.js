import React, {useEffect, useState} from 'react';

function App() {

  const [backendData, setBackendData] = useState([{}]);

  useEffect(() => {
    fetch('/api')
    .then(response => response.json())
    .then(data => setBackendData(data));
  }, []);

  return (
    <div className="App">
      <h1>React App</h1>
      <ul>
        {backendData.map((item, index) => (
          <li key={index}>
            <h2>Goal #{item.goalID}</h2>
            <p>Type: {item.goalType}</p>
            <p>Time:{item.goalTime}'</p>
            <p>Scoring Player ID: {item.scoringPlayerID}</p>
            <p>Match ID: {item.matchID}</p>            
            
          </li>
        ))}
      </ul>
    </div>
  );

}

export default App;