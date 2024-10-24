import React from 'react'
import { getinitials } from '../Utilis/helper'

const Profileinfo=({logout,userInfo})=> {

  
  return (
    <div className='flex items-center gap-3'>
        <div className='w-12 h-12  justify-center p-3  rounded-full text-slate-950 font-medium bg-slate-100 '>
        {getinitials(userInfo?.fullName)}
      
         </div>

    <div> 
        <p className='text-sm font-medium'>{userInfo.fullName}</p>
       
        <button className='text-sm bg-slate-100 underline' onClick={logout}>Logout</button>
      
    </div>
    </div>
  )
}

export default Profileinfo
