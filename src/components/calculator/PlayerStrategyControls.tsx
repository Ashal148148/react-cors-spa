import * as React from 'react';
import { PlayerI } from '../../interfaces/player';
import Input from '../general/Input';
import Checkbox from '../general/Checkbox';

function PlayerStrategyControls({player, setPlayerIsAddingINT, setPlayerIsAddingFreshAPIntoHP, setPlayerIsMPWashBeforeINT, setPlayerINTGoal}: 
    {player: PlayerI, setPlayerIsAddingINT: (value: boolean) => void, setPlayerIsAddingFreshAPIntoHP: (value: boolean) => void,
    setPlayerIsMPWashBeforeINT: (value: boolean) => void, setPlayerINTGoal: (value: number) => void }): React.JSX.Element {
    return (
      <div className='shadow bg-purple-200'>
          <p className='text-3xl'> strategy </p>
          <div className='flex flex-row'>
            <span className="block text-sm font-medium text-slate-700">Base INT Goal</span>
            <Input type='number' title='baseINTGoal' onBlur={(event) => setPlayerINTGoal(+event.target.value)} placeholder='Base INT Goal'/>
            <Checkbox value={player.is_adding_int} onChange={() => setPlayerIsAddingINT(!player.is_adding_int)} label='Add INT'/>
            <Checkbox value={player.is_adding_fresh_ap_into_hp} onChange={() => setPlayerIsAddingFreshAPIntoHP(!player.is_adding_fresh_ap_into_hp)} label='Add fresh AP into HP'/>
            <Checkbox value={player.is_mp_wash_before_int} onChange={() => setPlayerIsMPWashBeforeINT(!player.is_mp_wash_before_int)} label='MP Wash before adding INT'/>
          </div>
      </div>
    );
}


export default PlayerStrategyControls;
