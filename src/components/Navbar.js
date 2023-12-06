import React, { useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { NavLink } from 'react-router-dom'
import logo from "../images/logo.png"
import { UserContext } from '../App'
 
const RenderMenu =()=>{
  const {state}=useContext(UserContext);
if(state){
 return( <>
 <li className="nav-item mx-3">
 <NavLink className="nav-link" aria-current="page" to="/"><i className="zmdi zmdi-home"/> Home</NavLink>
</li>
<li className="nav-item mx-3">
 <NavLink className="nav-link" to="/dashboard"><i className="zmdi zmdi-chart-donut"/> Dashboard</NavLink>
</li>
<li className="nav-item mx-3">
 <NavLink className="nav-link" to="/contact"><i className="zmdi zmdi-comments"/> Contact us</NavLink>
</li> 

  <div className="mx-end"><li className="nav-item mx-3">
<NavLink  to="/logout"><button className="Btn"> Logout</button></NavLink>
</li></div>


</>
);
}else{
  return(<>
  <li className="nav-item mx-3">
 <NavLink className="nav-link" aria-current="page" to="/"><i className="zmdi zmdi-home"/> Home</NavLink>
</li>
<li className="nav-item mx-3">
 <NavLink className="nav-link" to="/dashboard"><i className="zmdi zmdi-chart-donut"/> Dashboard</NavLink>
</li>
<li className="nav-item mx-3">
 <NavLink className="nav-link" to="/contact"><i className="zmdi zmdi-comments"/> Contact us</NavLink>
</li> 
<li className="nav-item mx-3">
 <NavLink className="nav-link" to="/login"><i className="zmdi zmdi-account"/> Login</NavLink>
</li>
<li className="nav-item mx-3">
 <NavLink className="nav-link" to="/signup"><i className="zmdi zmdi-account-add"/> Signup</NavLink>
</li>
</>
 )
}
}

function Navbar() {
  
  return (
   <>
   <nav className="navbar navbar-expand-lg  bg-body-light">
  <div className="container-fluid">
    <NavLink className="navbar-brand d-flex align-items-center" to="/"><img src={logo} alt="FitFusion" id="brandLogo" /><span id="fit">Fit</span><span id='fusion'>Fusion</span></NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
       <RenderMenu />
      </ul>
     
    </div>
  </div>
</nav>
   </>
  )
}

export default Navbar
