import { useEffect, useState} from "react";
import { get_bmr_bmi_calculation } from '../../ApiService/bmr_calculator';
import { getTotalItemFromCalTracker } from "../../ApiService/cal_tracker";

export const MacroRatio = ({ title}) => {

    const [dataAvailable, setDataAvailable] = useState(false);
    const [totalCalculation, setTotalCalculation] = useState('');
    const [titleShow, setTitleShow] = useState(true);
    const [total, setTotal] = useState({ calTotal: 0, priceTotal: 0, carbsTotal: 0, proteinTotal: 0});


useEffect(() => {
    loadBmrCalculation()
    loadEntries()
}, [])


const loadBmrCalculation = async() => {
    get_bmr_bmi_calculation()
    .then((data) =>{
        setTotalCalculation(data.bmiCalculation[0])
        // console.log(data.bmiCalculation[0]);
        if (data.bmiCalculation.length === 1) {
            setDataAvailable(true);
            setTitleShow(false)
        } else {
            setDataAvailable(false);
            setTitleShow(true)
        }
    })
}



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



// console.log(list.length);   

  
    return (
      <div className="parent-div-saved-items-from-calculater">
        <ul className='save-value-data-section'>
          <h3>{title}</h3>
          { titleShow && <h4>Fam, go save the data first from Bmi/Bmr section</h4>}
          { dataAvailable && <div>

            <li className="tdee">{total.proteinTotal} - {totalCalculation.protein_macro_ratio } &nbsp;=&nbsp; { Number( totalCalculation.protein_macro_ratio) - Number(total.proteinTotal)} kcal left_</li>
            <li className="total-calories-intake"> {total.fatTotal} - { totalCalculation.fat_macro_ratio} &nbsp;=&nbsp; {Number( totalCalculation.fat_macro_ratio) - Number(total.fatTotal)} kcal left</li>
            <li className="basal-metabolic-rate">{total.carbsTotal} - { totalCalculation.carbs_macro_ratio}&nbsp; =&nbsp; {Number(totalCalculation.carbs_macro_ratio) - Number(total.carbsTotal)} kcal left</li>
          </div>}
          
        </ul>
      </div>
      
    );
  };