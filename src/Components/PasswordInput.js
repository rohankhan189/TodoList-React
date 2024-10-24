import React, { useState } from 'react'
import {FaRegEye,FaRegEyeSlash} from 'react-icons/fa6'

function PasswordInput({value,onChange,placeholder}) {

const [showpasswod,setshowpassword]=useState(false);

const toogleshow=()=>
{
    setshowpassword(!showpasswod);

}

  return (
    <div className='flex items-center bg-transparent border-[1.5px] px-5 rounded mt-3 by-3'>
        {/* // adding custom css for microsoftedge browser */}
         <style>{`
        input[type="password"]::-ms-reveal,
        input[type="password"]::-ms-clear {
          display: none;
        }
      `}</style>
   <input 
   value={value}
   onChange={onChange}
   type={showpasswod? 'text': 'password'}
   placeholder={placeholder||'Password'}
   className='w-full text-sm bg-transparent py-3 mr-3 rounded outline-none'
   >
 </input>

{showpasswod? (<FaRegEye 
  size={22} 
  className='text-primary cursor-pointer' 
  onClick={()=>toogleshow()}/>
):
 (<FaRegEyeSlash
  size={22}
   className='text-slate-400 cursor-pointer'
    onClick={()=>toogleshow()}
   />)
}
  
    </div>
  )
}

export default PasswordInput
