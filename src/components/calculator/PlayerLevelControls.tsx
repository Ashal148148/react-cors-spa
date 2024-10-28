import * as React from 'react';
import { Player } from '../../logic/player';
import Input from '../general/Input';
import Button from '../general/Button';

function PlayerLevelControls({player, levelUp}: {player: Player, levelUp: (levels: number) => void}): React.JSX.Element {
    const [levels, setLevels] = React.useState(1)

    return (
      <div className='shadow bg-green-200'>
          <p className='text-3xl'> Levels </p>
          <Button className='my-2' onClick={() => levelUp(1)}>1 up</Button>
          <Button className='my-2' onClick={() => levelUp(10)}>10 up</Button>
          <span className="block text-sm font-medium text-slate-700">Levels</span>
          <Input  value={levels} onChange={(event) => setLevels(+event.target.value)}/>
          <Button className='my-2' onClick={() => levelUp(levels)}>up</Button>
      </div>
    );
}


export default PlayerLevelControls;
