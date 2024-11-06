import * as React from 'react';
import { PlayerI } from '../../interfaces/player';

function PlayerDisplay({player}: {player: PlayerI}): React.JSX.Element {
    return (
      <div className='bg-gradient-to-r from-[#DDF9FF] to-[#ADBEE9] rounded-3xl p-10 mb-6'>        
        <p className='text-3xl pl-5 pb-5'> {player.name} </p>
          <div id='player-stats' className='bg-white rounded-3xl p-5 flex flex-row text-xl'>
           <div className='grow border-solid border-black border-0 border-l-[3px] pl-2 '>
              <p> Level: {player.level} </p>
              <p> Job: {player.job.name} </p>
              <p> Base INT goal: {player.int_goal}</p>
              <p> Base INT: {player.INT} </p>
              <p> Gears bonus INT: {player.gears_int} </p>
              <p> Total INT: {player.total_int} </p>
              <p> Main Stat: {player.main_stat} </p>
              <p> Bonus mana: {player.bonus_mana}</p>
              <p> Total mana: {player.mana} </p>
            </div>
            <div className='grow border-solid border-black border-0 border-l-[3px] pl-2 '>
              <p> Bonus health: {player.bonus_HP} </p>
              <p> Total health: {player.health} </p>
              <p> Fresh AP: {player.fresh_AP} </p>
              <p> Stale AP: {player.stale_ap} </p>              
              <p> Fresh AP added to mana: {player.mp_washes}</p>
              <p> Fresh AP added to health: {player.fresh_ap_into_hp_total} </p>
              <p> AP resets spent: {player.washes}</p>
              <p> AP resets cost: {player.washes * 3100}NX</p>
              <p> Estimated voting time: { Math.round(player.washes * 3100 / (6500 * 365) * 100) / 100 } years</p>
            </div>
        </div>
      </div>
    );
}


export default PlayerDisplay;
