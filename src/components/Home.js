import React, { useState, useEffect } from "react";
import logo from "../images/logo.png";
function Home() {
  const [userName, setUserName] = useState("");
  const [show, setShow] = useState(false);
  //getting data from backend
  const userHome = async () => {
    try {

      const response = await fetch('/check-login');
      const data = await response.json();
      console.log('Session Check',data) ;
      if(data.loggedIn){
        setUserName(data.user[0].name);
        setShow(true);
      }
      else
      {
        setShow(false);  
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    userHome();
  }, []);

  return (
    <>
      {show ? (
        <div className="row mt-5">
          <div
            className="d-flex justify-content-center flex-column align-items-center" id="screenSize">
            <img src={logo} alt="logo" className="change" />
            <h1 className="title-login">
              <span id="fit">Fit</span>
              <span className="text-dark" id="fusion">
                Fusion
              </span>
            </h1>
            <h2 className="lable-titles">
              <span className="gradient">Welcome</span>
            </h2>
            <h2 className="lable-titles">{userName}</h2>
          </div>
        </div>
      ) : (
        <div className="container  mt-5 mx-auto">
          <div className="row mt-5">
            <div
              className="d-flex justify-content-center flex-column align-items-center change-size"
              id="screenSize"
            >
              <img src={logo} alt="logo" id="logo" />
              <h1 className="title">
                <span id="fit">Fit</span>
                <span className="text-dark" id="fusion">
                  Fusion
                </span>
              </h1>
            </div>
          </div>
          <div className="row my-3">
            <p className="px-3 text-center" id="discription">
              Your Ultimate Fitness Companion! <br />
              Discover a new level of wellness and vitality with FitFusion, the
              all-in-one fitness tracking app designed to elevate your fitness
              journey. <br />
              Whether you're a seasoned athlete or just starting out, FitFusion
              is here to empower you on your path to a healthier, more active
              lifestyle.
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
