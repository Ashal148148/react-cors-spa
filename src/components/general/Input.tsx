import * as React from 'react';

function Input(props: React.InputHTMLAttributes<HTMLInputElement> ){

    return (
    <input {...props}
        className={`my-2 block w-full px-3 py-2 bg-white border border-solid border-black rounded-3xl text-lg shadow-sm placeholder-slate-400 \
        focus:outline-hidden focus:border-sky-500 focus:ring-1 focus:ring-sky-500 placeholder:italic ${props.className}`}
        />
    )
}

export default Input;