import './App.css';
import * as React from 'react';
import { useEffect, useState } from 'react';
import EquipmentCarousel from './components/equipment/EquipmentCarousel';
import EquipmentRegistration from './components/equipment/EquipmentRegistration';
import { EquipmentI } from './interfaces/equipment';
import Button from './components/general/Button';

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

  useEffect(() => {
    const storageEquipment = JSON.parse(localStorage.getItem('int_gears')) 
    setEquipment(storageEquipment)
    if (storageEquipment.length === 0) {
      setEquipment(EquipmentConst)
    }
  }, [])
  

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
      <p className='text-center w-full h-full font-bold text-2xl'>Welcome to BattleCat's HP washing calculator</p>
      <p className='text-center w-full h-full text-lg'>This calculator is an estimation, so take it with a grain of slat</p>
      <Button onClick={() => setEquipmentOpen(!equipmentOpen)}> expand me for gears </Button>
      <div className={`${equipmentOpen ? 'block' : 'hidden'}`}>
        <EquipmentRegistration registerEquip={registerEquip(equipment, setEquipment)}></EquipmentRegistration>
        <EquipmentCarousel equipment={equipment} removeEquip={removeEquip(equipment, setEquipment)}/>
      </div>
      {/*data && <p className='bg-blue-300 text-blue-900'>{data}</p>*/}         
    </div>
  );
}



export default App;
