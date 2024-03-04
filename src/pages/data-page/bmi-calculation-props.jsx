import { useEffect, useState} from "react";
import { get_bmr_bmi_calculation } from '../../ApiService/bmr_calculator';

export const BmiCalculation = ({ title}) => {

    const [dataAvailable, setDataAvailable] = useState(false);
    const [totalCalculation, setTotalCalculation] = useState('');
    const [titleShow, setTitleShow] = useState(true);

useEffect(() => {
    loadBmrCalculation()
}, [])


const loadBmrCalculation = async() => {
    get_bmr_bmi_calculation()
    .then((data) =>{
        setTotalCalculation(data.bmiCalculation[0])
        if (data.bmiCalculation.length === 1) {
            setDataAvailable(true);
            setTitleShow(false)
        } else {
            setDataAvailable(false);
            setTitleShow(true)
        }
    })
}


// console.log(list.length);   

  
    return (
      <div className="parent-div-saved-items-from-calculater">
        <ul className='save-value-data-section'>
          <h3>{title}</h3>
          { titleShow && <h4>Fam, go save the data first from Bmi/Bmr section</h4>}
          { dataAvailable && <div>
            <li className="tdee">Basal Metabolic Rate  { totalCalculation.bmr}</li>
            <li className="total-calories-intake"> Body mass index  { totalCalculation.bmi}</li>
            <li className="basal-metabolic-rate">Total Daily Energy Expenditure  { totalCalculation.tdee}</li>
            <li className="bmi">Daily recommended water intake { totalCalculation.water_intake}</li>
            <li className="bmi">Macro Ratio / { totalCalculation.macro_ratio}</li>
            <li className="bmi">Weight Gain { totalCalculation.weight_gain}</li>
            <li className="bmi">Weight Loss { totalCalculation.weight_gain}</li>
          </div>}
          
        </ul>
      </div>
      
    );
  };