

import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
const NutritionPage = () => {


  const navigate = useNavigate();
  const [foods, setFoods] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [newFood, setNewFood] = useState('');
  const [newPortionSize, setNewPortionSize] = useState('');
  const [foodOptions, setFoodOptions] = useState([]);
  const [totalCalories, setTotalCalories] = useState(0);
  const [lastUpdatedEntry, setLastUpdatedEntry] = useState(null);

  const fetchData = async () => {
    try {
      const res = await fetch('/fooditems');
      const foodData = await res.json();
      setFoodOptions(foodData.map((food) => ({ value: food.name, label: food.name })));
    } catch (e) {
      console.log(e);
    }
  };

  const fetchLastUpdatedCalories = async () => {
    try {
      const response = await fetch('/check-login');
      const userdata = await response.json();
      console.log('Session Check',userdata) ;
      if(!userdata.loggedIn){
        navigate("../login", { replace: true });
      }

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
  
  // Call the function when needed
  useEffect(() => {
    fetchLastUpdatedCalories();
  }, []);
  

  const fetchCalories = async (foodItem) => {
    try {
      const res = await fetch(`/fooditems?name=${foodItem}`);
      const foodData = await res.json();
      const foodInfo = foodData[0];
      if (foodInfo) {
        return calculateCalories(foodInfo.calories, parseFloat(newPortionSize));
      }
      return 0;
    } catch (error) {
      console.error('Error fetching calories:', error);
      return 0;
    }
  };

  const saveData=async()=>{
    try {
        const response = await fetch('/check-login');
        const userdata = await response.json();
        console.log('Session Check',userdata) ;
        if(userdata.loggedIn){
        // const userId =userdata.user[0]._id; // Replace with actual user ID
        const nutritionValues = foods.map((food) => ({
            user:userdata.user[0]._id,
            foodName: food.name,
            portionSize: food.portionSize,
            calories: food.calories,
        }));
        // console.log('nutritionValues',nutritionValues) ;
        var Jsondata = JSON.stringify(nutritionValues)
        console.log('Jsondata',Jsondata) ;
        //const data = { userId, nutritionValues};
    
        const res = await fetch('/saveNutritionData', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: Jsondata
        });
    
        const result = await res.json();
        console.log(result); // Log the response from the server
    
        // Clear the foods and totalCalories after saving
        setFoods([]);
        setTotalCalories(0);
        fetchLastUpdatedCalories();
      }
      } catch (error) {
        console.error('Error saving nutrition data:', error);
      }
  }
  useEffect(() => {
    fetchData();
  }, []);

  const addFood = async () => {
    if (newFood && newPortionSize) {
      const calories = await fetchCalories(newFood);
      const newFoodItem = {
        id: '',
        name: newFood,
        portionSize: parseFloat(newPortionSize),
        calories: calories,
        
      };

      const updatedFoods = [...foods, newFoodItem];
      setFoods(updatedFoods);
      setTotalCalories(calculateTotalCalories(updatedFoods));
      setNewFood('');
      setNewPortionSize('');

      // Log the updated JSON data after adding
      console.log(JSON.stringify(updatedFoods, null, 2));
    }
  };

  const removeFood = (index) => {
    const updatedFoods = [...foods];
    updatedFoods.splice(index, 1);
    setFoods(updatedFoods);
    setTotalCalories(calculateTotalCalories(updatedFoods));
    setEditingIndex(null);
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setNewFood(foods[index].name);
    setNewPortionSize(foods[index].portionSize.toString());
  };

  const cancelEditing = () => {
    setEditingIndex(null);
    setNewFood('');
    setNewPortionSize('');
  };

  const saveEditing = async (index) => {
    const calories = await fetchCalories(newFood);
    const updatedFoods = [...foods];
    updatedFoods[index] = {
      name: newFood,
      portionSize: parseFloat(newPortionSize),
      calories: calories,
    };
    setFoods(updatedFoods);
    setTotalCalories(calculateTotalCalories(updatedFoods));
    setEditingIndex(null);
    setNewFood('');
    setNewPortionSize('');
  };

  const calculateCalories = (caloriesPer100g, portionSize) => {
    return Math.round((caloriesPer100g / 100) * portionSize);
  };

  const calculateTotalCalories = (items) => {
    return items.reduce((acc, item) => acc + item.calories, 0);
  };

  return (
    <>
      <div className="card">
        <div className="card-title text-center">
          <h2 className='lable-titles'><span className="gradient">Food</span> List</h2>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-4">
              <label>Food Name:</label>
              <Select
                className='lable-titles'
                options={foodOptions}
                placeholder='Search or select food item'
                value={foodOptions.find((option) => option.value === newFood)}
                onChange={(selectedOption) => setNewFood(selectedOption.value)}
                isSearchable
              />
            </div>
            <div className="col-md-4 form-group">
              <label>Portion Size (grams):</label>
              <input
                className="form-control"
                type="number"
                value={newPortionSize}
                onChange={(e) => setNewPortionSize(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <button className="Btn" onClick={addFood}>
                Add Food
              </button>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-md-12">
              <table className="table">
                <thead>
                  <tr>
                    <th>Food</th>
                    <th>Portion Size</th>
                    <th>Calories</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {foods.map((food, index) => (
                    <tr key={index}>
                      <td>
                        {index === editingIndex ? (
                          <input
                            className="form-control"
                            type="text"
                            value={newFood}
                            onChange={(e) => setNewFood(e.target.value)}
                          />
                        ) : (
                          food.name
                        )}
                      </td>
                      <td>
                        {index === editingIndex ? (
                          <input
                            className="form-control"
                            type="number"
                            value={newPortionSize}
                            onChange={(e) => setNewPortionSize(e.target.value)}
                          />
                        ) : (
                          food.portionSize
                        )}
                      </td>
                      <td>{food.calories} calories</td>
                      <td>
                        {index === editingIndex ? (
                          <>
                            <button
                              className="btn btn-success"
                              onClick={() => saveEditing(index)}
                            >
                              Save
                            </button>
                            <button
                              className="btn btn-secondary"
                              onClick={cancelEditing}
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <button
                            className="btn btn-primary"
                            onClick={() => startEditing(index)}
                          >
                            Edit
                          </button>
                        )}
                        <button
                          className="btn btn-danger"
                          onClick={() => removeFood(index)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="card-footer">
          <button
            className="Btn pull-left"
            type="button"
            id="toleft"
          >Cancel</button>
          <button
            className="Btn mx-4 px-3"
            type="button"
            id="toright"
            onClick={saveData}
          >Save</button>
        </div>
      </div>
      <div className="mt-4">
      <div className='bmi-form'>
      
      {lastUpdatedEntry && lastUpdatedEntry.length > 0 && (
  <div>
    <h2 className='lable-titles text-center'>Last Updated <span className="gradient">Calories</span></h2>
    <ul>
      {lastUpdatedEntry.map((entry, index) => (
        <li className='lable-titles' key={index}>
          <span className="gradient">Food:</span> {entry.foodName}, <span className="gradient">Portion Size:</span> {entry.portionSize}, <span className="gradient">Calories:</span> {entry.calories}
        </li>
      ))}
    </ul>
  </div>
)}
    </div>
      </div>
    </>
  );
};

export default NutritionPage;
//  {/* <h2>Total Calories</h2>
//         <p>{totalCalories} calories</p> */}
//          {/* Render nutrition values if it's an array */}
//          {lastUpdatedEntry.nutritionValue && Array.isArray(lastUpdatedEntry.nutritionValue) && (
//             <ul>
//               {lastUpdatedEntry.nutritionValue.map((entry, index) => (
//                 <li key={index}>
//                   Food: {entry.foodName}, Portion Size: {entry.portionSize}, Calories: {entry.calories}
//                 </li>
//               ))}
//             </ul>
//           )}