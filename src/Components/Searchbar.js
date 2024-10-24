import React from 'react'
import { IoSearchOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";

export default function Searchbar({value,onChnage,handleclear,handleSearch}) {
 

    const handleclick=()=>{

      handleSearch();
    }


  return (
    <div className='w-80 flex items-center px-4 bg-slate-100 rounded-md'>
        <input
        type='text'
        value={value}
        placeholder='enter for search'
        className='w-full text-sm bg-transparent py-[11px] outline-none'
        onChange={onChnage}

        >
        </input>
        {value &&  <RxCross1  className='text-slate-500 hover:text-black cursor-pointer mr-3' size={20} onClick={handleclear} />
        
        }
       
        <IoSearchOutline className='text-slate-500 hover:text-black cursor-pointer' size={22} onChange={handleclick} />
      
    </div>
  )
}
