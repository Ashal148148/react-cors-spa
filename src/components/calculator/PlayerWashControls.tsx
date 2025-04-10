import * as React from 'react';
import Input from '../general/Input';
import Button from '../general/Button';
import Expand from '../general/Expand';

function PlayerWashControls({mpWash, hpWash, resetAllMPIntoHP, resetInt}: { mpWash: (levels: number) => void, 
    hpWash: (levels: number) => void, resetAllMPIntoHP: () => void, resetInt: () => void,
}): React.JSX.Element {
    const [mpWashes, setMpWashes] = React.useState(1)
    const [hpWashes, setHpWashes] = React.useState(1)

    return (
      <Expand id="playerWashControls" title='Washing'>
          <div id='manaWashes' className='flex flex-row mb-4'>
            <span className="block mr-2 pt-3 text-2xl font-medium text-black">Washes:</span>
            <Input  value={mpWashes} onChange={(event) => setMpWashes(+event.target.value)} className='mr-2'/>
            <Button className='my-2' onClick={() => mpWash(mpWashes)}> mana wash</Button>
          </div>
          <div id='healthWashes' className='flex flex-row mb-4'>
            <span className="block mr-2 pt-3 text-2xl font-medium text-black">Washes:</span>
            <Input  value={hpWashes} onChange={(event) => setHpWashes(+event.target.value)} className='mr-2'/>
            <Button className='my-2' onClick={() => hpWash(hpWashes)}> HP wash </Button>
          </div>
          <div id='intManipulation' className='flex flex-row'>
            <Button className='my-2 mr-2' onClick={() => resetAllMPIntoHP()}> Reset all bonus mp into hp </Button>
            <Button className='my-2' onClick={() => resetInt()}> Reset INT </Button>
          </div>
      </Expand>
    );
}


export default PlayerWashControls;
