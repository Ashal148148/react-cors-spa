import * as React from 'react';
import { PlanResultI } from '../../interfaces/planResult';


function PlanResult({result} : {result: PlanResultI}): React.JSX.Element { 
  
  return (
    <div className="PlanResult bg-amber-50 border-2 border-black mb-2"> 
        <p>{result.characterName}</p>
        <p>job: {result.job}</p>
        <p>goal: {result.hpGoal} by level {result.levelGoal}</p>
        <p>base INT: {result.baseInt}</p>
        <p>start MP washing from {result.startingBaseInt} base INT</p>
        <p>health: {result.health}</p>
        <p>mp washes: {result.mpWashes}</p>
        <p>washes: {result.washes}</p>
        <p>fresh points into HP: {result.freshApIntoHpTotal}</p>
    </div>
  );
}



export default PlanResult;