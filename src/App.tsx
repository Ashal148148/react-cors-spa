import './App.css';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { EquipmentI } from './interfaces/equipment';
import { Player } from './logic/player';
import { archer_thief, jobs } from './logic/job';
import Navbar from './components/general/Navbar';
import { Route, Routes } from 'react-router'
import Home from './components/pages/Home';
import Terminology from './components/pages/Terminology';
import About from './components/pages/About';
import Planner from './components/pages/Planner';

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
  "job": "Thief/Archer",
  "maple_warrior_percent": 10,
  "level_goal": 160,
  "hp_goal": 29000
}
const EquipmentConst: EquipmentI[] = [
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
  ]

const playerConst = new Player(jobs['Thief/Archer'], 'AshalNL', 10)

function registerEquip(equipment: EquipmentI[], setEquipment: (equip: any) => void){
  return (equip: EquipmentI) => {
    const newEquipment = [...equipment, equip]
    setEquipment(newEquipment)
    localStorage.setItem('int_gears', JSON.stringify(newEquipment))
  }
}

function removeEquip(equipment: EquipmentI[], setEquipment: (equip: any) => void){
  return (index: number) => {
    const newEquipment = equipment.slice(0, index).concat(equipment.slice(index + 1))
    setEquipment(newEquipment)
    localStorage.setItem('int_gears', JSON.stringify(newEquipment))
  }
}

function App(): React.JSX.Element {
  const [equipment, setEquipment] = useState([])
  const [playerMapleWarriorPercent, setPlayerMapleWarriorPercent] = useState(10)
  const [playerName, setPlayerName] = useState('AshalNL')
  const [playerJob, setPlayerJob] = useState(archer_thief)
  const [playerINT, setPlayerINT] = useState(10)
  const [playerINTGoal, setPlayerINTGoal] = useState(350)
  const [playerLevel, setPlayerLevel] = useState(1)
  const [playerEquipment, setPlayerEquipment] = useState([])
  const [playerBonusMana, setPlayerBonusMana] = useState(0)
  const [playerBonusHP, setPlayerBonusHP] = useState(0)
  const [playerFreshAP, setPlayerFreshAP] = useState(0)
  const [playerWashes, setPlayerWashes] = useState(0)
  const [playerMPWashes, setPlayerMPWashes] = useState(0)
  const [playerIsAddingINT, setPlayerIsAddingINT] = useState(true)
  const [playerIsAddingFreshAPIntoHP, setPlayerIsAddingFreshAPIntoHP] = useState(false)
  const [playerIsMPWashBeforeINT, setPlayerIsMPWashBeforeINT] = useState(false)
  const [playerStaleAP, setPlayerStaleAP] = useState(0)
  const [playerMainStat, setPlayerMainStat] = useState(5)
  const [playerFreshAPIntoHPTotal, setPlayerFreshAPIntoHPTotal] = useState(0)

  useEffect(() => {
    const storageEquipment: EquipmentI[] = JSON.parse(localStorage.getItem('int_gears')) 
    if (storageEquipment != null && storageEquipment.length !== 0){
      setEquipment(storageEquipment)
    } else {  // TODO - make sure this section is commented out when building, it's to preload my int gears
      setEquipment(EquipmentConst)
      localStorage.setItem('int_gears', JSON.stringify(EquipmentConst))
    }
  }, [])  

  return (
    <div className="App">
      {/*<Button onClick={() =>console.log(activePlayer)}>log current player to console</Button>*/}
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home equipment={equipment} setEquipment={setEquipment} playerJob={playerJob} setPlayerJob={setPlayerJob}
                                  playerMapleWarriorPercent={playerMapleWarriorPercent} setPlayerMapleWarriorPercent={setPlayerMapleWarriorPercent}
                                  playerName={playerName} setPlayerName={setPlayerName} registerEquip={registerEquip(equipment, setEquipment)} 
                                  removeEquip={removeEquip(equipment, setEquipment)} playerINT={playerINT} setPlayerINT={setPlayerINT} 
                                  playerINTGoal={playerINTGoal} setPlayerINTGoal={setPlayerINTGoal} playerLevel={playerLevel}
                                  setPlayerLevel={setPlayerLevel} playerEquipment={playerEquipment} setPlayerEquipment={setPlayerEquipment}
                                  playerBonusMana={playerBonusMana} setPlayerBonusMana={setPlayerBonusMana} playerBonusHP={playerBonusHP}
                                  setPlayerBonusHP={setPlayerBonusHP} playerFreshAP={playerFreshAP} setPlayerFreshAP={setPlayerFreshAP}
                                  playerWashes={playerWashes} setPlayerWashes={setPlayerWashes} playerMPWashes={playerMPWashes}
                                  setPlayerMPWashes={setPlayerMPWashes} playerIsAddingINT={playerIsAddingINT} setPlayerIsAddingINT={setPlayerIsAddingINT}
                                  playerIsAddingFreshAPIntoHP={playerIsAddingFreshAPIntoHP} setPlayerIsAddingFreshAPIntoHP={setPlayerIsAddingFreshAPIntoHP}
                                  playerIsMPWashBeforeINT={playerIsMPWashBeforeINT} setPlayerIsMPWashBeforeINT={setPlayerIsMPWashBeforeINT} 
                                  playerStaleAP={playerStaleAP} setPlayerStaleAP={setPlayerStaleAP} playerMainStat={playerMainStat}
                                  setPlayerMainStat={setPlayerMainStat} playerFreshAPIntoHPTotal={playerFreshAPIntoHPTotal} 
                                  setPlayerFreshAPIntoHPTotal={setPlayerFreshAPIntoHPTotal}/>}
        />
        <Route path='/terminology' element={<Terminology/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/planner' element={<Planner equipment={equipment} playerJob={playerJob} setPlayerJob={setPlayerJob}
                                  playerMapleWarriorPercent={playerMapleWarriorPercent} setPlayerMapleWarriorPercent={setPlayerMapleWarriorPercent}
                                  playerName={playerName} setPlayerName={setPlayerName} registerEquip={registerEquip(equipment, setEquipment)} 
                                  removeEquip={removeEquip(equipment, setEquipment)} />}/>
      </Routes>
    </div>
  );
}



export default App;
