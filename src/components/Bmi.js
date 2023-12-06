

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

function Bmi() {
  const [result, setResult] = useState('');
  const [lastUpdatedEntry, setLastUpdatedEntry] = useState(null);
  const [Gender, setGender] = useState("");
  const [Height, setHeight] = useState("");
  const [Weight, setWeight] = useState("");
  const [Bmi, setBmi] = useState(0);

  const getBmi = async () => {
    try {
      const response = await fetch('/check-login');
      const userdata = await response.json();
      console.log('Session Check',userdata) ;
      const Jsondata = { user :userdata.user[0]._id}
      console.log('JSON',JSON.stringify(Jsondata));
      const res = await fetch('/getBmi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Jsondata)
      });
  
      const result = await res.json();
      console.log("Hello",result.lastUpdatedEntry); 
      setLastUpdatedEntry(result.lastUpdatedEntry);

    //  console.log(lastUpdatedEntry); 
     
    } catch (error) {
      console.error('Error fetching last updated calories:', error);
    }
  };
  
  useEffect(() => {
    console.log('lastUpdatedEntry after setting:', lastUpdatedEntry);
  }, [lastUpdatedEntry]);

  const calBmi = async () => {
    // Assuming you are using React and have state variables setBmi and setResult
    // Assuming Height and Weight are defined
    const h = Height / 100;
    const r = Weight / (h * h);
    let calculatedBmi =Math.round(r);
    console.log("calculatied BMI :",calculatedBmi);
    setBmi(calculatedBmi);
    if (r >= 10 && r <= 40) { // Adjust the BMI range as needed
      setBmi(calculatedBmi);
      console.log("BMI before save :",Bmi);
      if (r >= 10 && r <= 40) { // Adjust the BMI range as needed
            setBmi(calculatedBmi);
        let age =20;
            if (age >= 2 && age <= 18) {
              // BMI categories for children and teenagers
              if (Gender === 'male') {
                if (r <= 14) {
                  setResult("You are Underweight");
                } else if (r > 14 && r <= 21.2) {
                  setResult("You are Normal weight");
                } else if (r > 21.2 && r <= 26.6) {
                  setResult("You are Overweight");
                } else {
                  setResult("You are Obese");
                }
              } else if (Gender === 'female') {
                if (r <= 14.1) {
                  setResult("You are Underweight");
                } else if (r > 14.1 && r <= 21.4) {
                  setResult("You are Normal weight");
                } else if (r > 21.4 && r <= 27) {
                  setResult("You are Overweight");
                } else {
                  setResult("You are Obese");
                }
              }
            } else if (age >= 19 && age <= 64) {
              // BMI categories for adults
              if (r <= 18.5) {
                setResult("You are Underweight");
              } else if (r > 18.5 && r <= 24.9) {
                setResult("You are Normal weight");
              } else if (r > 24.9 && r <= 29.9) {
                setResult("You are Overweight");
              } else {
                setResult("You are Obese");
              }
            } else {
              setResult("BMI calculation is for children, teenagers (2-18) and adults (19-64)");
            }
           
          } else {
            setResult("Please enter valid height and weight");
          }
          saveData(calculatedBmi);
         
    } else {
      setResult("Please enter valid height and weight");
      calculatedBmi = 0;
    }
    
  };

  const saveData=async(calculatedBmi)=>{
    try {
      if(calculatedBmi){
      console.log("BMI :",Bmi);
        const response = await fetch('/check-login');
        const userdata = await response.json();
        console.log('Session Check',userdata) ;
        if(userdata.loggedIn){
        // const userId =userdata.user[0]._id; // Replace with actual user ID
        const bmiValue ={
            user:userdata.user[0]._id,
            gender: Gender,
            height: Height,
            weight:Weight,
            bmi: calculatedBmi,
        };

        
        // console.log('bmiValue',bmiValue) ;
        var Jsondata = JSON.stringify(bmiValue)
        console.log('Jsondata',Jsondata) ;
        //const data = { userId, bmiValue};
    
        const res = await fetch('/bmi', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: Jsondata
        });
    
        const result = await res.json();
        console.log(result); // Log the response from the server
    
       
      
        getBmi();
      }}else{
        throw new Error({message :"BMI IS 0"})
      }
      } catch (error) {
        console.error('Error saving nutrition data:', error);
      }
  }
useEffect(() => {
  getBmi();
}, []);


  return (
    <>
      <div className="container">
        <form method='POST' className='bmi-form p-5'>
          <h2 className='lable-titles text-center'><span className='gradient'>BMI</span> CALCULATOR</h2>
          <div className="row mt-4">
          <div className="col-sm-6">
               <h4 className='lable-titles'>Gender</h4>
             <div className="form-check">
               <div className="row">
                 <div className="col-sm-6">
                 <label>
 			<input type="radio" name="Gender"  id='male' value="male"  onClick={(e)=>{setGender("male")}}/>
 		 <span className="material-symbols-outlined">
 man
 </span>
 		</label>
                 </div>
                 <div className="col-sm-6">
                 <label>
			<input type="radio" name="Gender" id='female' value="female"  onClick={(e)=>{setGender("female")}}   />
 			 <span className="material-symbols-outlined">
 woman </span>
 		</label>
              
  </div>      
           </div>
  
 
		

            </div>
    <div className="form-group my-4">

      <label htmlFor="weight" > <h4 className='lable-titles'>Weight(KG)</h4></label>
       <input
        type="number"
        className="lable-titles"
        id="weight"
        name='weight'
        min="1"
        max="300"
  
        value={Weight } onChange={(e)=>{setWeight(e.target.value)}} 
      />
      {/* <p id='rangeValue' className='mt-3 text-end'>{userData.weight} kg</p> */}
    </div>

            
           
            <div className="form-group ">
              <label htmlFor="height"><h4 className='lable-titles'>Height(CM)</h4></label>
            
              <input
        type="number"
        className="lable-titles"
        id="height"
        name='height'
        min="1"
        max="300"
       
        value={Height }  onChange={(e)=>{setHeight(e.target.value)}}
      />
      {/* <p id='rangeValue' className='mt-3 text-end'>{userData.height} cm</p> */}
      </div>
            </div>
            <div className="col-sm-6">
            <div className="bmi-result mt-5">
                <h2>Your BMI</h2>
              <h3>{Bmi}</h3>
              <h4>{result}</h4>

              <div className="mt-5 mb-3 mx-auto">
          <input type="button" value="Submit" onClick={calBmi} className='Btn px-4' />
          </div>
             
           
            </div>
            </div>
          </div>
          <div className="mt-5">
          {lastUpdatedEntry  && (
                <div>
                <h2 className='lable-titles text-center'>Last Updated <span className="gradient">Bmi</span></h2>
 
    
   
      
        <p className='lable-titles size'>
        <span className="gradient">bmi:</span> {lastUpdatedEntry.bmi}<br/><span className="gradient">Heignt:</span> {lastUpdatedEntry.height}, <span className="gradient">Weight</span> {lastUpdatedEntry.weight}
        </p>

  
  </div>
)}
          </div>
          
          
          
        </form>
      </div>
    </>
  );
}

export default Bmi;
