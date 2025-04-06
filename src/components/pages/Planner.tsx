import * as React from 'react';
import NoaCard from '../general/NoaCard';
import Input from '../general/Input';
import Button from '../general/Button';
import PlayerRegistration from '../registration/PlayerRegistration';
import EquipmentExpand from '../equipment/EquipmentControls';
import { JobI } from '../../interfaces/job';
import { EquipmentI } from '../../interfaces/equipment';
import { useEffect } from 'react';
import { jobs } from '../../logic/job';
import Expand from '../general/Expand';
import PlanHistory from '../planner/PlanHistory';
import { do_the_stuff, reach_the_goal_no_matter_what } from '../../logic/planner';
import { Player } from '../../logic/player';
import Modal from '../general/Modal';
import { PlanResultI } from '../../interfaces/planResult';

interface PlannerPropI {
  playerName: string
  setPlayerName: (name: string) => void
  playerJob: JobI
  setPlayerJob: (job: JobI) => void
  playerMapleWarriorPercent: number
  setPlayerMapleWarriorPercent: (percent: number) => void
  equipment: EquipmentI[]
  registerEquip: (equip: EquipmentI) => void
  removeEquip: (index: number) => void
}

function Planner(props: PlannerPropI): React.JSX.Element {   
  const [levelGoal, setLevelGoal] = React.useState(0)
  const [hpGoal, setHpGoal] = React.useState(0)
  const [open, setOpen] = React.useState(false)
  const [baseInt, SetBaseInt] = React.useState(0)
  const [mpWashes, setMpWashes] = React.useState(0)
  const [health, setHealth] = React.useState(0)
  const [washes, setWashes] = React.useState(0)
  const [success, setSuccess] = React.useState(false)
  const [startingBaseInt, setStartingBaseInt] = React.useState(0)
  const [freshApIntoHpTotal, setFreshApIntoHpTotal] = React.useState(0)
  const [planHistory, setPlanHistory] = React.useState<PlanResultI[]>([])

  const currentPlayer = new Player(props.playerJob, props.playerName, props.playerMapleWarriorPercent)
  const onClickPlan = () => {
    if (levelGoal > 0 && hpGoal > 0) {
      const [b, m, h, w, s, f, sb]  = reach_the_goal_no_matter_what(currentPlayer, props.equipment, levelGoal, hpGoal)
      // console.log(do_the_stuff(currentPlayer, props.equipment, levelGoal, hpGoal))
      setOpen(true)
      SetBaseInt(b)
      setMpWashes(m)
      setHealth(h)
      setWashes(w)
      setSuccess(s)
      setFreshApIntoHpTotal(f)
      setStartingBaseInt(sb)
      setPlanHistory((prev) => [...prev, {
        characterName: props.playerName,
        levelGoal: levelGoal,
        hpGoal: hpGoal,
        job: props.playerJob.name,
        baseInt: b,
        mpWashes: m,
        health: h, 
        washes: w,
        success: s,
        freshApIntoHpTotal: f,
        startingBaseInt: sb
      }])

    }
  }

  useEffect(() => {
    const storedPlayer = JSON.parse(localStorage.getItem('player'))
    if (storedPlayer !== null) {
      props.setPlayerName(storedPlayer['name'])
      props.setPlayerJob(jobs[storedPlayer['job']])
      props.setPlayerMapleWarriorPercent(storedPlayer['maple_warrior_percent'])        
    }
  },[]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(()=> {
    const storedPlayer = JSON.parse(localStorage.getItem('player'))
    localStorage.setItem('player', JSON.stringify({...storedPlayer, name: props.playerName}))
  },[props.playerName]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(()=> {
    const storedPlayer = JSON.parse(localStorage.getItem('player'))
    localStorage.setItem('player', JSON.stringify({...storedPlayer, job: props.playerJob.name}))
  },[props.playerJob]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(()=> {
    const storedPlayer = JSON.parse(localStorage.getItem('player'))
    localStorage.setItem('player', JSON.stringify({...storedPlayer, maple_warrior_percent: props.playerMapleWarriorPercent}))
  },[props.playerMapleWarriorPercent]) // eslint-disable-line react-hooks/exhaustive-deps
    
  return (
    <div className="planner">  
        <div id='title' className={"text-white bg-[url('/src/resources/mlbanner.png')] pt-24 pb-14 bg-bottom bg-cover"}>     
            <p className='text-center w-full h-full font-bold text-5xl brightness-200'>Welcome to BattleCat's HP washing calculator</p>
            <p className='text-center w-full h-full text-2xl'>Time to get optimal</p>
        </div>
        <div id='page-content' className='rounded-t-3xl p-10 bg-[#D4E1F6] -mt-5 flex'>
        <div id='planner-container' className='w-1/2 mr-5'>
          <NoaCard>
          <div className='flex flex-row'>
            <span className="block mr-2 pt-3 text-2xl font-medium text-black shrink-0">HP Goal:</span>
            <Input type="number" placeholder='30000' title='name' onBlur={(event) => setHpGoal(+event.target.value)}/>
          </div>
          <div className='flex flex-row'>
            <span className="block mr-2 pt-3 text-2xl font-medium text-black shrink-0">Level Goal:</span>
            <Input type="number" placeholder='155' title='name'  onBlur={(event) => setLevelGoal(+event.target.value)}/>
          </div>
          <Button onClick={onClickPlan}>Plan!</Button>
          </NoaCard>
          <PlanHistory planHistory={planHistory} />
        </div>
            <div id='controls-container' className='w-1/2 ml-5'>
            <PlayerRegistration setPlayerName={props.setPlayerName} playerJob={props.playerJob} setPlayerJob={props.setPlayerJob} 
                mapleWarriorPercent={props.playerMapleWarriorPercent} setPlayerMapleWarriorPercent={props.setPlayerMapleWarriorPercent}/>
            <EquipmentExpand equipment={props.equipment} registerEquip={props.registerEquip} removeEquip={props.removeEquip}/>
            <Expand title='Explanation'>
              <p>
              Taking your gear and maple warrior into account, this tool will calculate the most optimal way to reach your HP goal at your goal level.
              </p>
              <p>This tool assumes you never forget to put on your INT gears and that you always level up with MW20 applied</p>
              <p>If your goal is impossible the result will have a red background and will show the next best thing.</p>
              <p>The most optimal way being finishing exactly at your level goal with the least amount on NX spent</p>
              <p>My algorithm becomes less optimal when mp washing starts before all the base INT has been allocated, so im open for suggestions</p>
            </Expand>
        </div>
        </div>
        <Modal open={open} setOpen={setOpen} title={`Your plan is ${success ? '': 'not '}possible`}>
          <p>{props.playerName} will reach {health} HP by level {levelGoal} as a {props.playerJob.name} with your registered gear and Maple Warrior</p>
          <p>you will need {baseInt} base INT</p>
          <p>accompanied by {mpWashes} MP washes and {freshApIntoHpTotal} fresh points into HP</p>
          <p>start MP washing at {startingBaseInt} base INT</p>
          <p>you will need {washes} AP reset scrolls</p>
        </Modal>
    </div>
  );
}



export default Planner;