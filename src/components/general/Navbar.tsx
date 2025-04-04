import * as React from 'react';
import { NavLink } from 'react-router';

function Navbar(){
    const something = "block py-1 px-4 bg-blue-700 md:bg-transparent md:dark:text-blue-500"
    const something2 = "block py-1 px-4 md:hover:bg-transparent  md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
    return (
        <nav className="shadow-2xl bg-[#D4E1F6] dark:bg-gray-900 border-none fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
            <div className=" flex flex-wrap items-center justify-between mx-auto">
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">                    
                    <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-hidden focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                        </svg>
                    </button>
                </div>
                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                    <ul className="flex flex-col md:p-0 mt-4 text-black text-2xl font-medium rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                    <li >
                        <NavLink to="/" className={({isActive}) =>  isActive ? something + " border-b-4 border-b-black" : something} aria-current="page">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/planner" className={({isActive}) => isActive ? something + " border-b-4 border-b-black" : something}>Planner</NavLink>
                    </li>
                    <li>
                        <NavLink to="/terminology" className={({isActive}) => isActive ? something + " border-b-4 border-b-black" : something}>Terminology</NavLink>
                    </li>
                    <li>
                        <NavLink to="/about" className={({isActive}) => isActive ? something + " border-b-4 border-b-black" : something}>About</NavLink>
                    </li>
                    </ul>
                </div>
            </div>
        </nav>
    )}

export default Navbar



// font-family: 'Afacad';
// font-style: normal;
// font-weight: 400;
// font-size: 30px;
// line-height: 40px;

