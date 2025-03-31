import * as React from 'react';
import { EquipmentI } from '../../interfaces/equipment';
import EquipmentRegistration from './EquipmentRegistration';
import EquipmentCarousel from './EquipmentCarousel';
import Expand from '../general/Expand';

function EquipmentExpand({ equipment, registerEquip, removeEquip }: 
    {equipment: EquipmentI[], registerEquip: (equip: EquipmentI) => void, removeEquip: (index: number) => void}): React.JSX.Element {
    return (
      <Expand title='Gears'>
        <EquipmentRegistration registerEquip={registerEquip}></EquipmentRegistration>
        <EquipmentCarousel equipment={equipment} removeEquip={removeEquip}/>    
      </Expand>
    );
}


export default EquipmentExpand;
