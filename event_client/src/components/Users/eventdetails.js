import React, { Component,useState,useEffect } from 'react'


const EventDetails = () => {
    const [paginatedData,setPaginatedData] = useState([])
    useEffect(() => {
        getdata();
    },[])
    const getdata = async() => {
        const der = await localStorage.getItem('eventdata');
       const data = JSON.parse(der);
       setPaginatedData(data)
    }
    
    return ( 
        <>
            <div  style={{marginTop:'20px',}}>
            <table className="table">
                  <thead className="thead-light">
                    <tr className='th-bg'>
                      {/* <th style={{fontWeight:700,}}>No.</th> */}
                      <th style={{ fontWeight: 700, textAlign: 'center' }}>Name </th>
                      <th style={{ fontWeight: 700, textAlign: 'center' }}>Email</th>
                      <th style={{ fontWeight: 700, textAlign: 'center' }}>Event Name</th>
                      <th style={{ fontWeight: 700, textAlign: 'center' }}>Date</th>
                      <th style={{ fontWeight: 700, textAlign: 'center' }}>Start Time - End Time
                      </th>
                      <th style={{ fontWeight: 700, textAlign: 'center' }}>Meeting URL
                      </th>
                     
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData && paginatedData.length > 0 ?
                      paginatedData.map((output) => {
                        const startdateObj = new Date(output.startTime);
                        const enddateObj = new Date(output.endTime);
                        const hours = startdateObj.getHours();
                        const minutes = startdateObj.getMinutes();
                        const endhours = enddateObj.getHours();
                        const endminiutes = enddateObj.getMinutes()
                        return (
                          <tr>
                            <td style={{ textAlign: 'center' }}>{output.name}</td>
                            <td style={{ textAlign: 'center' }}>{output.email}</td>
                            <td style={{ textAlign: 'center' }}>{output.title}</td>
                            <td style={{ textAlign: 'center' }}>{output.date}</td>
                            <td style={{ textAlign: 'center' }}>{hours}:{minutes} - {endhours}:{endminiutes}</td>
                            <td style={{ textAlign: 'center' }}>{output.zoomMeetingUrl}</td>
                            
                          </tr>
                        )
                      }) :
                      <tr>
                        <td>No Users Available</td>
                      </tr>
                    }
                  </tbody>
                </table>
            </div>
        </>
     );
}
 
export default EventDetails;