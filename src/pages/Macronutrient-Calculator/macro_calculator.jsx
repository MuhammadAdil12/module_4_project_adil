import { useState, useEffect} from 'react';
import "./macro_calculator.css"
import { Link } from 'react-router-dom';
import { adding_cal_tracker_entry } from '../../ApiService/cal_tracker';
import {fetch_macro_data} from "../../ApiService/fetch-recipe-data"


export const Macro_calculator = () => {
    const [calories, setCalories] = useState('');
    const [sugar, setSugar] = useState('');
    const [fats, setFats] = useState('');
    const [carbs, setCarbs] = useState('');
    const [protein, setProtein] = useState('');
    const [saturatedFat, setSaturatedFat] = useState('');
    const [fattyAcids, setFattyAcids] = useState('');
    const [sodium, setSodium] = useState('');
    const [zinc, setZinc] = useState('');
    const [magnesium, setMagnesium] = useState('');
    const [cholesterol, setCholesterol] = useState('');
    const [vitaminD, setVitaminD] = useState('');
    const [calcium, setCalcium] = useState('');
    const [iron, setIron] = useState('');
    const [potassium, setPotassium] = useState('');
    const [userInput, setUserInput] = useState('');
    const [divsAreDisplayed, setDivsAreDisplayed] = useState(false);
    const [loading, setLoading] = useState(false);

    const [ApiId, setApiId] = useState('');
    const [ApiKey, setApiKey] = useState('');


    const [foodInputs, setFoodInput] = useState('');
    const [calInput, setCalInput] = useState('');
    const [priceInput, setPriceInput] = useState('');
    const [fatInput, setFatInput] = useState('');
    const [carbsInput, setCarbsInput] = useState('');
    const [proteinInput, setProteinInput] = useState('');


    useEffect(() => {

        const fetchAPI = async () => {
                try {
                  const key = await fetch_macro_data(); 
                  setApiId(key[0].macro_calculator_api_id)
                  setApiKey(key[0].macro_calculator_api_key)
              } catch (error) {
                  console.log(error, "something is wrong in fetching the key");
            }
        
        };

        fetchAPI()
    }, [userInput]);


    const handleSubmit = async () => {
        console.log(userInput);
        setLoading(true);
        let ingr = userInput.split("\n")

        const foodItem = ingr; 






        try {
            const response = await fetch(`https://api.edamam.com/api/nutrition-data?app_id=${ApiId}&app_key=${ApiKey}&ingr=${foodItem}`);
            const data = await response.json();
            setResultData(data);
        } catch (error) {
            console.error('Error:', error);
            setLoading(false);
        }
    };

    const setResultData = (data) => {
        if (data.calories === 0 || data.totalWeight === 0) {
            alert("We cannot calculate the nutrition for some ingredients. Please check the ingredient spelling or if you have entered a quantities for the ingredients.");
            setDivsAreDisplayed(false);
        } else {
            setCalories(data.calories.toFixed(2) + ' ' + data.totalNutrients.ENERC_KCAL.unit);
            setSugar(data.totalNutrients.SUGAR ? data.totalNutrients.SUGAR.quantity.toFixed(2) + ' ' + data.totalNutrients.SUGAR.unit : 'N/A');
            setFats(data.totalNutrients.FAT ? data.totalNutrients.FAT.quantity.toFixed(2) + ' ' + data.totalNutrients.FAT.unit : 'N/A');
            setProtein(data.totalNutrients.PROCNT ? data.totalNutrients.PROCNT.quantity.toFixed(2) + ' ' + data.totalNutrients.PROCNT.unit : 'N/A');
            setCarbs(data.totalNutrients.CHOCDF ? data.totalNutrients.CHOCDF.quantity.toFixed(2) + ' ' + data.totalNutrients.CHOCDF.unit : 'N/A');
            setSaturatedFat(` ${data.totalDaily.FASAT.quantity.toFixed(2)} ${data.totalDaily.FASAT.unit}`);
            setFattyAcids(` ${data.totalNutrients.FAMS.quantity.toFixed(2)} ${data.totalNutrients.FAMS.unit}`);
            setSodium(` ${data.totalDaily.NA.quantity.toFixed(2)} ${data.totalDaily.NA.unit}`);
            setZinc(` ${data.totalNutrients.ZN.quantity.toFixed(2)} ${data.totalNutrients.ZN.unit}`);
            setMagnesium(` ${data.totalNutrients.MG.quantity.toFixed(2)} ${data.totalNutrients.MG.unit}`);
            setCholesterol(` ${data.totalDaily.CHOLE.quantity.toFixed(2)} ${data.totalDaily.CHOLE.unit}`);
            setVitaminD(` ${data.totalDaily.VITD.quantity.toFixed(2)} ${data.totalDaily.VITD.unit}`);
            setCalcium(`  ${data.totalDaily.CA.quantity.toFixed(2)} ${data.totalDaily.CA.unit}`);
            setIron(` ${data.totalDaily.FE.quantity.toFixed(2)} ${data.totalDaily.FE.unit}`);
            setPotassium(` ${data.totalDaily.K.quantity.toFixed(2)} ${data.totalDaily.K.unit}`);
            setDivsAreDisplayed(true);
        }
        setLoading(false);
    };



    const handleAddFoodToStorage = () => {

        if (
          foodInputs.trim() === '' ||
          calInput.trim() === '' ||
          priceInput.trim() === '' ||
          fatInput.trim() === '' ||
          carbsInput.trim() === '' ||
          proteinInput.trim() === ''
        ) {
          alert('Please enter all fields');
          return;
        }
    
    
        let foodInput = foodInputs
        .toLowerCase()
        .split(" ")
        .map(val => val.replace(val.charAt(0), val.charAt(0).toUpperCase()))
        .join(" ");
    
        adding_cal_tracker_entry({foodInput, calInput, priceInput, fatInput, carbsInput, proteinInput })
    
        setFoodInput('');
        setCalInput('');
        setPriceInput('');
        setFatInput('');
        setCarbsInput('');
        setProteinInput('');
    };


    return (
        <div className='main-section'>
            <div className="main-container">
                <div >
                    <div>
                        <div className='title-search-div'>
                        <Link to="/home">
                             <span className="material-symbols-outlined back-arrow"> arrow_back</span>
                        </Link>
                            <label htmlFor="recipe" className="form-label">Detailed nutritional breakdown per serving for entered recipe, covering calories, fats, carbs, protein, vitamins, and minerals. Example: 1 cup of Rice, 50g Chicken, 4 sticks of Butter.</label>
                            <textarea 
                                className="search-bar"
                                id="recipe" 
                                name="recipe" 
                                rows="3" 
                                value={userInput} onChange={(e) => setUserInput(e.target.value)}>
                            </textarea>
                        </div>
                        <div className='submit-btn-div'>
                            <button 
                                className="btn btn-primary submit-btn" 
                                type="submit" 
                                onClick={()=> handleSubmit()}>
                                Calculate
                            </button>
                        </div>
                    </div>
                </div>

                <div className="loading-parent">
                    {loading && <div className="loading">Loading...</div>}
                </div>

                {divsAreDisplayed && (
                    <div className="resultDiv" id="resultDiv">
                        <div className="firstDiv">
                            <ul className="resultList">
                                <li>Calories</li>
                                <li>Sugar</li>
                                <li>Fats</li>
                                <li>Carbs</li>
                                <li>Protein</li>
                            </ul>
                            <ul className="results">
                                <li>{calories}</li>
                                <li>{sugar}</li>
                                <li>{fats}</li>
                                <li>{carbs}</li>
                                <li>{protein}</li>
                            </ul>
                        </div>
                        <div className="secondDiv">
                            <div>
                                <ul className="sec-div-ul">
                                    <p className="secondDiv-total-fat">Total Fat</p>
                                    <li className="li-tag"><p>Saturated Fat</p> <p>{saturatedFat}</p></li>
                                    <li className="li-tag"><p>Fatty acids  </p> <p>{fattyAcids}</p></li>
                                    <li className="li-tag"><p>Sodium </p> <p>{sodium}</p></li>
                                </ul>
                            </div>
                            <div>
                                <ul className="sec-div-ul">
                                    <p className="secondDiv-total-carbs">Total Carbs</p>
                                    <li className="li-tag"><p>Zinc</p> <p>{zinc}</p></li>
                                    <li className="li-tag"><p>Magnesium</p> <p>{magnesium}</p></li>
                                    <li className="li-tag"><p>Cholesterol</p> <p>{cholesterol}</p></li>
                                </ul>
                            </div>
                            <div>
                                <ul className="sec-div-ul">
                                    <p className="secondDiv-total-protein">Total Protein</p>
                                    <li className="li-tag"><p>Vitamin D</p> <p>{vitaminD}</p></li>
                                    <li className="li-tag"><p>Calcium </p> <p>{calcium}</p></li>
                                    <li className="li-tag"><p>Iron</p> <p>{iron}</p></li>
                                    <li className="li-tag"><p>Potassium</p> <p>{potassium}</p></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}

                <div className="input-parent">
                    <div className="input-group">
                        <input 
                        type="text" 
                        required id="nameInput" 
                        className="input" 
                        placeholder="Food Name" 
                        value={foodInputs}
                        onChange={(e) => setFoodInput(e.target.value)}/>
                    </div>
                    <div className="input-group">
                        <input 
                        type="text" 
                        required id="caloriesInput" 
                        className="input" 
                        placeholder="Calories" 
                        value={calInput}
                        onChange={(e) => setCalInput(e.target.value)} />
                    </div>
                    <div className="input-group">
                        <input 
                        type="text" 
                        required id="priceInput" 
                        className="input" 
                        placeholder="Price" 
                        value={priceInput}
                        onChange={(e) => setPriceInput(e.target.value)}/>
                    </div>
                    <div className="input-group">
                        <input 
                        type="text" 
                        required id="fatCaloriesInput" 
                        className="input" 
                        placeholder="Fat Calories" 
                        value={fatInput}
                        onChange={(e) => setFatInput(e.target.value)} />
                    </div>
                    <div className="input-group">
                        <input 
                        type="text" 
                        required id="carbsCaloriesInput" 
                        className="input" 
                        placeholder="Carbs Calories" 
                        value={carbsInput}
                        onChange={(e) => setCarbsInput(e.target.value)}/>
                    </div>
                    <div className="input-group">
                        <input 
                        type="text" 
                        required id="proteinCaloriesInput" 
                        className="input" 
                        placeholder="Protein Calories" 
                        value={proteinInput}
                        onChange={(e) => setProteinInput(e.target.value)}/>
                    </div>
                    <div id="gen-pt-2">
                        <button className="caloriesBtn" onClick={() => handleAddFoodToStorage()}>Add Food Item</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

