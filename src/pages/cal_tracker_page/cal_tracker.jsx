import { useState, useEffect } from 'react';
import './cal_tracker.css';
import { Link } from 'react-router-dom';
import { Cal_tracker_entry_row } from './cal_tracker_prop';
import { adding_cal_tracker_entry } from '../../ApiService/cal_tracker';
import { cal_tracker_entry_list } from '../../ApiService/cal_tracker';
import { delete_cal_tracker_entry } from '../../ApiService/cal_tracker';
import { savedTotalItemFromCalTracker } from '../../ApiService/cal_tracker';
import { updateTotalItemFromCalTracker } from '../../ApiService/cal_tracker';

export const Cal_tracker = () => {
  const [foodInputs, setFoodInput] = useState('');
  const [calInput, setCalInput] = useState('');
  const [priceInput, setPriceInput] = useState('');
  const [fatInput, setFatInput] = useState('');
  const [carbsInput, setCarbsInput] = useState('');
  const [proteinInput, setProteinInput] = useState('');
  const [items, setItems] = useState([]);


  const [totalCal, setTotalCal] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalCarbs, setTotalCarbs] = useState(0);
  const [totalProtein, setTotalProtein] = useState(0);
  const [totalFat, setTotalFat] = useState(0);


  useEffect(() => {
    calculateTotal()
  }, [items]);
  

const calculateTotal = () => {

  const calTotal = items.reduce((acc, entry) => acc + entry.calInput, 0);
  setTotalCal(calTotal);

  const priceTotal = items.reduce((acc, entry) => acc + entry.priceInput, 0);
  setTotalPrice(priceTotal);

  const carbsTotal = items.reduce((acc, entry) => acc + entry.carbsInput, 0);
  setTotalCarbs(carbsTotal);

  const proteinTotal = items.reduce((acc, entry) => acc + entry.proteinInput, 0);
  setTotalProtein(proteinTotal);

  const fatTotal = items.reduce((acc, entry) => acc + entry.fatInput, 0);
  setTotalFat(fatTotal);

  updateTotalItemFromCalTracker({calTotal, priceTotal, carbsTotal, proteinTotal, fatTotal})

}


    useEffect(() => {
      loadEntries();
  }, []);


  const loadEntries = () => {
      cal_tracker_entry_list().then(storedEntries => {
        setItems(storedEntries.list)
      }).catch(error => {
          console.error('Error loading entries:', error);
      });
  };

  const handleAddFood = async() => {

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

    const list = await adding_cal_tracker_entry({foodInput, calInput, priceInput, fatInput, carbsInput, proteinInput })
    setItems(list.list)

    setFoodInput('');
    setCalInput('');
    setPriceInput('');
    setFatInput('');
    setCarbsInput('');
    setProteinInput('');
  };

  const handleRemoveItemFromList = async (id) => {

    if (window.confirm('Are you sure?')) {

    const list = await delete_cal_tracker_entry({id})
    setItems(list.list)
    
    }
  };

    const [time, setTime] = useState(new Date());
  
    useEffect(() => {
      const interval = setInterval(() => {
        setTime(new Date());
      }, 1000);
      return () => clearInterval(interval);
    }, []);

  return (
    <div id="parent-div">
        <Link to="/home">
            <span className="material-symbols-outlined back-arrow"> arrow_back</span>
        </Link>
      <div id="item-form">
        <header className='header'>
          <h1>Calories Tracker</h1>
          <div id="clock">{time.toLocaleTimeString()}</div>
        </header>
        <div className="form-control">
          <input
            type="text"
            className="form-input"
            value={foodInputs}
            onChange={(e) => setFoodInput(e.target.value)}
            placeholder="Food Name"
          />
          <input
            type="number"
            className="form-input"
            value={calInput}
            onChange={(e) => setCalInput(e.target.value)}
            placeholder="Calories"
          />
          <input
            type="number"
            className="form-input"
            value={priceInput}
            onChange={(e) => setPriceInput(e.target.value)}
            placeholder="Price"
          />
          <input
            type="number"
            className="form-input"
            value={fatInput}
            onChange={(e) => setFatInput(e.target.value)}
            placeholder="Fat Calories"
          />
          <input
            type="number"
            className="form-input"
            value={carbsInput}
            onChange={(e) => setCarbsInput(e.target.value)}
            placeholder="Carbs Calories"
          />
          <input
            type="number"
            className="form-input"
            value={proteinInput}
            onChange={(e) => setProteinInput(e.target.value)}
            placeholder="Protein Calories"

          />
        </div>
        <div className="form-control">
          <button
            className="btn" 
            onClick={() => handleAddFood()}
          >
           Add Food Items
          </button>
        </div>
        



      <ul id="item-list" className="items">
            {items.map((entry, index) => (
                  <Cal_tracker_entry_row
                      key={index}
                      id={entry.id}
                      entry={entry}
                      handleRemoveItemFromList={handleRemoveItemFromList}                        
                  />
            ))}
      </ul>
      <div className='SaveBtnParentdiv'>
        <button 
        className="btn2"
        onClick={() => savedTotalItemFromCalTracker()}
        >
            Save
          </button>
          </div>

        <div className='total-parent-div'>
          <div className="total-div">
              <button id="total" className="btn-total">Total Cal { totalCal}</button>
              <button id="totalPrice" className="btn-total-price">Total Price: { totalPrice} $</button>
          </div>
          <div className="sec-total-div">
            <button id="total-fat" className="btn-total">Total Fat: { totalFat}</button>
            <button id="total-carbs" className="btn-total-price">Total Carbs: { totalCarbs}</button>
            <button id="total-protein" className="btn-total-price">Total Protein: { totalProtein}</button>
        </div>
        </div>
      </div>

    </div>
  );
}

