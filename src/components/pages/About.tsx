import * as React from 'react';


function About(): React.JSX.Element { 
  
  return (
    <div className="About">  
        <div id='title' className={"text-white bg-[url('/src/resources/mlbanner.png')] pt-24 pb-14 bg-bottom bg-cover"}>     
            <p className='text-center w-full h-full font-bold text-5xl brightness-200'>Welcome to BattleCat's HP washing calculator</p>
            <p className='text-center w-full h-full text-2xl'>No more google sheet calculators</p>
        </div>
        <div id='page-content' className='rounded-t-3xl p-10 bg-[#D4E1F6] -mt-5 flex'>
          if you found a bug let me know at discord shaul_carvalho
        </div>
    </div>
  );
}



export default About;