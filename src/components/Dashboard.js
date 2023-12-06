import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Bmi from "./Bmi";
import Nutrition from "./Nutrition";
import Activity from "./Activity";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function Dashboard() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState();

  const callDashboard = async () => {
    try {
      const response = await fetch('/check-login');
      const data = await response.json();
      console.log('Session Check',data) ;
      if(data.loggedIn){
        setUserData(data.user[0].name);
        console.log(data.user[0].name)
      }
      else
      {
        navigate("../login", { replace: true });
      }
    } catch (err) {
      console.log(err);
      navigate("../login", { replace: true });
    }
  };
  useEffect(() => {
    callDashboard();
  }, []);

  return (
    <>
      <div className="container">
        <h1 className="lable-titles text-center mb-4">
          <span className="gradient">Dash</span>board
        </h1>

        <h1 className="lable-titles text-center bmi-form mb-3">
          {userData}
        </h1>
        <div className="row">
          <div className="col-sm-6">
            <Bmi />
          </div>
          <div className="col-sm-6">
            <div>
              <Nutrition />
            </div>
            <div className="mt-3">
              <Activity />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
