import React, {useContext, useState} from 'react'

// import signupPic from'../images/signupPic.jpg'
import { NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from '../App';
function Login() {
  const navigate = useNavigate();
  const [email , setEmail] =useState('');
  const [password, setPassword] = useState('');
 const {dispatch} =useContext(UserContext)

  const loginUser = async (e) => {
    e.preventDefault();
    const res = await fetch('/signin', {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email,
            password
        })
    });
    console.log("Response status:", res.status);
    try {
        const data = await res.json();
        console.log("My JSON:", data);
        console.log("Response data:", data);      

        if (res.status === 400 || !data) {
            window.alert("Invalid credentials");
        } else {
          dispatch({type : "USER",payload : true});
            window.alert("Login Successful");
            // Data of Users Json ??

            navigate("../", { replace: true });
        }
        
    } catch (error) {
        console.error("Error parsing response:", error);
        window.alert("Error during login. Please try again.");
    }
  



  }
  return (
    <>
    <div className="container mt-5">
        <div className="signup-form">
         
        <div className="signup-content">
          <h2 className='lable-titles'><span className="gradient">Log</span>in</h2>
          <form className="register-form" method = "POST" id="register-form">
           
            <div className="form-groups form-group">
            
            <label htmlFor="name"><i className="zmdi zmdi-email"/>
             </label>
             <input type="email" name="email" id="email" placeholder='Your email' value={email} onChange={(e)=>setEmail(e.target.value)} autoComplete='Off'/>
          
            </div>
            
            <div className="form-groups form-group">
            
            <label htmlFor="password"><i className="zmdi zmdi-lock"/>
             </label>
             <input type="password" name="password" id="password" value={password} onChange={(e)=>setPassword(e.target.value)}  placeholder='Your password' autoComplete='Off'/>
            </div>
            
          
          <div className="mx-auto mt-4">
            <input type="button"  value="Login" onClick={loginUser} className="Btn" />
          </div>
          <div className="mt-4 mx-auto">
            <span>New User </span>
          <NavLink to='/signup' className="signup-link">Register Now!</NavLink>
          </div>
         
          </form>
        </div>
        </div>
        
          {/* <img src={signupPic} alt="Signup" id='signupPic' /> */}
         
      
      </div>

    </>
  )
}

export default Login
