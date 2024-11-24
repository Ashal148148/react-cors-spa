import * as React from 'react';
import Input from '../general/Input';
import Select from '../general/Select';
import { Job, jobs } from '../../logic/job';
import NoaCard from '../general/NoaCard';
import Button from '../general/Button';
import EquipmentRegistration from '../equipment/EquipmentRegistration';
import EquipmentCarousel from '../equipment/EquipmentCarousel';
import { EquipmentI } from '../../interfaces/equipment';

function PlayerRegistration({ setPlayerName, setPlayerJob, setPlayerMapleWarriorPercent, equipment, registerEquip, removeEquip}:
   { setPlayerName: (levels: string) => void, setPlayerJob: (job: Job) => void, setPlayerMapleWarriorPercent: (percent: number) => void,
    equipment: EquipmentI[], registerEquip: (equip: EquipmentI) => void, removeEquip: (index: number) => void }): React.JSX.Element {
      const [equipmentOpen, setEquipmentOpen] = React.useState(false)

    return (
      <NoaCard id="playerRegistration">
          <p className='text-3xl text-center mb-6'> Registration </p>
          <div className='flex flex-row justify-center'>
            <form className='max-w-sm grow mr-10'>
              <span className="block mb-2 text-2xl font-medium text-slate-700">Name:</span>
              <Input className='sp-2.5' onBlur={(event) => setPlayerName(event.target.value)}/>  
            </form>  
            <form className="max-w-sm mr-10 grow">
              <label htmlFor='job' className="block mb-2 text-2xl font-medium text-gray-900 dark:text-white"> Class: </label>        
              <Select title='Class:' id='job' onChange={(event) => setPlayerJob(jobs[event.target.value])}> 
                  <option value="Archer/Thief">Archer/Thief</option>
                  <option value="Brawler">Brawler</option>
                  <option value="Gunslinger">Gunslinger</option>
                  <option value="Hero">Hero</option>
                  <option value="Mage">Mage</option>
                  <option value="Spearman/Paladin">Spearman/Paladin</option>
              </Select>
            </form>
            <form className="max-w-sm grow">
              <label htmlFor='mwp' className="block mb-2 text-2xl font-medium text-gray-900 dark:text-white"> Maple warrior %: </label>
              <Select title='Maple warrior %:' id='mwp' defaultValue={10} onChange={(event) => setPlayerMapleWarriorPercent(+event.target.value)}> 
                  <option value={0}>0</option>
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={15}>15</option>
              </Select>
            </form>
          </div>
        <Button onClick={() => setEquipmentOpen(!equipmentOpen)}> expand me for gears </Button>
        <div className={`${equipmentOpen ? 'block' : 'hidden'}`}>
          <EquipmentRegistration registerEquip={registerEquip}></EquipmentRegistration>
          <EquipmentCarousel equipment={equipment} removeEquip={removeEquip}/>
        </div>      
      </NoaCard>
    );
}
// "Brawler": buccaneer, "Gunslinger": corsair, "Hero": hero, "Spearman/Paladin":dk_paladin, "Mage"

export default PlayerRegistration;

/* Rectangle 6 */

// background: linear-gradient(90deg, #DDF9FF 0%, #ADBEE9 100%);
// box-shadow: 0px 0px 11.4px 5px rgba(0, 0, 0, 0.5);
// border-radius: 21px;
