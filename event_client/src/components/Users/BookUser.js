import React, { useState,useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import moment from 'moment';
import { createZoomMeeting } from "../common/zoomapi";
import axios from "axios";
import { useLocation, useHistory } from 'react-router-dom';
import {
    Modal,
    Box,
    TextField,
    Button,
    IconButton,
    Typography,
  } from '@mui/material';
  import CloseIcon from '@mui/icons-material/Close';
// import './App.css';
// import Resources from 'util';
// const clientId = 'uveX3ZbSPyHwFpyHDszEg';
// const redirectUri = 'https://bookeventolive.netlify.app/';
const CLIENT_ID = 'GGZE4HmwTlGyBqcT4Z53Hg'; // Replace with your Zoom OAuth Client ID
const REDIRECT_URI = 'https://cb82-183-82-122-12.ngrok-free.app/';
const scope = 'meeting:write';
const BookUser = () => {
    let navigate = useNavigate();
    
   const [eventname,setEventName] = useState('');
   const [date,setDate] = useState(new Date());
   const [startTime,setStartTime] = useState('')
   const [endTime,setEndTime] = useState('')
   const [code,setCode] = useState('')
   const [isEndTimeValid, setIsEndTimeValid] = useState(true);
   const [zoomMeetingUrl,setZoomMeetingUrl] = useState('');
   const [accesstoken,setAccesstoken] = useState('')
   const [open, setOpen] = useState(false);
   const [userName,setUsertName] =useState('');
   const [email,setUserEmail]= useState('');
    const [message, setMessage] = useState("");
    const { user } = useParams();
    const handleOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
    const handleStartTimeChange = (e) => {
        setStartTime(e.target.value);
        validateEndTime(e.target.value, endTime);
      };
    
      const handleEndTimeChange = (e) => {
        setEndTime(e.target.value);
        validateEndTime(startTime, e.target.value);
      };
    
      const validateEndTime = (start, end) => {
        const startTimeObject = new Date(`1970-01-01T${start}`);
        const endTimeObject = new Date(`1970-01-01T${end}`);
        setIsEndTimeValid(endTimeObject >= startTimeObject);
      };
      useEffect(() => {
        
        // const authorizationurl = `https://zoom.us/oauth/authorize?response_type=code&client_id=su0jFAiWSgqqwB5elRYk3A&redirect_uri=https%3A%2F%2F2a85-183-82-122-12.ngrok-free.app%2F`
        // // Check if the URL contains the authorization code after redirect
        // window.location.href = authorizationurl
      
       
       
        // If there's an authorization code, exchange it for the access token
        // if (code) {
          // Call the backend to get the Zoom access token
         
          getcode()
        // }
      }, []);
     const getcode = async() => {
        const urlParams = new URLSearchParams(window.location.search);
        console.log(urlParams,'urlparams');
        const code = urlParams.get("code");
        console.log(code,'code');
        // if(code){
        //     const dert = await localStorage.setItem(code,'code')
            setCode(code)
        // }else{

        // }
       
     }
    //👇🏻 logs the user's details to the console
   const bookevent = async() => {
    if(!eventname){
        toast.error('Enter Event Name')
    }else if(!date) {
        toast.error('Select Date')
    }else if(!startTime){
        toast.error('select Start Time')
    }else if(!endTime){
        toast.error('select End Time')
    }else if(!isEndTimeValid){
        toast.error('End time must be after start time')
    }else{
        try {
            const startTimeObject = moment(`${date} ${startTime}`, 'YYYY-MM-DD HH:mm');
            const endTimeObject = moment(`${date} ${endTime}`, 'YYYY-MM-DD HH:mm');
            console.log(startTimeObject,endTimeObject,'datetimemerge');
  const meetdata = {
    title:eventname,
                date:date,
                startTime:startTimeObject,
                endTime:endTimeObject
  }
  console.log(meetdata,'meetdata');
  const getco = await localStorage.getItem('code')
  const response = await axios.get(`http:localhost:5000/zoom-token?code=${code}&redirectUri=${REDIRECT_URI}`);
      const accessToken = response.data.access_token;
      console.log(accessToken,'accessToken');
            const obj = {
                title:eventname,
                date:date,
                startTime:startTime,
                endTime:endTime,
                // accessToken:accessToken
                // url:zoomMeetingUrl
            }
            console.log(obj,'obj');
            const meetingResponse = await axios.post('http:localhost:5000/create-zoom-meeting',obj,{
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              });
            console.log(meetingResponse,'meetingResponse');
            setZoomMeetingUrl(meetingResponse.data.zoomMeetingUrl)
            const evdata = {
                title:eventname,
                date:date,
                startTime:startTimeObject,
                endTime:endTimeObject,
                name:userName,
                email:email,
                zoomMeetingUrl:meetingResponse.data.zoomMeetingUrl
            }
            const data = await localStorage.getItem('eventdata');
            console.log(data,'data');
            if(data !== null){
                console.log('if condition');
                const fer = JSON.parse(data)
                let arr = [...fer]
               arr.push(evdata);
               const detset = await localStorage.setItem('eventdata',JSON.stringify(arr))
               
                navigate('/dashboard')
            }else{
                console.log('else condition');
                let arr = [];
                let der = arr.push(evdata);
                const detset = await localStorage.setItem('eventdata',JSON.stringify(arr))
                navigate('/dashboard')
            }

        } catch (ex) {
            console.log(ex,"error displaying")
        }   
    }
       
   }
    return (
        
        <div className='bookContainer'>
            <h2 style={{color:'#a02121'}}className='bookTitle'>Creating Event</h2>
            <div className='booking__form'>
                <label htmlFor='fullName'>Event Name</label>
                <input
                    id='eventname'
                    name='eventname'
                    type='text'
                    required
                    value={eventname}
                    onChange={(e) => setEventName(e.target.value)}
                />
                <label htmlFor='email'>Date</label>
                <input
                    
                    name='date'
                    required
                    type='date'
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                <label htmlFor='email'>Start Time</label>
                <input
                    
                    name='time'
                    required
                    type='time'
                    value={startTime}
                    onChange={handleStartTimeChange}
                />
                <label htmlFor='email'>End Time</label>
                <input
                    
                    name='endtime'
                    required
                    type='time'
                    value={endTime}
                    onChange={handleEndTimeChange}
                />
                {isEndTimeValid ? null : <p style={{color:'red',marginBottom:'10px'}}>End time must be after start time.</p>}
                <label htmlFor='message'>Any important note? (optional)</label>
                <textarea
                    rows={5}
                    name='message'
                    id='message'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />

                {/* <label htmlFor='session'>
                    Select your preferred session - GMT+2 Jerusalem
                </label> */}

                <button style={{backgroundColor:'#a02121'}} onClick={() => handleOpen()} className='bookingBtn'>Book Event</button>
            </div>
            <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            minWidth: 300,
            maxWidth: 400,
            borderRadius: 4,
          }}
        >
          <IconButton
            edge="end"
            backgroundcolor="inherit"
            onClick={handleClose}
            sx={{ position: 'absolute', top: 5, right: 5 }}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h5" gutterBottom>
            Bio-Event
          </Typography>
         
            <TextField
              label="Event Name"
              fullWidth
              margin="normal"
              variant="outlined"
              value={eventname}
              onChange={(e) => setEventName(e.target.value)}
            />
             <TextField
              label="User Name"
              fullWidth
              margin="normal"
              variant="outlined"
              value={userName}
              onChange={(e) => setUsertName(e.target.value)}
            />
            <TextField
              type="text"
              label="User Email"
              fullWidth
              margin="normal"
              variant="outlined"
              value={email}
              onChange={(e) => setUserEmail(e.target.value)}
            />
            <Button onClick={() => bookevent()}  type="submit" variant="contained" color="primary" fullWidth>
              Book
            </Button>
         
        </Box>
      </Modal>
        </div>
    );
};  

export default BookUser;