import * as React from 'react';
import { useEffect } from 'react';
import PlayerDisplay from '../calculator/PlayerDisplay';
import PlayerRegistration from '../registration/PlayerRegistration';
import EquipmentExpand from '../equipment/EquipmentControls';
import PlayerLevelControls from '../calculator/PlayerLevelControls';
import PlayerWashControls from '../calculator/PlayerWashControls';
import PlayerStrategyControls from '../calculator/PlayerStrategyControls';
import { Player } from '../../logic/player';
import { EquipmentI } from '../../interfaces/equipment';
import { JobI } from '../../interfaces/job';

interface HomePropsI{
    equipment: EquipmentI[],
    setEquipment: (newState: EquipmentI[]) => void,
    playerMapleWarriorPercent: number,
    setPlayerMapleWarriorPercent: (newState: number) => void,
    playerName: string,
    setPlayerName: (newState: string) => void,
    playerJob: JobI,
    setPlayerJob: (newState: JobI) => void,
    registerEquip: (equip: EquipmentI) => void
    removeEquip: (index: number) => void,
    playerINT: number,
    setPlayerINT: (newState: number) => void,
    playerINTGoal: number,
    setPlayerINTGoal: (newState: number) => void,
    playerLevel: number,
    setPlayerLevel: (newState: number) => void,
    playerEquipment: EquipmentI[]
    setPlayerEquipment: (newState: EquipmentI[]) => void,
    playerBonusMana: number,
    setPlayerBonusMana: (newState: number) => void,
    playerBonusHP: number,
    setPlayerBonusHP: (newState: number) => void,
    playerFreshAP: number,
    setPlayerFreshAP: (newState: number) => void,
    playerWashes: number,
    setPlayerWashes: (newState: number) => void,
    playerMPWashes: number,
    setPlayerMPWashes: (newState: number) => void,
    playerIsAddingINT: boolean,
    setPlayerIsAddingINT: (newState: boolean) => void,
    playerIsAddingFreshAPIntoHP: boolean,
    setPlayerIsAddingFreshAPIntoHP: (newState: boolean) => void,
    playerIsMPWashBeforeINT: boolean,
    setPlayerIsMPWashBeforeINT: (newState: boolean) => void,
    playerStaleAP: number,
    setPlayerStaleAP: (newState: number) => void,
    playerMainStat: number,
    setPlayerMainStat: (newState: number) => void,
    playerFreshAPIntoHPTotal: number,
    setPlayerFreshAPIntoHPTotal: (newState: number) => void
}

function Home(props: HomePropsI): React.JSX.Element {
  const activePlayer = new Player(props.playerJob, props.playerName, props.playerMapleWarriorPercent, props.playerINTGoal, props.playerLevel, props.playerEquipment,
    props.playerBonusHP, props.playerBonusMana, props.playerINT, props.playerFreshAP, props.playerWashes, props.playerIsAddingINT, props.playerStaleAP, 
    props.playerMainStat, props.playerIsAddingFreshAPIntoHP, props.playerMPWashes, props.playerFreshAPIntoHPTotal, 0, props.playerIsMPWashBeforeINT) //the 0 there is for the ID property
  const updatePlayerState = (changedPlayer: Player, save: boolean = true) => {
    props.setPlayerINT(changedPlayer.INT)
    props.setPlayerINTGoal(changedPlayer.int_goal)
    props.setPlayerLevel(changedPlayer.level)
    props.setPlayerEquipment([...changedPlayer.equipment])
    props.setPlayerMapleWarriorPercent(changedPlayer.maple_warrior_percent)
    props.setPlayerBonusMana(changedPlayer.bonus_mana)
    props.setPlayerBonusHP(changedPlayer.bonus_HP)
    props.setPlayerFreshAP(changedPlayer.fresh_AP)
    props.setPlayerWashes(changedPlayer.washes)
    props.setPlayerName(changedPlayer.name)
    props.setPlayerMPWashes(changedPlayer.mp_washes)
    props.setPlayerIsAddingINT(changedPlayer.is_adding_int)
    props.setPlayerIsAddingFreshAPIntoHP(changedPlayer.is_adding_fresh_ap_into_hp)
    props.setPlayerIsMPWashBeforeINT(changedPlayer.is_mp_wash_before_int)
    props.setPlayerStaleAP(changedPlayer.stale_ap)
    props.setPlayerJob(changedPlayer.job)
    props.setPlayerMainStat(changedPlayer.main_stat)
    props.setPlayerFreshAPIntoHPTotal(changedPlayer.fresh_ap_into_hp_total)

    if (save){
    localStorage.setItem('player', JSON.stringify(changedPlayer.dump_model()))
    }
  }

  const updatePlayerStorage = (changedPlayer: Player) => {
    localStorage.setItem('player', JSON.stringify(changedPlayer.dump_model()))
  }

  useEffect(() => {
    const storedPlayer = JSON.parse(localStorage.getItem('player'))
    if (storedPlayer !== null) {
      activePlayer.update_from_dump(storedPlayer)
      updatePlayerState(activePlayer, false)
    }
  },[]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(()=> {
    activePlayer.name = props.playerName
    updatePlayerStorage(activePlayer)
  },[props.playerName]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(()=> {
    activePlayer.job = props.playerJob
    updatePlayerStorage(activePlayer)
  },[props.playerJob]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(()=> {
    activePlayer.maple_warrior_percent = props.playerMapleWarriorPercent
    updatePlayerStorage(activePlayer)
  },[props.playerMapleWarriorPercent]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(()=> {
    activePlayer.is_adding_int = props.playerIsAddingINT
    updatePlayerStorage(activePlayer)
  },[props.playerIsAddingINT]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(()=> {
    activePlayer.is_adding_fresh_ap_into_hp = props.playerIsAddingFreshAPIntoHP
    updatePlayerStorage(activePlayer)
  },[props.playerIsAddingFreshAPIntoHP]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(()=> {
    activePlayer.is_mp_wash_before_int = props.playerIsMPWashBeforeINT
    updatePlayerStorage(activePlayer)
  },[props.playerIsMPWashBeforeINT]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(()=> {
    activePlayer.int_goal = props.playerINTGoal
    updatePlayerStorage(activePlayer)
  },[props.playerINTGoal]) // eslint-disable-line react-hooks/exhaustive-deps

  const levelUp = (levels: number) => {
    activePlayer.progress(levels, props.equipment)
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

  return (
    <div className="Home">
      <div id='title' className={"text-white bg-[url('/src/resources/mlbanner.png')] pt-24 pb-14 bg-bottom bg-cover flex flex-col"}>     
        <p className='text-center w-full h-full font-bold text-5xl brightness-200'>Welcome to BattleCat's HP washing calculator</p>
        <p className='text-center w-full h-full text-2xl'>This calculator is an estimation, so take it with a grain of salt</p>
      </div>
      <div id='page-content' className='rounded-t-3xl p-10 bg-[#D4E1F6] -mt-5 flex'>
        <div id='player-display-container' className='w-1/2 mr-5'>
          <PlayerDisplay player={activePlayer}/>
        </div>
        <div id='controls-container' className='w-1/2 ml-5'>
          <PlayerRegistration setPlayerName={props.setPlayerName} playerJob={props.playerJob} setPlayerJob={props.setPlayerJob} 
          mapleWarriorPercent={props.playerMapleWarriorPercent} setPlayerMapleWarriorPercent={props.setPlayerMapleWarriorPercent}/>
          <EquipmentExpand equipment={props.equipment} registerEquip={props.registerEquip} removeEquip={props.removeEquip}/>
          <PlayerLevelControls levelUp={levelUp} resetPlayer={resetPlayer}/>
          <PlayerWashControls mpWash={mpWash} hpWash={hpWash} resetAllMPIntoHP={resetAllMPIntoHP} resetInt={resetInt}/>
          <PlayerStrategyControls playerIsAddingINT={props.playerIsAddingINT}
            setPlayerIsAddingINT={props.setPlayerIsAddingINT} 
            playerIsAddingFreshAPIntoHP={props.playerIsAddingFreshAPIntoHP}
            setPlayerIsAddingFreshAPIntoHP={props.setPlayerIsAddingFreshAPIntoHP} 
            playerIsMPWashBeforeINT={props.playerIsMPWashBeforeINT}
            setPlayerIsMPWashBeforeINT={props.setPlayerIsMPWashBeforeINT}
            playerINTGoal={props.playerINTGoal}
            setPlayerINTGoal={props.setPlayerINTGoal}
          />          
        </div>
      </div>
    </div>
  );
}



export default Home;
