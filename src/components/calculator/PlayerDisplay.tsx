import * as React from 'react';
import { PlayerI } from '../../interfaces/player';

function PlayerDisplay({player}: {player: PlayerI}): React.JSX.Element {
    return (
      <div className='shadow bg-blue-200'>
          <p className='text-3xl'> {player.name} </p>
          <p> Level: {player.level} </p>
          <p> Job: {player.job.name} </p>
          <p> Base INT goal: {player.int_goal}</p>
          <p> Base INT: {player.INT} </p>
          <p> Gears bonus INT: {player.gears_int} </p>
          <p> Total INT: {player.total_int} </p>
          <p> Bonus mana: {player.bonus_mana}</p>
          <p> Total mana: {player.mana} </p>
          <p> Bonus health: {player.bonus_HP} </p>
          <p> Total health: {player.health} </p>
          <p> Fresh AP: {player.fresh_AP} </p>
          <p> Stale AP: {player.stale_ap} </p>
          <p> Main Stat: {player.main_stat} </p>
          <p> Fresh AP added to mana: {player.mp_washes}</p>
          <p> Fresh AP added to health: {player.fresh_ap_into_hp_total} </p>
          <p> AP resets spent: {player.washes}</p>
          <p> AP resets cost: {player.washes * 3100}NX</p>
      </div>
    );
}


export default PlayerDisplay;
