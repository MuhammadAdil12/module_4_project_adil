import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./data-page.css";
import { SavedItems } from './dp-saved-item-props';
import { Settings } from './dp-settings-props';
import { getTotalItemFromCalTracker } from '../../ApiService/cal_tracker';
import { getUserName } from '../../ApiService/cal_tracker';
import { BmiCalculation } from './bmi-calculation-props';
import { MacroRatio } from './macro-ratio-props';

// Profile component
export const DataPage = () => {
  const [userName, setUserName] = useState('');
  const [profilePicUrl, setProfilePicUrl] = useState('');
  const [total, setTotal] = useState({ calTotal: 0, priceTotal: 0, carbsTotal: 0, proteinTotal: 0});


  useEffect(() => {
    loadEntries();

    getUserName()
      .then(userName => {
        setUserName(userName.userName[0].user_name);
        const storedProfilePicUrl = localStorage.getItem(userName.userName[0].user_name);

        if (storedProfilePicUrl === null) {
          console.log('something went wrong in loading the img');
        }
        if (storedProfilePicUrl) {
          setProfilePicUrl(`data:image/jpeg;base64,${storedProfilePicUrl}`);
        }
      })
      .catch(error => {
        console.error('Error loading user name:', error);
      });
  }, []);


  const loadEntries = () => {
    getTotalItemFromCalTracker().then(totalEntries => {
        if (totalEntries.total.length === 0) { 
            setTotal({ calTotal: 0, priceTotal: 0, carbsTotal: 0, proteinTotal: 0});
            console.log('totalEntries.total is empty');
        } else {
            setTotal(totalEntries.total[0]);
        }
    }).catch(error => {
        console.error('Error loading total entries:', error);
    });
  };


const updateProfilePicture = (input) => {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            try {
                const imageData = e.target.result.split(',')[1];
                if (userName) {
                    localStorage.setItem(userName, imageData);
                    setProfilePicUrl(`data:image/jpeg;base64,${imageData}`)
                } else {
                    console.error('User name is not defined.');
                }
            } catch (error) {
                console.error('Error updating profile picture:', error);
            }
        };
        reader.readAsDataURL(input.files[0]);
    }
};


  let user_name = userName
  .toLowerCase()
  .split(" ")
  .map(val => val.replace(val.charAt(0), val.charAt(0).toUpperCase()))
  .join(" ");

  return (
    <>
      <div className="profile-container">
        <div className="profile-pic-div" id="profile-pic" style={{backgroundImage: `url(${profilePicUrl})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
          <div className="camera-div">
            <label htmlFor="file-input">
              <span className="material-symbols-outlined camera-icon">photo_camera</span>
            </label>
            <input
              type="file"
              id="file-input"
              accept="image/*"
              onChange={(e) => updateProfilePicture(e.target)}
              hidden
            />
              
          </div>
        </div>
        <div className="user-name">{user_name}</div>
      </div>
      <div className='data-container'>
          
          <SavedItems 
          title={'Total from cal tracker '}
          totalFat={`${total.fatTotal} - Total Fat`}
          totalCarbs={`${total.carbsTotal} - Total Carbs`}
          totalProtein={`${total.proteinTotal}  - Total Protein`}
          totalCalories={`${total.calTotal} - Total Calories`} 
          totalPrice={`${total.priceTotal} - Total Price`}
          />
          <MacroRatio
            title={'Macro Ratio Progress '}
          />

          <BmiCalculation
            title={'Saved data from BMR section '}
          />
          <Settings />

          <div className="bottom-nav-div">
                <div className="iconDiv">
                    <Link to="/home"><span className="material-symbols-outlined" id="icons">home</span></Link>
                </div>
                <div className="iconDiv">
                    <Link to="/dataPage" id="account-icon"><span className="material-symbols-outlined icons" id="icons"> person</span></Link>
                </div>
            </div>
      </div>
    </>
  );
}; 