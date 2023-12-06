import React from "react";
import { useEffect, useState } from "react";

function Contact() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  //getting data from backend
  const callContact = async () => {
    try {
      const response = await fetch("/check-login");
      const data = await response.json();
      console.log("Session Check", data);
      if (data.loggedIn) {
        setUserData(data.user[0]);
      }

      console.log(data);
      setUserData({
        ...userData,
        name: data.user[0].name,
        email: data.user[0].email,
        phone: data.user[0].phone,
        message: data.user[0].message,
      });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    callContact();
  }, []);
  let name, value;
  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;
    setUserData({ ...userData, [name]: value });
  };
  //Sending data to backend
  const contactForm = async () => {
   

  
    const res = await fetch("/contact", {
      method: "POST",

      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
      userData
      }),
    });
    const data = await res.json();
    if (!data) {
      console.log("Message not sent");
    } else {
      window.alert("Message sent successfully!");
      setUserData({ ...userData, message: "" });
    }
  };

  return (
    <>
      <div className="contact-info">
        <div className="container-fluid">
          <div className="row d-flex justify-content-center">
            <div className="col-sm-3">
              <div className="card bmi-form">
                <div className="card-body">
                  <h5 className="card-title lable-titles">
                    <i className="zmdi zmdi-phone gradient" />
                    <span> Phone</span>
                  </h5>
                  <p className="card-text">+91987654123</p>
                </div>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="card bmi-form">
                <div className="card-body">
                  <h5 className="card-title lable-titles">
                    <i className="zmdi zmdi-email gradient" /> Email
                  </h5>
                  <p className="card-text">shamweelraza15@gmail.com</p>
                </div>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="card bmi-form">
                <div className="card-body">
                  <h5 className="card-title lable-titles">
                    <i className="zmdi zmdi-pin-drop gradient" /> Address
                  </h5>
                  <p className="card-text">Prayagraj, Utter Pradesh, India</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="contact-form mt-3">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <div className="contact-form-container py-5 px-5">
                <div className="contact-form-title">
                  <h2 className="lable-titles">
                    <span className="gradient">Get</span> in Touch
                  </h2>
                </div>
                <form method="POST" id="contact_form ">
                  <div className="contact-form-name d-flex justify-content-between align-items-between mt-3">
                    <input
                      type="text"
                      name="contact_form_name"
                      id="contact_form_name"
                      placeholder="Your name"
                      value={userData.name}
                      onChange={handleInputs}
                      required="true"
                    />

                    <input
                      type="email"
                      name="contact_form_email"
                      id="contact_form_email"
                      placeholder="Your email"
                      value={userData.email}
                      onChange={handleInputs}
                      required="true"
                    />

                    <input
                      type="number"
                      name="contact_form_phone"
                      id="contact_form_phone"
                      placeholder="Your Phone number"
                      value={userData.phone}
                      onChange={handleInputs}
                      required="true"
                    />
                  </div>
                  <div className="contact-text-area mt-3">
                    <textarea
                      className="text-field contact-form-message"
                      name="message"
                      placeholder="Message"
                      cols="30"
                      value={userData.message}
                      onChange={handleInputs}
                      rows="10"
                    ></textarea>
                  </div>
                  <div className="button-contact mt-3 pb-2">
                    <button type="button" className="Btn" onClick={contactForm}>
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
