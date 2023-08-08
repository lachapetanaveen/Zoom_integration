import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookUser from './components/Users/BookUser';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EventCalender from './components/Users/eventcalendar';
import BookingCard from './components/Users/bookingcard';
import Dashboard from './components/Users/dashboard';

function App() {
  return (
      <div>
        <ToastContainer />
       <BrowserRouter>
       <Routes>
      <Route path='/bookingcard' element={<BookingCard/>} />
       <Route path='/' element={<BookUser/>}/>
       <Route path='/eventcalender' element={<EventCalender/>}/>
       <Route path='/dashboard' element={<Dashboard/>}/>
       </Routes>
       </BrowserRouter>
      </div>
  );
}
export default App;