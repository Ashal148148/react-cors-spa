import * as React from 'react';


function NoaCard(props: React.HTMLAttributes<HTMLDivElement>){
    return (        
        <div {...props} className='bg-linear-to-r from-[#DDF9FF] to-[#ADBEE9] rounded-3xl p-10 mb-6 mr-1'>        
        {props.children}
        </div>
        )}

export default NoaCard