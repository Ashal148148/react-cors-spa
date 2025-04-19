import * as React from 'react';


function About(): React.JSX.Element { 
  
  return (
    <div className="About flex flex-col h-full">  
        <div id='title' className={"text-white bg-[url('/src/resources/mlbanner.png')] pt-24 pb-14 bg-bottom bg-cover flex flex-col"}>     
            <p className='text-center w-full h-full font-bold text-5xl brightness-200'>Welcome to BattleCat's HP washing calculator</p>
            <p className='text-center w-full h-full text-2xl'>No more google sheet calculators</p>
        </div>
        <div id='page-content' className='rounded-t-3xl p-10 bg-[#D4E1F6] -mt-5 flex flex-col flex-1'>
          <p>if you found a bug let me know at discord shaul_carvalho</p>
          <p>this website is still a work in progress</p>
        </div>
        
    </div>
  );
}



export default About;