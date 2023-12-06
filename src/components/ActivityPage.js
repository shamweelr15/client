

import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
const ActivityPage = () => {
  const navigate = useNavigate();
  const [activities, setActivities] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [newActivity, setNewActivity] = useState('');
  const [newTiming, setNewTiming] = useState('');
  const [activityOptions, setFoodOptions] = useState([]);
  const [totalCalories, setTotalCalories] = useState(0);
  const [lastUpdatedEntry, setLastUpdatedEntry] = useState(null);

  const fetchData = async () => {
  
    try {
      
      const res = await fetch('/activities');
      const activityData = await res.json();
      setFoodOptions(activityData.map((activity) => ({ value: activity.name, label: activity.name })));
    } catch (e) {
      console.log(e);
    }
  };

  const fetchLastUpdatedActivities = async () => {
    try {
      const response = await fetch('/check-login');
      const userdata = await response.json();
      console.log('Session Check',userdata) ;
      if(!userdata.loggedIn){
        navigate("../login", { replace: true });
      }
      // Fetch the last updated calories from the server
      const Jsondata = { user :userdata.user[0]._id}

      const res = await fetch('/getLastUpdatedActivities', {
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
    
    fetchLastUpdatedActivities();
  }, []);
  

  const fetchCalories =(activityItem) => {
  
    return (Math.round(Math.random() * 100));
  };

  const saveData = async () => {
    try {
      const response = await fetch('/check-login');
      const userdata = await response.json();
      console.log('Session Check', userdata);
      if (userdata.loggedIn) {
        // const userId = userdata.user[0]._id;
        const activityValues = activities.map((activity) => ({
          user:userdata.user[0]._id,
          activityName: activity.name,
          calories: activity.calories,
          timing: activity.timing,
        }));
        console.log('Activity Values:', activityValues); // Log the activityValues being sent
        var Jsondata = JSON.stringify(activityValues);
  
        const res = await fetch('/saveActivityData', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: Jsondata,
        });
  
        const result = await res.json();
        console.log(result); // Log the response from the server
  
        // Clear the activities and totalCalories after saving
        setActivities([]);
        setTotalCalories(0);
        fetchLastUpdatedActivities();
      }
    } catch (error) {
      console.error('Error saving activity data:', error);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);

  const addActivity = async () => {
    if (newActivity && newTiming) {
      const calories =  fetchCalories(newActivity);
      const newActivityItem = {
        id: '',
        name: newActivity,
        timing: parseFloat(newTiming),
        calories: calories,
        
      };

      const updatedActivities = [...activities, newActivityItem];
      setActivities(updatedActivities);
      setTotalCalories(calculateTotalCalories(updatedActivities));
      setNewActivity('');
      setNewTiming('');

      // Log the updated JSON data after adding
      console.log(JSON.stringify(updatedActivities, null, 2));
    }
  };

  const removeActivity = (index) => {
    const updatedActivities = [...activities];
    updatedActivities.splice(index, 1);
    setActivities(updatedActivities);
    setTotalCalories(calculateTotalCalories(updatedActivities));
    setEditingIndex(null);
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setNewActivity(activities[index].name);
    setNewTiming(activities[index].timing.toString());
  };

  const cancelEditing = () => {
    setEditingIndex(null);
    setNewActivity('');
    setNewTiming('');
  };

  const saveEditing = async (index) => {
    const calories = await fetchCalories(newActivity);
    const updatedActivities = [...activities];
    updatedActivities[index] = {
      name: newActivity,
      calories: calories,
      timing: parseFloat(newTiming),
    };
    setActivities(updatedActivities);
    setTotalCalories(calculateTotalCalories(updatedActivities));
    setEditingIndex(null);
    setNewActivity('');
    setNewTiming('');
  };

  const calculateCalories = (caloriesPermin, timing) => {
    return Math.round((caloriesPermin*timing));
  };

  const calculateTotalCalories = (items) => {
    return items.reduce((acc, item) => acc + item.calories, 0);
  };

  return (
    <>
      <div className="card">
        <div className="card-title text-center">
          <h2 className='lable-titles'><span className="gradient">Activity</span> List</h2>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-4">
              <label>Activity Name:</label>
              <Select
                className='lable-titles'
                options={activityOptions}
                placeholder='Search or select activity item'
                value={activityOptions.find((option) => option.value === newActivity)}
                onChange={(selectedOption) => setNewActivity(selectedOption.value)}
                isSearchable
              />
            </div>
            <div className="col-md-4 form-group">
              <label>Timing (min):</label>
              <input
                className="form-control"
                type="number"
                value={newTiming}
                onChange={(e) => setNewTiming(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <button className="Btn" onClick={addActivity}>
                Add Activity
              </button>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-md-12">
              <table className="table">
                <thead>
                  <tr>
                    <th>Activity</th>
                    <th>Timing</th>
                    <th>Calories Burned</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {activities.map((activity, index) => (
                    <tr key={index}>
                      <td>
                        {index === editingIndex ? (
                          <input
                            className="form-control"
                            type="text"
                            value={newActivity}
                            onChange={(e) => setNewActivity(e.target.value)}
                          />
                        ) : (
                          activity.name
                        )}
                      </td>
                      <td>
                        {index === editingIndex ? (
                          <input
                            className="form-control"
                            type="number"
                            value={newTiming}
                            onChange={(e) => setNewTiming(e.target.value)}
                          />
                        ) : (
                          activity.timing
                        )}
                      </td>
                      <td>{activity.calories} calories</td>
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
                          onClick={() => removeActivity(index)}
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
            className="Btn mx-2 px-3"
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
          <span className="gradient">Activity:</span> {entry.activityName}, <span className="gradient">Timing:</span> {entry.timing}, <span className="gradient">Calories:</span> {entry.calories}
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

export default ActivityPage;
