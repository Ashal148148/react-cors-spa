import * as React from 'react';
import Input from '../general/Input';
import Button from '../general/Button';
import Expand from '../general/Expand';

function PlayerLevelControls({ levelUp, resetPlayer }: { levelUp: (levels: number) => void, resetPlayer: () => void}): React.JSX.Element {
    const [levels, setLevels] = React.useState(1)

    return (
      <Expand id="levelControls" title="Levels">
          <div className='flex flex-row mb-4'>
            <span className="block mr-2 pt-3 text-2xl font-medium text-black ">Levels: </span>
            <Input  value={levels} onChange={(event) => setLevels(+event.target.value)} className='mr-2'/>
            <Button className='my-2' onClick={() => levelUp(levels)}>level up</Button>            
          </div>
          
          <Button onClick={resetPlayer}>Reset to level 1</Button>
      </Expand>
    );
}


export default PlayerLevelControls;
