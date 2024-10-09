import logo from './logo.svg';
import logoS3 from './logoS3.png';
import logoCF from './logoCloudFront.png';
import './App.css';
import * as React from 'react';
import { useEffect, useState } from 'react';

// To be replaced by the endpoint of the API deployed through the CloudFormation Template
const APIEndPoint = 'https://keltabpj69.execute-api.eu-north-1.amazonaws.com/default/washPlanner'
const DataToSend = {
  "equipment":[
      {"category": "Hat", "name": "horns", "level": 22, "INT": 5},
      {"category": "Hat", "name": "zak", "level": 50, "INT":32},
      {"category": "Earring", "name": "ear", "level": 15, "INT":8},
      {"category": "Weapon", "name": "wooden", "level": 10, "INT":8},
      {"category": "Overall", "name": "bathrobe", "level": 20, "INT":20},
      {"category": "Pendant", "name": "yellow muffler", "level": 30, "INT":3},
      {"category": "Pendant", "name": "dep star", "level": 50, "INT":5},
      {"category": "Pendant", "name": "htp", "level": 120, "INT":22},
      {"category": "Shield", "name": "pan shield", "level": 10,"INT":7},
      {"category": "Eye accessory", "name": "raccoon", "level": 45, "INT":11},
      {"category": "Cape", "name": "ragged cape", "level": 32,"INT":9},
      {"category": "Cape", "name": "yellow cape", "level": 50, "INT":12},
      {"category": "Cape", "name": "cwkpq cape", "level": 80, "INT":18},
      {"category": "Shoes", "name": "slime shoe", "level": 30, "INT":1},
      {"category": "Glove", "name": "red markers", "level": 20, "INT":11}
  ],
  "name": "AshalNL",
  "job": "Archer/Thief",
  "maple_warrior_percent": 10,
  "level_goal": 160,
  "hp_goal": 29000
}


function App(): React.JSX.Element {
  const [data, setData] = useState('')
  useEffect(() => {
    async function fetchData() {    
      try  {
      const fetchResponse = await fetch (APIEndPoint,
        {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(DataToSend)
        }  
      )
      const response = await fetchResponse.json()
      console.log(response)
      setData(JSON.stringify(response))
    } catch (e) {
      console.log(e)
      setData(e.message)
    }
  }
  fetchData()
  }, [])
  return (
    <div className="App">
        <header className="App-header">
          {data && <p>{data}</p>}
          <img src={logo} className="App-MainLogo" alt="logo" />
        </header>
        <p>This react-based application is hosted in an S3 bucket exposed through a CloudFront distribution</p>
        <p>shaul was here</p>
        <div className="logos">
            <img src={logoS3} className="App-logoR2L" alt="logo S3" />
            <img src={logoCF} className="App-logoL2R" alt="logo CloudFront" />
        </div>
    </div>
  );
}



export default App;
