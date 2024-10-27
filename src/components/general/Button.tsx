import * as React from 'react';
function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement> ){

    return (
        <button {...props}
        className={`text-white rounded-md w-full bg-sky-500 hover:bg-sky-600 active:bg-sky-700 focus:outline-none focus:ring focus:ring-sky-300 ${props.className}`}
        />
    )
}

export default Button;
