import * as React from 'react';
import Input from '../general/Input';
import Checkbox from '../general/Checkbox';
import Expand from '../general/Expand';

function PlayerStrategyControls({playerIsAddingINT, setPlayerIsAddingINT, playerIsAddingFreshAPIntoHP, setPlayerIsAddingFreshAPIntoHP,
  playerIsMPWashBeforeINT, setPlayerIsMPWashBeforeINT, playerINTGoal, setPlayerINTGoal}: 
    {playerIsAddingINT: boolean, setPlayerIsAddingINT: (value: boolean) => void, playerIsAddingFreshAPIntoHP: boolean, setPlayerIsAddingFreshAPIntoHP: (value: boolean) => void,
     playerIsMPWashBeforeINT: boolean, setPlayerIsMPWashBeforeINT: (value: boolean) => void, playerINTGoal: number, setPlayerINTGoal: (value: React.SetStateAction<number>) => void }): React.JSX.Element {
      return (
      <Expand id='strategyControls' title='Strategy'>
          <div className='flex flex-col'>
            <Checkbox value={playerIsAddingINT} onChange={() => setPlayerIsAddingINT(!playerIsAddingINT)} label='Add INT'/>
            <div className='flex flex-row'>
              <span className="block mr-2 pt-3 text-2xl font-medium text-black">Base INT Goal:</span>
              <Input title='baseINTGoal' value={playerINTGoal || 0} onChange={(event) => setPlayerINTGoal((prev: number) => Number.isNaN(+event.target.value) ? prev: +event.target.value)} placeholder='Base INT Goal'/>
            </div>
            <Checkbox value={playerIsAddingFreshAPIntoHP} onChange={() => setPlayerIsAddingFreshAPIntoHP(!playerIsAddingFreshAPIntoHP)} label='Add fresh AP into HP'/>
            <Checkbox value={playerIsMPWashBeforeINT} onChange={() => setPlayerIsMPWashBeforeINT(!playerIsMPWashBeforeINT)} label='MP Wash before adding INT'/>
          </div>
      </Expand>
    );
}


export default PlayerStrategyControls;
