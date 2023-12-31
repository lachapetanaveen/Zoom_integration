  import React, { Component, useEffect,useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';




const CustomEvent = ({ event}) => {
  const selectteext = () => {
    // navigator.clipboard(event.zoomMeetingUrl)
    // .then(() => alert('Copied to Clipboard'))
    // .catch((err) => console.error('Oops, Unable to copy', err))
  }
  console.log(event,'event'&'url');
  return (
    <div>
   <p style={{color:'white'}}>{event.title}</p>
    <p style={{color:'white',cursor:'default'}}>
      <p style={{color:'black', fontFamily:'inherit'}} onClick={() => selectteext()}>
        {event.zoomMeetingUrl}
      </p>
    </p>
  </div>
  );
};

const EventCalender = () => {
    const localizer = momentLocalizer(moment);
    const [events,setEvents] = useState([])
    
    useEffect(() => {
        geteventdata();
    },[])
    const geteventdata = async() => {
        const dert = await localStorage.getItem('eventdata')
        console.log(dert,'dert');
        const dat = JSON.parse(dert);
        setEvents(dat)
    }
    const views = {
        month: true,
      };
      const eventStyle = {
        color: 'white',
        backgroundColor: '#007bff',
        borderRadius: '5px',
        padding: '5px',
        cursor: 'pointer',
      };
      const handleEventClick = (event) => {
        // Check if the event has the 'zoomMeetingUrl' property
        if (event.zoomMeetingUrl) {
          window.open(event.zoomMeetingUrl, '_blank'); // Open the Zoom meeting URL in a new tab
        }
      };
//     const startTime = moment(`${eventObject.date} ${eventObject.startTime}`);
//   const endTime = moment(`${eventObject.date} ${eventObject.endTime}`);

 
    return ( 


        <div>
{/* <header className="header-container">
      <nav>
        <ul>
          <li><a href="#">Who Booked..?</a></li>
          <li><a href="#">Join count</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </nav>
    </header> */}
    <div>
     
    </div>

            <div style={{alignItems:'center',width:'60%',marginLeft:'20%',marginTop:'80px'}}>
            {events && events.length > 0 ? 
                <Calendar
                localizer={localizer}
                events={events}
                startAccessor="startTime"
                endAccessor="endTime"
                defaultView="month"
                views={views}
                style={{ height: 500,}}
                components={{agenda:{event:CustomEvent}}}
                eventPropGetter={() => ({
                    style: eventStyle,
                  })}
                  onSelectEvent={handleEventClick}
              /> : null
            }
            </div>
        
        </div>
     );
}
 
export default EventCalender;