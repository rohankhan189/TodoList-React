import React, { useEffect,useState } from 'react'
import Tagsinput from '../Components/Tagsinput'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../Utilis/axiosInstance';



function Addeditnotes({arrayOfNotes,setarrayOfNotes,selectedNote ,setallNotes, allNotes,setOpen, getAllNotes}) {

    const [title,settitle]=useState('');
    const [content,setcontent]=useState('');
    const [tags,settags]=useState([]);
    const [error,seterror]=useState(null);

    // Populate the fields when selectedNote is available
  useEffect(() => {
    if (selectedNote) {
      settitle(selectedNote.title || '');
      setcontent(selectedNote.content || '');
      settags(Array.isArray(selectedNote.tags) ? selectedNote.tags : []);
    }
  }, [selectedNote]);

    
  const notify = () => selectedNote? toast("Edit success !"):(toast("Add is success !"));

//// for edit note ///

  const editNote=async()=>{
    const noteId=selectedNote._id;
    console.log(selectedNote._id);


    try {
      var contents = {
         title,
         content,
         tags
       };
       const response=await axiosInstance.put('/notes/edit-note/'+ noteId, contents,
         {}
     );
 
   
     if(response.data && response.data.note)
     {
      getAllNotes();
      setOpen(false);
     

     ///
     }
       
     } catch (error) {
       if(error.response && error.response.data && error.response.data.message)
       {
         seterror(error.response.data.message)
       }
       else{
         seterror('unexpected error');
       }
       
     }

  }

    const addNewNote = async() => {
      // const newNote = {
      //   title: title,
      //   content: content,
      //   tags: tags,


        
      // };
    
      // setarrayOfNotes([...arrayOfNotes, newNote]);
      notify();
      try {
        var contents = {
           title,
           content,
           tags
         };
         const response=await axiosInstance.post('/notes/add-note', contents,
           {}
       );
   
     
       if(response.data && response.data.note)
       {
        setallNotes([...allNotes,contents])
        setOpen(false);
       

       
       }
         
       } catch (error) {
         if(error.response && error.response.data && error.response.data.message)
         {
           seterror(error.response.data.message)
         }
         else{
           seterror('unexpected error');
         }
         
       }


    
    
   
    };
    

    const handleAddNotes=()=>{
      if(!title){
        seterror('please enter the title')
        return;

      }
      if(!content){
        seterror('please enter the content')
        return;

      }
      
      if(selectedNote ? editNote(): addNewNote())
     
      
      
      seterror('');
    }

    
  return (
    <div>
        <div className='flex flex-col gap-2'>
            <label className='input-label text-slate-600 text-2xl'>Title</label>
            <input 
            type='text'
            className='text-xl text-slate-950 outline-none'
            placeholder='write title'
            value={title}
            onChange={(e)=>settitle(e.target.value)}
            >
           
            </input>

        </div>
        
        <div className='flex flex-col gap-2 mt-4'>
        <label className='input-label text-2xl'>Content</label>
        <textarea
        type='text'
        className='text-sm text text-slate-950 outline-none bg-slate-50 rounded p-3'
        placeholder='content'
        rows={10}
        value={content}
        onChange={(e)=>setcontent(e.target.value)}
       
        >
</textarea>

 </div>

 <div className='mt-3'>
    <label className='input-label '>Tags</label>
    <Tagsinput tags={tags} settags={settags}></Tagsinput>
</div>
{
  error && <p className='text-red-400 text-xs pt-4'>{error}</p>
  
}

 <button className='mt-10 btn-primary font-medium'
  onClick={handleAddNotes}>
  <ToastContainer />
  {selectedNote ? 'Update Note' : 'Add Note'}</button>
 


    </div>
  )
}

export default Addeditnotes