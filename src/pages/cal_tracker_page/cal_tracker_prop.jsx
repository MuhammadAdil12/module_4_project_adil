export const Cal_tracker_entry_row = ({ entry, id, handleRemoveItemFromList}) => {

    return (
        <>
            <li className="food-container" key={id}>
            <button className="remove-item btn-link">{entry.foodInput}</button>
            <button className="remove-item btn-link">{`${entry.calInput} Cal`}</button>
            <button className="remove-item btn-link">{`${entry.priceInput} $`}</button>
            <button className="remove-item btn-link">{`${entry.fatInput} Fat`}</button>
            <button className="remove-item btn-link">{`${entry.carbsInput} Carbs`}</button>
            <button className="remove-item btn-link">{`${entry.proteinInput} Protein`}</button>
            <button className="remove-item btn-link text-red" onClick={() => handleRemoveItemFromList(id)}>
            <p className="fa-solid fa-xmark">
                <span className="material-symbols-outlined">cancel</span>
            </p>
            </button>
          </li>
        </>
    );
}
