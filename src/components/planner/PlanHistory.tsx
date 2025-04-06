import * as React from 'react';
import PlanResult from './PlanResult';
import { PlanResultI } from '../../interfaces/planResult';
import NoaCard from '../general/NoaCard';


function PlanHistory({planHistory} : {planHistory: PlanResultI[]}): React.JSX.Element { 
  
  return (
    <NoaCard className="flex flex-col-reverse">  
        {planHistory.map((value, index) => <PlanResult result={value} key={index} />)}
        <p className='text-3xl mb-2'>Plan History</p>
    </NoaCard>
  );
}



export default PlanHistory;