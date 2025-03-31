import * as React from 'react';

export interface ExpandI extends React.HTMLAttributes<HTMLElement> {
    title?: string,
}


function Expand(props: ExpandI){
    const [expanded, setExpanded] = React.useState(false)
    const ref = React.useRef(null)
    return (       
        <div id='expand' className={`bg-linear-to-r from-[#DDF9FF] to-[#ADBEE9] rounded-3xl p-10 mb-6 mr-1 shadow-lg`}>
            <button className='w-full flex justify-between' onClick={() => setExpanded(!expanded)}>
              <span className='text-3xl'>{props.title}</span>
              <svg data-accordion-icon className={`w-3 h-3 ${ expanded? '' : 'rotate-180'} shrink-0 translate-y-3`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5"/>
             </svg>
            </button>
            <div style={{maxHeight: `${expanded ? `${ref.current.clientHeight}px` : '0'}`}} id='collapse' className={`overflow-hidden transition-all duration-300 ease-in-out` /* the animation is based on the height change, which means i have to give it a high that is slightly bigger than the height of the children */}>
                
                <div id='collapse-content' ref={ref}>
                    {props.children}
                </div>
            </div>
        </div> 
        )}

export default Expand