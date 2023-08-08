import React, { Component,useState } from 'react'
import EventCalender from './eventcalendar';
import EventDetails from './eventdetails';
const Dashboard = () => {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabClick = (index) => {
      setActiveTab(index);
    };
    return ( 
        <>
            <div>
            <div>
        <button   onClick={() => handleTabClick(0)} className={activeTab === 0 ? 'active' : ''}>
        Calendar Event
        </button>  
        <button onClick={() => handleTabClick(1)} className={activeTab === 1 ? 'active' : ''}>
        User Details
        </button>

      </div>
      {activeTab === 0 ? 
            <EventCalender /> :
            <EventDetails /> 
           
        }
            </div>
        </>
     );
}
 
export default Dashboard;