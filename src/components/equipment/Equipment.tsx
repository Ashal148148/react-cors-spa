import * as React from 'react';
import { EquipmentI } from '../../interfaces/equipment';
import CloseIcon from '../../resources/logo.svg'

function Equipment({equip, removeEquip, index}: {equip: EquipmentI, removeEquip: (index: number) => void, index: number}): React.JSX.Element {
    return (
      <div className="group flex flex-col items-center p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <button className='size-5 top-4 right-4 absolute sm:hidden group-hover:block' onClick={() => removeEquip(index)}> <img src={CloseIcon} alt='close'/></button>
          <p className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>{equip.name}</p>
          <p className='font-normal text-gray-700 dark:text-gray-400'>category: {equip.category}</p>
          <p className='font-normal text-gray-700 dark:text-gray-400'>level: {equip.level}</p>          
          <p className='font-normal text-gray-700 dark:text-gray-400'>INT: {equip.INT}</p>
      </div>
    );
}


export default Equipment;
