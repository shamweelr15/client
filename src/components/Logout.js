import {React,useEffect,useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
function Logout() {
  const {dispatch} =useContext(UserContext);
    const navigate = useNavigate();
    useEffect(()=>{
     
        fetch('/logout',{
            method : "GET",
  headers : {
    Accept : "application/json",
    "Content-Type": "application/json"
  }
        }).then((res)=>{
          dispatch({type : "USER",payload : false});
          const sessionStorage = window.sessionStorage;

          // Clear the sessionStorage object
          localStorage.clear();
          sessionStorage.clear();
            navigate("../login", { replace: true });
            if(res.status !== 200){
                throw new Error(res.error);
            }
        }).catch((err)=>{
            console.log(err);
        })
            
        
    });
  return (
    <div>
      logout page
    </div>
  )
}

export default Logout
