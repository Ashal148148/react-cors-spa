import * as React from 'react';

function Checkbox({value, label, onChange, className, id}: {value: boolean, label: string, onChange: (event: any) => void, className?: string, id?: string} ){
    return (
    <div className="flex gap-2">
        <input id={id} type="checkbox" checked={value || false} onChange={onChange} 
          className={`peer relative appearance-none shrink-0 w-6 h-6 border-1 border-black rounded-lg mt-1 bg-white
                      focus:outline-none focus:ring-offset-0 focus:ring-1 focus:ring-blue-100
                      checked:bg-[#84c690] checked:border-1
                      disabled:border-steel-400 disabled:bg-steel-400 ${className}`}/>
        <label className={`ms-2 mr-2 text-2xl font-medium text-black ${className}`}>{label}</label>
    </div>
    )
}

export default Checkbox;
