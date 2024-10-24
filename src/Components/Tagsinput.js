import React, { useState } from 'react'
import { MdAdd, MdClose } from 'react-icons/md'

function Tagsinput({tags,settags}) {

    const [input,setinput]=useState('');
    

    const addnewTag=()=>{
        if(input.trim()!=='')
        settags([...tags,input.trim()])

        setinput('');
    }
    const handlekeyDown = (e) => {
        if (e.key === 'Enter') {
            addnewTag();
          
        }
    }

    const handleremoveTag = (tag) => {
        const updatedTags = tags.filter(t => t !== tag);
        settags(updatedTags);
    }
    


  return (
    <div>
        
{ tags.length>0 && (
        <div className='flex items-center gap-2 mt-2 flex-wrap'>
         
           {tags.map((tag,index)=>(
            <span key={index} className='flex items-center  gap-2 text-sm  text-slate-900 bg-slate-100 px-3 py-1 rounded '> {tag}
            <button>
                <MdClose onClick={()=>handleremoveTag(tag)}/>
            </button>
            
            </span>
           
           ))}
            

        </div>
)
}

    <div className='flex items-center gap-4 mt-3'>
        <input 
        type='text'
     value={input}
        placeholder='enter Tags'
        className='text-sm bg-transparent border rounded  px-3 py-2 outline-none'
        onChange={(e)=>setinput(e.target.value)}
        onKeyDown={handlekeyDown}
        >
        </input>
        <button className='w-8 h-8 flex  items-center justify-center border border-blue-500 hover:bg-blue-700 rounded'
        onClick={()=>{addnewTag ()}}
        >
            <MdAdd className='text-2xl text-blue-500 hover:text-white'></MdAdd>
        </button>

        
    </div>
    </div>
  )
}

export default Tagsinput