import * as React from 'react';
import Input from '../general/Input';
import Button from '../general/Button';

function PlayerWashControls({mpWash, hpWash, resetAllMPIntoHP, resetInt}: { mpWash: (levels: number) => void, 
    hpWash: (levels: number) => void, resetAllMPIntoHP: () => void, resetInt: () => void,
}): React.JSX.Element {
    const [mpWashes, setMpWashes] = React.useState(1)
    const [hpWashes, setHpWashes] = React.useState(1)

    return (
      <div className='shadow bg-yellow-200'>
          <p className='text-3xl'> Washing </p>
          <div id='manaWashes' className='flex flex-row'>
            <Button className='my-2' onClick={() => mpWash(1)}>1 mana wash</Button>
            <Button className='my-2' onClick={() => mpWash(10)}>10 mana wash</Button>
            <span className="block text-sm font-medium text-slate-700">Washes</span>
            <Input  value={mpWashes} onChange={(event) => setMpWashes(+event.target.value)}/>
            <Button className='my-2' onClick={() => mpWash(mpWashes)}> mana wash</Button>
          </div>
          <div id='healthWashes' className='flex flex-row'>
            <Button className='my-2' onClick={() => hpWash(1)}>1 HP wash</Button>
            <Button className='my-2' onClick={() => hpWash(10)}>10 HP wash</Button>
            <span className="block text-sm font-medium text-slate-700">Washes</span>
            <Input  value={hpWashes} onChange={(event) => setHpWashes(+event.target.value)}/>
            <Button className='my-2' onClick={() => hpWash(hpWashes)}> HP wash </Button>
          </div>
          <div id='intManipulation' className='flex flex-row'>
            <Button className='my-2' onClick={() => resetAllMPIntoHP()}> Reset all bonus mp into hp </Button>
            <Button className='my-2' onClick={() => resetInt()}> Reset INT </Button>
          </div>
      </div>
    );
}


export default PlayerWashControls;
