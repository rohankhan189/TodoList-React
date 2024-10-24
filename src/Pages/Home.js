import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Notecard from "../Components/Notecard";
import { MdAdd } from "react-icons/md";
import Addeditnotes from "./Addeditnotes";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom"; // for future
import axiosInstance from "../Utilis/axiosInstance";
import moment from "moment";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaCreditCard } from "react-icons/fa";


function Home() {
  const [open, setOpen] = React.useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [allNotes, setallNotes] = useState([]);
  const [search, setsearch] = useState(false);

  const notify = () => toast("deleted successfully!");

  const handleEdit = (noteDetails) => {
    setSelectedNote(noteDetails); // This line uses setSelectedNote
    setOpen(true); // Open the modal
  };

  const [arrayOfNotes, setarrayOfNotes] = useState([
    {
      title: "meeting in karachi",
      date: "2nd April",
      content: "meeting is urgent for the company",
      tags: "#Meeting",
      ispinned: true,
    },
  ]);

  const [userInfo, setuserInfo] = useState(""); // for future
  const navigate = useNavigate(); // for

  // for All notes

  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/notes/get-all-notes");
      if (response.data && response.data.notes) {
        setallNotes(response.data.notes);
      }
    } catch (error) {
      console.log("unexpected error has come");
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedNote(null);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  //// Get user-info//////////

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/users/get-users");

      if (response.data && response.data.user) {
        console.log("user data:", response.data.user);
        setuserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  /////////////delete notes////////////////////

  const deleted = async (data) => {
    const dataId = data._id;

    notify();
    try {
      const response = await axiosInstance.delete(
        "/notes/delete-note/" + dataId
      );
      if (response.data && !response.data.error) {
        getAllNotes();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.log("unexpected error has come");
      }
    }
  };

  //// UPDATE PINNED////
  const updatePinn = async (data) => {
    const dataId = data._id;
    console.log(data.isPinned);
    const content1 = {
      isPinned: !data.isPinned,
    };

    try {
      const response = await axiosInstance.put(
        "/notes/update-note-pinned/" + dataId,
        content1,
        {}
      );
      if (response.data && response.data.note) {
        getAllNotes();
      }
    } catch (error) {
      //if(error.response && error.response.data && error.response.data.message)
      {
        console.log("unexpected error has come", error);
      }
    }
  };

  /////// search for note ////
  const searchingNote = async (query) => {
    try {
      const response = await axiosInstance.get("/notes/search-notes", {
        params: { query },
      });

      if (response.data && response.data.notes) {
        //setsearch(true);
        setallNotes(response.data.notes);
        //console.log('search note is',response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubscriptionClick = () => {
    console.log("user info:",userInfo)
    navigate("/plans", { state: { userInfo: userInfo } });
  };

  useEffect(() => {
    getUserInfo();
    getAllNotes();

    return () => {};
  }, []);

  return (
    <div>
      <Navbar
        userInfo={userInfo}
        searchingNote={searchingNote}
        setallNotes={setallNotes}
      />
      <div className="container mx-auto">
        <div className="grid grid-cols-3 mt-6 gap-4 ml-5 mr-5">
          {allNotes.map((note) => (
            <Notecard
              title={note.title}
              date={moment(note.createdOn).format("Do MMMM YYYY")}
              content={note.content}
              tags={note.tags}
              ispinned={note.isPinned}
              onEdit={() => handleEdit(note)}
              onDelet={() => deleted(note)}
              onPin={() => updatePinn(note)}
            />
          ))}
        </div>
      </div>
      <button
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-40"
        onClick={handleSubscriptionClick}
      >
        <FaCreditCard className="text-[32px] text-white" />
      </button>
      <button className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10">
        <MdAdd className="text-[32px] text-white" onClick={handleOpen}></MdAdd>
      </button>

      <div
        style={{
          textAlign: "center",
          display: "block",
          padding: 30,
          margin: "auto",
        }}
      >
        <Modal
          isOpen={open}
          onRequestClose={handleClose}
          className="w-[40%] max-h-3/4 bg-white border-spacing-0 mx-auto rounded-md mt-[42px] p-5 border  shadow-sm "
        >
          <>
            <Addeditnotes
              arrayOfNotes={arrayOfNotes}
              setarrayOfNotes={setarrayOfNotes}
              selectedNote={selectedNote}
              setallNotes={setallNotes}
              allNotes={allNotes}
              setOpen={setOpen}
              getAllNotes={getAllNotes}
            ></Addeditnotes>
          </>
        </Modal>
      </div>
    </div>
  );
}

export default Home;
