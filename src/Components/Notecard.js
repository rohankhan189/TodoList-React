import React from 'react'
import { VscPinned } from "react-icons/vsc";
import { MdDelete } from "react-icons/md";
import { IoMdCreate } from "react-icons/io";
import { ToastContainer } from 'react-toastify';


function Notecard({
    title,
    date,
    content,
    tags,
    ispinned,
    onEdit,
    onDelet,
    onPin
})

{


  
  return (
    <div className='border rounded p-4 bg-white hover:shadow-xl shadow-sm transition-all ease-in-out'>
        <div className='flex items-center justify-between gap-4'> 

        <div>
        <h6 className='text-sm font-medium'>{title}</h6>
        <span className='text-slate-500'>{date}</span>
        </div>
        <VscPinned className={`btn-icon cursor-pointer ${ispinned? 'text-primary':'text-slate-500'}`} onClick={onPin} size={22}/>
        </div>
        <p className='text-sm'>{content?.slice(0,60)}</p>
<div className='flex items-center justify-between'>
        <div className='flex text-slate-500'>{tags.map((item)=>` #${item}`)} </div>

        <div className='flex'> 
          <button onClick={onEdit}>
          <IoMdCreate className='icon-btn hover:text-green-500'  size={20}/>
        
          </button>
      <button onClick={onDelet} >
      <ToastContainer />
        <MdDelete className='icon-btn hover:text-red-500' size={20}/> 
      

         </button>
        </div>
        </div>
       
      
    </div>
  )
}

export default Notecard
