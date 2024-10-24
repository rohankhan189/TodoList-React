import {React, useState }from 'react'
import Profileinfo from './Profileinfo'
import { useNavigate} from 'react-router-dom'
import Searchbar from './Searchbar';
import { useEffect } from 'react';

function Navbar({userInfo,searchingNote,setallNotes}) {
    const [searchquery,setsearchquery]=useState('');


    const handleclear=()=>{
        setsearchquery('');
       

    }
const handleSearch=()=>{
 // setsearchquery('');
  searchingNote();
 
    
}
    // Debounced search function
    useEffect(() => {
      const delayDebounceFn = setTimeout(() => {
        if (searchquery) {
          searchingNote(searchquery);
        }
      }, 500); // Adjust the delay as needed (e.g., 500ms)
  
      return () => clearTimeout(delayDebounceFn);
    }, [searchquery]);


    const navigate = useNavigate();
     const logout=()=>{
      
      localStorage.clear();
 
    navigate('/login');
}

const handleSearchChange = (e) => {
  const newQuery = e.target.value;
  setsearchquery(newQuery);

  // Immediately handle the case where the query becomes empty
  if (newQuery.trim() === "") {
    console.log("SEARCHBAR IS EMPTY ...");
  searchingNote(newQuery);
  }
};

  return (
    <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow'>
        <h2 className='text-xl font-medium  text-black py-2'>Notes</h2>

        <Searchbar value={searchquery} onChnage={(e)=>handleSearchChange(e)} handleclear={handleclear} handleSearch={handleSearch} ></Searchbar>
     <Profileinfo  logout={logout} userInfo={userInfo} ></Profileinfo>
      
    </div>
  )
}

export default Navbar
