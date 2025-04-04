import * as React from 'react';
function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement> ){

    return (
        <button {...props}
        className={`text-black p-2 rounded-4xl border-black border-1 w-full bg-[#778bda] hover:bg-[#6d7fca] active:bg-[#6374b8] focus:outline-hidden focus:ring-3 focus:ring-[#849af1] ${props.className}`}
        />
    )
}

export default Button;


// 