import * as React from 'react';
import Input from '../general/Input';
import Button from '../general/Button';
import NoaCard from '../general/NoaCard';

function PlayerLevelControls({ levelUp, resetPlayer }: { levelUp: (levels: number) => void, resetPlayer: () => void}): React.JSX.Element {
    const [levels, setLevels] = React.useState(1)

    return (
      <NoaCard id="levelControls">
          <p className='text-3xl'> Levels </p>
          <div className='flex flex-row'>
            <Button className='my-2' onClick={() => levelUp(1)}>1 up</Button>
            <Button className='my-2' onClick={() => levelUp(10)}>10 up</Button>
            <span className="block text-sm font-medium text-slate-700">Levels</span>
            <Input  value={levels} onChange={(event) => setLevels(+event.target.value)}/>
            <Button className='my-2' onClick={() => levelUp(levels)}>up</Button>
          </div>
          <Button onClick={resetPlayer}>Reset to level 1</Button>
      </NoaCard>
    );
}


export default PlayerLevelControls;
