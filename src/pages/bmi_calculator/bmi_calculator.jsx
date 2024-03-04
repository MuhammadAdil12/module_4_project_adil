import { useState } from 'react';
import { Link } from 'react-router-dom';
import './bmi_calculator.css';
import { bmr_bmi_calculator } from '../../ApiService/bmr_calculator';

  export const Bmi_calculator = () => {
      const [age, setAge] = useState('');
      const [gender, setGender] = useState('');
      const [height, setHeight] = useState('');
      const [weight, setWeight] = useState('');
      const [activityLevel, setActivityLevel] = useState('');
      const [fatPercentage, setFatPercentage] = useState('');
      const [carbsPercentage, setCarbsPercentage] = useState('');
      const [proteinPercentage, setProteinPercentage] = useState('');
      const [bmr, setBmr] = useState('');
      const [bmi, setBmi] = useState('');
      const [tdee, setTdee] = useState('');
      const [weightGain, setWeightGain] = useState('');
      const [weightLoss, setWeightLoss] = useState('');
      const [waterIntake, setWaterIntake] = useState('');
      const [macroRatio, setMacroRatio] = useState('');

      const [proteinMacroRatio, setProteinMacroRatio] = useState('');
      const [fatMacroRatio, setFatMacroRatio] = useState('');
      const [carbsMacroRatio, setCarbsMacroRatio] = useState('');


  
      const handleCalculate = () => {
          
          if ( age == "" || gender == "" || height== "" || weight == "" || activityLevel == ""){
            alert('Are you blind or sum? Fill in the blank, fam')
        } else{
        
            if(gender.toLowerCase() === "male"){
                let _maleBmr = Math.round(maleBmr());
                    setBmr(" : " + _maleBmr)
                    weightGainFun(_maleBmr)
                    weightLossFun(_maleBmr)
                let _tdeemale = calTdeeForMale()
                    macroNutrient(_tdeemale)

            } else {
                let _femaleBmr = Math.round(femaleBmr())
                    setBmr(" : " + _femaleBmr);
                    weightGain(_femaleBmr)
                    weightLoss(_femaleBmr)
                let _tdeeFemale = calTdeeForFemale()
                    macroNutrient(_tdeeFemale)
      
            }

        calBmi(height, weight)
        calculateWaterIntake()
    }
};

// ! function that calculate Male's BMR 

      const maleBmr = () =>{

        let maleBmr = (13.397 * weight) + (4.799  * height) - (5 * age) + 88.362;
    
        if(activityLevel == 1){
         return maleBmr * 1.2 
      }
       else if (activityLevel == 2){
        return maleBmr * 1.375 
      }
      else if (activityLevel == 3){
        return maleBmr * 1.55
      }
      else if (activityLevel == 4){
          return maleBmr * 1.725
      }
      else{
          return maleBmr * 1.9
      }
    }


       
// ! function that calculate Female's BMR 
    
    const femaleBmr = ()=>{

        let femaleBmr = (9.247 * weight) + (3.098  * height) - (4.330 * age) + 447.593;
    
        if( activityLevel == 1){
             return femaleBmr * 1.2
         }
          else if ( activityLevel == 2){
             return femaleBmr * 1.375
         }
         else if ( activityLevel == 3){
             return femaleBmr * 1.55
         }
         else if ( activityLevel == 4){
             return femaleBmr * 1.725 
         }
         else{
             return femaleBmr * 1.9 
             
        }
    }

    // ! function that calculate weightGain and weightLoss

    const weightGainFun = (value) => {
        let _weightGain = value + 500 
        setWeightGain(" : 0.5 kg per week take : " + _weightGain + " kcal");
    }
    
    const weightLossFun = (value) => {
    let _weightLoss = value - 500 
        setWeightLoss (" : 0.5 kg per week take : " + _weightLoss + " kcal");
    }


    // ! function that calculate tdee for male and female

    const calTdeeForMale = () => {
      let maleBmr = (10 * weight) + (6.25  * height) - (5 * age) + 5;
      setTdee(" : " + maleBmr);
      return maleBmr
    }


    const calTdeeForFemale = () => {
      let femaleBmr = (10 * weight) + (6.25  * height) - (5 * age) - 161;
      setTdee(" : " + femaleBmr);
      return femaleBmr
    }



    const macroNutrient = (value1) => {
      // Calculate fat, carbs, and protein as percentages of maleBmr
   
      if ( parseInt(fatPercentage) + parseInt(carbsPercentage) + parseInt(proteinPercentage) === 100 ){
   
          let fats = fatPercentage/100 * value1;   
          let carbs = carbsPercentage/100 * value1;
          let protein = proteinPercentage/100 * value1; 
            
          setMacroRatio( " Fat: " + Math.round(fats) + " Carbs: " + Math.round(carbs) + " Protein: " + Math.round(protein));

          setProteinMacroRatio(Math.round(protein))
          setFatMacroRatio(Math.round(fats))
          setCarbsMacroRatio(Math.round(carbs))
      
      } else {

       alert('Please Make Sure Your Macro Ratio Ends Up 100% ˆ∆ˆ')

      }
     }
     
    // ! function that calculate BMI 

    const calBmi = (height, weight) => {

      let meter = height/100

      let BMI = weight / (meter * meter)

      if (BMI < 18.5) {
          let _BMI = Math.round(BMI) + ', You are under weight' 
      setBmi(" : " + _BMI);

      } else if (BMI > 18.5 && BMI < 24.9) {
          let _BMI = Math.round(BMI) + ', You are normal weight'
          setBmi(" : " + _BMI);

      } else if (BMI > 25 && BMI < 29.9) {
          let _BMI = Math.round(BMI) + ', You are over weight'
          setBmi(" : " + _BMI);

      } else if (BMI > 30 && BMI < 34.9) {
          let _BMI = Math.round(BMI)  + ', You are Obese' 
          setBmi(" : " + _BMI);

      } else {
          let _BMI = Math.round(BMI) + ', You are extreme Obese'
          setBmi(" : " + _BMI);
      }
    }

    const calculateWaterIntake = () => {
      
      let waterIntake = 1;

            if ( activityLevel == 1) {
                waterIntake = weight * 35
            } 
            else if ( activityLevel == 2) {
                waterIntake = weight * 40;
            } 
            else if ( activityLevel == 3) {
                waterIntake = weight * 43;
            }
            else if ( activityLevel == 4) {
                waterIntake = weight * 49;
            } 
            else {
                waterIntake = weight * 51;
            }
                   
            // Display the calculated water intake
           setWaterIntake(" : " + waterIntake + " ml");
    }


    const onSave = () =>{
       
      if(age == "" || gender == "" || height == "" || weight == "" || activityLevel == ""){
          alert('Fill in the blank, fam')
      }else{
  
        bmr_bmi_calculator({bmi, bmr, waterIntake, weightGain, weightLoss, tdee, macroRatio, proteinMacroRatio, fatMacroRatio, carbsMacroRatio})
      }
  }
  


  
      return (
          <div>
              <Link to="/home"><span className="material-symbols-outlined back-arrow"> arrow_back</span></Link>
  
              <div className="main-parent-div">
                  <div className="calories-calculator" id="calorie">
                      <div id="caloriesForm">

                            <div className="parent-div">
                                <p htmlFor="age" className="input-p-tag">Age:</p>
                                <input 
                                    type="number" 
                                    id="ageCaloriesChild" 
                                    className='input'
                                    name="age" 
                                    placeholder="age, more than 2 please" 
                                    value={age} 
                                    onChange={(e) => setAge(e.target.value)} 
                                    required />
                            </div>

                            <div className="parent-div">
                                <p htmlFor="Gender" className="input-p-tag">Gender:</p>
                                <input 
                                    type="text"
                                    id="genderCaloriesChild"
                                    className='input'
                                    name="age"
                                    placeholder="Female or Male Only, lol seriously though 😅"
                                    value={gender} 
                                    onChange={(e) => setGender(e.target.value)} 
                                    required />

                            {/* <select 
                              id="genderCaloriesChild"
                              className='input'
                              onChange={(e) => setGender(e.target.value)} 
                              >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select> */}
                            </div>

                            <div className="parent-div">
                                <p htmlFor="age" className="input-p-tag">Height:</p>
                                <input type="number"
                                    id="heightCaloriesChild" 
                                    name="age" 
                                    className='input'
                                    placeholder="Above 200 cm or 6'6 (not optional)" 
                                    value={height} 
                                    onChange={(e) => setHeight(e.target.value)} 
                                    required />
                            </div>

                            <div className="parent-div">
                                <p htmlFor="age" className="input-p-tag">Weight:</p>
                                <input type="number" 
                                    id="weightCaloriesChild" 
                                    name="age" 
                                    className='input'
                                    placeholder="Crossing my fingers you're lighter than a feather on a diet! (In Kg) 🤞🚫" 
                                    value={weight} 
                                    onChange={(e) => setWeight(e.target.value)} 
                                    required />
                            </div>

                          <div className="parent-div">
                              <p htmlFor="age" className="input-p-tag">ACT Lvl:</p>
                              <select 
                              id="activityLevelCaloriesChild" 
                              className="activityLevelCaloriesChild"
                              onChange={(e) => setActivityLevel(e.target.value)} 
                              value={activityLevel}
                              >
                                <option value="1">Sedentary</option>
                                <option value="2">Lightly active</option>
                                <option value="3">Moderately active</option>
                                <option value="4">Very active</option>
                                <option value="5">Extra active</option>
                            </select>
                          </div>

                          {/* Second form/div for macro ratios */}

                              <div id="macroRatio">
                                  <p id="macroRatio-p">Please Enter your Macro Ratio</p>
                              </div>
                

                              <div className="macro-input-parent">
                                <div className="input-group">
                                    <input 
                                    type="text" 
                                    required 
                                    id="fat-input" 
                                    className="input" 
                                    placeholder="Fats %"
                                    value={fatPercentage}
                                    onChange={(e) => setFatPercentage(e.target.value)}  />

                                </div>
                                <div className="input-group">
                                    <input 
                                    type="text" 
                                    required 
                                    id="carbsInput" 
                                    className="input" 
                                    placeholder="Carbs %" 
                                    value={carbsPercentage}
                                    onChange={(e) => setCarbsPercentage(e.target.value)} />
                                </div>
                                <div className="input-group">
                                    <input 
                                    type="text" 
                                    required 
                                    id="protienInput" 
                                    className="input" 
                                    placeholder="Protein %" 
                                    value={proteinPercentage}
                                    onChange={(e) => setProteinPercentage(e.target.value)} />
                                </div>
                            </div>



                          <div className="gen-pt-2">
                              <button 
                              className="submitBtnCalories"
                              onClick={() => handleCalculate()}
                              > Generate Calories </button>
                          </div>
                      </div>   
                  </div>
  
                  <div className="second-div">
                      <div className="parent-div-2">
                          <p className="second-div-p-tag" id="bmr-area">Basal Metabolic Rate : {bmr}</p>
                          <p className="second-div-p-tag" id="bmi-area">Body mass index  : {bmi}</p>
                      </div>
                      <div className="parent-div-2">
                            <p className="second-div-p-tag" id="weight-gain">Weight Gain: {weightGain}</p>
                            <p className="second-div-p-tag" id="weight-loss">Weight Loss: {weightLoss}</p>
                        </div>
                        <div className="parent-div-2">
                            <p className="second-div-p-tag" id="waterIntakeResult">Daily recommended water intake: {waterIntake}</p>
                            <p className="second-div-p-tag" id="macro-ratio" >Macro Ratio: {macroRatio} </p>
                        </div>
                        <div className="parent-div-2">
                            <p className="second-div-p-tag" id="cal-tdee" >Total Daily Energy Expenditure: {tdee}</p>
                        <div className="parent-div-Btn">
                          <button onClick={() => onSave()} className="saveBtn">Save</button>
                        </div>
                    </div>
                  </div>
              </div>
          </div>
      );
  }
