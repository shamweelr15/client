import React, {useState} from 'react'
import signupPic from'../images/signupPic.jpg'
import { NavLink, useNavigate } from 'react-router-dom'
function Signup() {
  let name , value;
  const navigate = useNavigate();
  const [user, setUser]= useState({
    name: "" ,
    email : "",
    phone : "",
    password : "",
    cpassword : "" 
  });
 
  const handleInput =(e)=>{
    console.log(e);
    name = e.target.name;
    value = e.target.value;
    setUser({...user, [name]:value})
   
  }

  const PostData = async (e) =>{
    e.preventDefault();
    const {name ,email,phone,password, cpassword}= user;
    const res = await fetch("/register",{
      method : "POST",
      headers:{"Content-Type": "application/json"},
      body: JSON.stringify({
        name ,email,phone,password, cpassword 
      })
    })
    try{
    const data= await res.json();
    if(res.status ===  403 || !data|| res.status === 500){
      window.alert("Invalid Registration");
      console.log("Invalid Registration");
    }else if(res.status ===  422 ){
      window.alert("User already exists");
      console.log("User already exists");
    }
    else{
      window.alert("Registration Successfull");
      console.log("Registration Successfull");
      navigate("../login", { replace: true });
    }}catch(error){
      console.error("Error parsing response:", error);
      window.alert("Error during Signup. Please try again.");
    }

  }


  return (
    <>
      <div className="container mt-5">
        <div className="signup-form ">
          <div className="row">
            <div className="col-sm-6">
        <div className="signup-content">
          <h2 className='lable-titles'><span className="gradient">Sign</span>up</h2>
          <form method='POST' className="register-form" id="register-form">
            <div className="form-groups form-group">
            
            <label htmlFor="name"><i className="zmdi zmdi-account"/>
             </label>
             <input type="text" name="name" id="name" placeholder='Your name' autoComplete='Off' value ={user.name} onChange={handleInput}/>
          
            </div>
            <div className="form-groups form-group">
            
            <label htmlFor="name"><i className="zmdi zmdi-email"/>
             </label>
             <input type="email" name="email" id="email" placeholder='Your email' autoComplete='Off' value ={user.email} onChange={handleInput}/>
          
            </div>
            <div className="form-groups form-group">
            
            <label htmlFor="phone"><i className="zmdi zmdi-phone" />
             </label>
             <input type="number" name="phone" id="phone" placeholder='Your phone number' autoComplete='Off' value ={user.phone} onChange={handleInput}/>
          
            </div>
            <div className="form-groups form-group">
            
            <label htmlFor="password"><i className="zmdi zmdi-lock"/>
             </label>
             <input type="password" name="password" id="password" placeholder='Your password' autoComplete='Off' value ={user.password} onChange={handleInput}/>
            </div>
            <div className="form-groups form-group">
            
            <label htmlFor="cpassword"><i className="zmdi zmdi-lock"/>
             </label>
             <input type="password" name="cpassword" id="cpassword" placeholder='Confirm your password' autoComplete='Off' value ={user.cpassword} onChange={handleInput}/>
            </div>
          
          <div className="mx-auto mt-4">
            <input type="button" value="Register" className="Btn" onClick={PostData}/>
          </div>
         
          </form>
        </div>
        </div>
        <div className="col-sm-6 d-flex flex-column">
          <img src={signupPic} alt="Signup" id='signupPic' />
          <NavLink to='/login' className="signup-image-link">Already registered?</NavLink>
        </div>
      </div>
      </div>
      </div>
    </>
  )
}

export default Signup
