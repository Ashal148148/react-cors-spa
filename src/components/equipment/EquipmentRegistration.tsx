import * as React from 'react';
import { EquipmentI } from '../../interfaces/equipment';
import Input from '../general/Input';
import Button from '../general/Button';

function EquipmentRegistration({registerEquip}: {registerEquip: (equip: EquipmentI) => void}): React.JSX.Element {
  const [equipName, setEquipName] = React.useState('')
  const [category, setCategory] = React.useState('')
  const [level, setLevel] = React.useState(0)
  const [INT, setINT] = React.useState(0)
  
  const validateAndRegisterEquip = () =>{
    if (equipName === '' || category === '' || level === 0 || INT === 0){
      alert('make sure to fill all the fields') //TODO change to something other than alert
    } else {
      registerEquip({name: equipName, category: category, level: level, INT: INT})
    }
  }

  return (
    <div>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700">Item Name</span>
          <Input type="text" placeholder='Zakum Helmet' title='name' onChange={(event) => setEquipName(event.target.value)}/>
          <span className="block text-sm font-medium text-slate-700">Item Category</span>
          <Input type="text" placeholder='Helmet' title='category' onChange={(event) => setCategory(event.target.value)}/>
          <span className="block text-sm font-medium text-slate-700">Level Required</span> 
          <Input type="number" placeholder='50' title='level' onChange={(event) => setLevel(+event.target.value)}/>
          <span className="block text-sm font-medium text-slate-700">Bonus INT</span>
          <Input type="number" placeholder='30' title='INT' onChange={(event) => setINT(+event.target.value)}/>
          <Button onClick={validateAndRegisterEquip}>Confirm</Button>
        </label>
      </div>
  );
}


export default EquipmentRegistration;
