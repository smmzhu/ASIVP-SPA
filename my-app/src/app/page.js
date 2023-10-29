"use client";
import Image from 'next/image'
import {useState, useRef, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers'; 
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Spacing } from '@mui/system';
import {Button} from '@mui/material';
import DOMPurify from 'dompurify';
import dayjs from 'dayjs';


export default function Home() {
  const [editing, setEditing] = useState(false);
  const [pfp, setPfp] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [date, setDate] = useState(null);
  const [isFirstSubmit, setIsFirstSubmit] = useState(true);
  const hiddenFileInput = useRef(null);
  const buttonStyle = {mb: 2};
  const handleClick = event => {
    hiddenFileInput.current.click();
  };
  const handleCancel = event => {
    setEditing(false);
    if (isFirstSubmit){
      setPfp(null);
      setName(null);
      setEmail(null);
      setDate(null);
    }
  }

  const handleNameChange = event => {
    setName(DOMPurify.sanitize(event.target.value));
  }
  const handleEmailChange = event => {
    setEmail(DOMPurify.sanitize(event.target.value));
  }
  const handleFileUpload = event => {
    const fileUploaded = event.target.files[0];
    //check if file is an image
    if (!fileUploaded.type.startsWith('image/')){
      alert("Please upload an image file.");
      return;
    }
    //save file to directory
    setPfp(DOMPurify.sanitize(URL.createObjectURL(fileUploaded)));
  };
  const handleSubmit = event => {
    if(name == null || email == null || date == null){
      alert("Please fill out all fields.");
      return;
    }
    if (pfp == null){
      alert("Please upload a profile picture.");
      return;
    }
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!validRegex.test(email)){
      alert("Please enter a valid email address.");
      return;
    }
    alert("Name: " + name + "\n" + "Email: " + email + "\n" + "Date of Birth: " + dateString);
    setIsFirstSubmit(false);
    setEditing(false);
  }
  const dateString = date ? date.toString().split(" ")[1] + " " + date.toString().split(" ")[2] + " " + date.toString().split(" ")[3]: null;

  return (
    <main className="flex flex-col items-center justify-center h-screen w-full bg-gradient-to-l from-purple-600 to-blue-400">
      {!editing ? (
        <div className="flex h-auto w-1/3 bg-white flex-col justify-around items-center rounded-lg drop-shadow-lg	">
        <div className ="flex items-center flex-col mt-5">
          <div className= "flex my-2 bg-white text-black">
            {pfp ? <Image src={pfp} width = {150} height = {150} className = " flex h-48 w-48 mb-2 mt-5"/> : "No image uploaded."}
          </div>
          <div className ="flex my-2 bg-white text-black">
            {name ? "Name: " + name: "No name entered."}
          </div>
          <div className ="flex my-2 bg-white text-black">
            {email ? "Email: " + email: "No email entered."}
          </div>
          <div className ="flex mt-2 mb-5 bg-white text-black">
            {date ? "Date of Birth: " + dateString: "No date entered."}
          </div>
        </div>
        <Button
          variant="contained" 
          className ="flex bg-white text-black"
          onClick={() => setEditing(true)}
          sx = {buttonStyle}
        >
          edit
        </Button>
      </div>
      ) : (
        <div className="flex h-auto w-1/3 bg-white flex-col justify-around items-center rounded-lg drop-shadow-lg	">
          <div className ="flex items-center flex-col text-black mt-5">
            {pfp ? <Image src={pfp} width = {150} height = {150} className = "flex mb-2 mt-5"/> : "No image uploaded."}
            <Button
              variant="contained"
              className ="flex h-8 w-36 bg-blue-500 mb-2 justify-center"
              onClick={handleClick}
              sx = {buttonStyle}
            >
              upload
            </Button>
            <div className='m-2'>
              <TextField id="outlined-basic" label="Name" variant="outlined" onChange={handleNameChange}/>
            </div>
            <div className='m-2'>
              <TextField id="outlined-basic" label="Email" variant="outlined" onChange={handleEmailChange}/>
            </div>
            <div className='m-2'>
              <LocalizationProvider className = "my-2" dateAdapter={AdapterDayjs}>
                <DatePicker label="Date of Birth" onChange={(val) => {setDate(val);}} maxDate={dayjs(new Date())}/>
              </LocalizationProvider>
            </div>
          </div>
          <Button 
            variant="contained"
            className ="flex bg-white text-black"
            onClick={handleCancel}
            sx = {buttonStyle}
          >
            cancel
          </Button>
          <input
            type="file"
            onChange={handleFileUpload}
            ref={hiddenFileInput}
            style={{display: 'none'}} // Make the file input element invisible
          />
          <Button 
            variant="contained"
            className ="flex bg-white text-black"
            onClick={handleSubmit}
            sx = {buttonStyle}
          >
            submit
          </Button>
        </div>
      )}
    </main>
  )
}
