// SavedItems component
export const SavedItems = ({ title, totalFat, totalCarbs, totalProtein, totalCalories, totalPrice, data, id}) => {


    return (
      <div className="parent-div-saved-items-from-calculater">
        <ul className='save-value-data-section'>
          <h3>{title}</h3>
          <li className="tdee">{totalCalories}</li>
          <li className="total-calories-intake">{totalCarbs}</li>
          <li className="basal-metabolic-rate">{totalProtein}</li>
          <li className="bmi">{totalFat}</li>
          <li className="bmi">{totalPrice}</li>
          
        </ul>
      </div>
      
    );
  };