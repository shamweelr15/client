
import React, { useState, useEffect } from 'react';

import { NavLink } from 'react-router-dom';
export default function Nutrition() 
{ 
  const [lastUpdatedEntry, setLastUpdatedEntry] = useState(null);
  const fetchLastUpdatedActivities = async () => {
    try {
      const response = await fetch('/check-login');
      const userdata = await response.json();
      console.log('Session Check',userdata) ;
     
      // Fetch the last updated calories from the server
      const Jsondata = { user :userdata.user[0]._id}

      const res = await fetch('/getLastUpdatedActivities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Jsondata)
      });
  
      const result = await res.json();
      console.log(result);
  
      setLastUpdatedEntry(result.lastUpdatedEntry);
    } catch (error) {
      console.error('Error fetching last updated calories:', error);
    }
  };
  
  // Call the function when needed
  useEffect(() => {
    fetchLastUpdatedActivities();
  }, []);

  return (
    <>
      <div className="container bmi-form d-flex flex-column pb-4 mb-3">
        <h2 className='lable-titles text-center mt-4'>
          <span className='gradient'>Activity</span> Recorded
        </h2>
        <div className="row">
          <div >
            
            <div className="row mx-auto">
            <div >

            {lastUpdatedEntry && lastUpdatedEntry.length > 0 && (
  <div  className='lastActivity'>
    {/* <h2 className='lable-titles text-center'>Last Updated <span className="gradient">Calories</span></h2> */}
    <ul>
      {lastUpdatedEntry.map((entry, index) => (
        <li className='lable-titles' key={index}>
          <span className="gradient">Activity:</span> {entry.activityName}, <span className="gradient">Timing:</span> {entry.timing}, <span className="gradient">Calories:</span> {entry.calories}
        </li>
      ))}
    </ul>
  </div>
)} <div className='row'>
      <div className="text-center">
      <NavLink to='/activity'>
    <button className="Btn mt-3" >
      Add Activity
    </button>
    </NavLink>
      </div>
      </div>
    </div>
              
            </div>
          </div>
         
        </div>
      </div>
    </>
  );
}

