
import React, { useState, useEffect } from 'react';

import { NavLink } from 'react-router-dom';
export default function Nutrition() 
{ 
  const [lastUpdatedEntry, setLastUpdatedEntry] = useState(null);
  const fetchLastUpdatedCalories = async () => {
    try {
      const response = await fetch('/check-login');
      const userdata = await response.json();
      console.log('Session Check',userdata) ;
     

      const Jsondata = { user :userdata.user[0]._id}

       
  
      console.log('JSON',JSON.stringify(Jsondata));

      
      const res = await fetch('/getLastUpdatedCalories', {
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
  
  useEffect(() => {
    fetchLastUpdatedCalories();
  }, []);

  return (
    <>
      <div className="container bmi-form d-flex flex-column pb-5">
        <h2 className='lable-titles text-center mt-4'>
          <span className='gradient'>nutrition</span> intake
        </h2>
        <div className="row mb-3">
          <div >
            
            <div className="row mx-auto">
              <div>
   
      {lastUpdatedEntry && lastUpdatedEntry.length > 0 && (
  <div className='lastActivity'>
    {/* <h2 className='lable-titles text-center'>Last Updated <span className="gradient">Calories</span></h2> */}
    <ul>
      {lastUpdatedEntry.map((entry, index) => (
        <li className='lable-titles' key={index}>
          <span className="gradient">Food:</span> {entry.foodName}, <span className="gradient">Portion Size:</span> {entry.portionSize}, <span className="gradient">Calories:</span> {entry.calories}
        </li>
      ))}
    </ul>
  </div>
)}
      <div className="row">
        <div className="text-center">
            <NavLink to='/nutrition'>
              <button className="Btn mt-4" >
                Add Food
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

