import './App.css';
import * as React from 'react';
import { useEffect, useState } from 'react';
import EquipmentCarousel from './components/equipment/EquipmentCarousel';
import EquipmentRegistration from './components/equipment/EquipmentRegistration';
import { EquipmentI } from './interfaces/equipment';
import Button from './components/general/Button';
import { Player } from './logic/player';
import { archer_thief, jobs } from './logic/job';
import PlayerDisplay from './components/calculator/PlayerDisplay';
import PlayerLevelControls from './components/calculator/PlayerLevelControls';
import PlayerStrategyControls from './components/calculator/PlayerStrategyControls';
import PlayerWashControls from './components/calculator/PlayerWashControls';
import PlayerRegistration from './components/registration/PlayerRegistration';
import Navbar from './components/general/Navbar';

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

const playerConst = new Player(jobs['Archer/Thief'], 'AshalNL', 10)

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
  // const [data, setData] = useState('')
  const [equipment, setEquipment] = useState([])
  const [equipmentOpen, setEquipmentOpen] = useState(false)
  const [playerINT, setPlayerINT] = useState(10)
  const [playerINTGoal, setPlayerINTGoal] = useState(350)
  const [playerLevel, setPlayerLevel] = useState(1)
  const [playerEquipment, setPlayerEquipment] = useState([])
  const [playerMapleWarriorPercent, setPlayerMapleWarriorPercent] = useState(10)
  const [playerBonusMana, setPlayerBonusMana] = useState(0)
  const [playerBonusHP, setPlayerBonusHP] = useState(0)
  const [playerFreshAP, setPlayerFreshAP] = useState(0)
  const [playerWashes, setPlayerWashes] = useState(0)
  const [playerName, setPlayerName] = useState('AshalNL')
  const [playerMPWashes, setPlayerMPWashes] = useState(0)
  const [playerIsAddingINT, setPlayerIsAddingINT] = useState(true)
  const [playerIsAddingFreshAPIntoHP, setPlayerIsAddingFreshAPIntoHP] = useState(false)
  const [playerIsMPWashBeforeINT, setPlayerIsMPWashBeforeINT] = useState(false)
  const [playerStaleAP, setPlayerStaleAP] = useState(0)
  const [playerJob, setPlayerJob] = useState(archer_thief)
  const [playerMainStat, setPlayerMainStat] = useState(5)
  const [playerFreshAPIntoHPTotal, setPlayerFreshAPIntoHPTotal] = useState(0)

  const activePlayer = new Player(playerJob, playerName, playerMapleWarriorPercent, playerINTGoal, playerLevel, playerEquipment, playerBonusHP, playerBonusMana, playerINT, playerFreshAP, playerWashes, playerIsAddingINT, playerStaleAP, playerMainStat, playerIsAddingFreshAPIntoHP, playerMPWashes, playerFreshAPIntoHPTotal, 0, playerIsMPWashBeforeINT)
  const updatePlayerState = (changedPlayer: Player) => {
    setPlayerINT(changedPlayer.INT)
    // setPlayerINTGoal(changedPlayer)
    setPlayerLevel(changedPlayer.level)
    setPlayerEquipment([...changedPlayer.equipment])
    // setPlayerMapleWarriorPercent(10)
    setPlayerBonusMana(changedPlayer.bonus_mana)
    setPlayerBonusHP(changedPlayer.bonus_HP)
    setPlayerFreshAP(changedPlayer.fresh_AP)
    setPlayerWashes(changedPlayer.washes)
    // setPlayerName('AshalNL')
    setPlayerMPWashes(changedPlayer.mp_washes)
    setPlayerIsAddingINT(changedPlayer.is_adding_int)
    setPlayerIsAddingFreshAPIntoHP(changedPlayer.is_adding_fresh_ap_into_hp)
    setPlayerIsMPWashBeforeINT(changedPlayer.is_mp_wash_before_int)
    setPlayerStaleAP(changedPlayer.stale_ap)
    // setPlayerJob(archer_thief)
    setPlayerMainStat(changedPlayer.main_stat)
    setPlayerFreshAPIntoHPTotal(changedPlayer.fresh_ap_into_hp_total)
  }

  useEffect(() => {
    const storageEquipment = JSON.parse(localStorage.getItem('int_gears')) 
    if (storageEquipment == null){
      setEquipment(EquipmentConst)
    } else {
      setEquipment(storageEquipment)
    }
  }, [])

  const levelUp = (levels: number) => {
    activePlayer.progress(levels, equipment)
    updatePlayerState(activePlayer)
  }

  const mpWash = (max_amount: number) => {
    activePlayer.mp_wash(max_amount)
    updatePlayerState(activePlayer)
  }

  const hpWash = (max_amount: number) => {
    activePlayer.hp_wash(max_amount)
    updatePlayerState(activePlayer)
  }

  const resetAllMPIntoHP = () => {
    activePlayer.hp_wash()
    updatePlayerState(activePlayer)
  }

  const resetInt = () => {
    activePlayer.fix_char()
    updatePlayerState(activePlayer)
  }

  const resetPlayer = () => {
    activePlayer.reset_player()
    updatePlayerState(activePlayer)
  }
  

  // useEffect(() => {
  //   async function fetchData() {    
  //     try  {
  //     const fetchResponse = await fetch (APIEndPoint,
  //       {
  //         method: "POST",
  //         headers: {
  //           'Accept': 'application/json',
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify(DataToSend)
  //       }  
  //     )
  //     const response = await fetchResponse.json()
  //     console.log(response)
  //     setData(JSON.stringify(response))
  //   } catch (e) {
  //     console.log(e)
  //     setData(e.message)
  //   }
  // }
  // fetchData()
  // }, [])
  return (
    <div className="App">
      {/*<Button onClick={() =>console.log(activePlayer)}>log current player to console</Button>*/}
      <Navbar/>
      <div id='title' className={"text-white bg-[url('/src/resources/mlbanner.png')] pt-24 pb-14 bg-bottom bg-cover"}>     
        <p className='text-center w-full h-full font-bold text-5xl brightness-200'>Welcome to BattleCat's HP washing calculator</p>
        <p className='text-center w-full h-full text-2xl'>This calculator is an estimation, so take it with a grain of salt</p>
      </div>
      <div id='page-content' className='rounded-3xl p-10 bg-[#11304E] -mt-5'>
        <PlayerRegistration setPlayerName={setPlayerName} setPlayerJob={setPlayerJob} setPlayerMapleWarriorPercent={setPlayerMapleWarriorPercent}/>
        {/*data && <p className='bg-blue-300 text-blue-900'>{data}</p>*/}   
        <PlayerDisplay player={activePlayer}/>
        <Button onClick={() => setEquipmentOpen(!equipmentOpen)}> expand me for gears </Button>
        <div className={`${equipmentOpen ? 'block' : 'hidden'}`}>
          <EquipmentRegistration registerEquip={registerEquip(equipment, setEquipment)}></EquipmentRegistration>
          <EquipmentCarousel equipment={equipment} removeEquip={removeEquip(equipment, setEquipment)}/>
        </div>
        <PlayerLevelControls levelUp={levelUp} resetPlayer={resetPlayer}/>
        <PlayerStrategyControls player={activePlayer} 
          setPlayerIsAddingINT={setPlayerIsAddingINT} 
          setPlayerIsAddingFreshAPIntoHP={setPlayerIsAddingFreshAPIntoHP} 
          setPlayerIsMPWashBeforeINT={setPlayerIsMPWashBeforeINT}
          setPlayerINTGoal={setPlayerINTGoal}
        />
        <PlayerWashControls mpWash={mpWash} hpWash={hpWash} resetAllMPIntoHP={resetAllMPIntoHP} resetInt={resetInt}/>
      </div>
    </div>
  );
}



export default App;
