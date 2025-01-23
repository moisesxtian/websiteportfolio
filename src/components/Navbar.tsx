import React, { useState } from 'react'
import {AiOutlineClose,AiOutlineMenu} from 'react-icons/ai'

const Navbar = () => {
    const [nav,setNav]=useState(true)
    const handleNav=()=>{
        setNav(!nav)
    }
    
  return (
    <div className="fixed top-0 left-1/2 transform -translate-x-1/2  container mx-auto flex justify-between items-center bg-white">
        <h1 className="select-none  cursor-pointer transition ease-in-out font-poppins font-bold text-3xl text-secondary-color p-4">HYX</h1>
         <ul className="hidden sm:flex space-x-5 font-medium  text-sm">
         <li className='p-4 cursor-pointer select-none px-4 hover:text-main-color transition duration-200 ease-in-out'>Home</li>
            <li className='p-4 cursor-pointer select-none px-4 hover:text-main-color transition duration-200 ease-in-out'>Projects</li>
            <li className='p-4 cursor-pointer select-none px-4 hover:text-main-color transition duration-200 ease-in-out'>Certificates</li>
            <li className='p-4 cursor-pointer select-none px-4 hover:text-main-color transition duration-200 ease-in-out'>About</li>
            <li className='p-4 cursor-pointer select-none px-4 hover:text-main-color transition duration-200 ease-in-out'>Contact</li>
         </ul>

    <div onClick={handleNav} className='flex sm:hidden p-4'>
    {!nav? <AiOutlineClose size={20}/>:<AiOutlineMenu size={20}/>}
    </div>
    <div className={nav ? 'z-0 w-48 fixed right-[-100%] top-16 opacity-0 border-s border bg-white border-gray-300 rounded-xl text-sm sm:hidden text-sm ease-in-out duration-500':'bg-white w-48 fixed right-5 top-16  opacity-100 border-s border border-gray-300 rounded-xl text-sm sm:hidden text-sm ease-in-out duration-500'}>
    <ul className='' >
            <li className='p-4 cursor-pointer select-none px-4 hover:text-main-color transition duration-200 ease-in-out'>Home</li>
            <li className='p-4 cursor-pointer select-none px-4 hover:text-main-color transition duration-200 ease-in-out'>Projects</li>
            <li className='p-4 cursor-pointer select-none px-4 hover:text-main-color transition duration-200 ease-in-out'>Certificates</li>
            <li className='p-4 cursor-pointer select-none px-4 hover:text-main-color transition duration-200 ease-in-out'>About</li>
            <li className='p-4 cursor-pointer select-none px-4 hover:text-main-color transition duration-200 ease-in-out'>Contact</li>
    </ul>
    </div>
    </div>
    
  )
}

export default Navbar