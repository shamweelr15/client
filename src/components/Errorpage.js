import React from 'react'
import { NavLink } from 'react-router-dom'
function Errorpage() {
  return (
    <>
      <div className="error-div">
        <div className="error-404 text-center lable-titles">
            <h1>4<span className="gradient">0</span>4</h1>
            <h2>We are sorry, Page not found</h2>
            <div className="mt-3">
            <NavLink to="/"><button type="button" className='Btn'>Return to homepage</button></NavLink>
            </div>
           
        </div>
      </div>
    </>
  )
}

export default Errorpage
