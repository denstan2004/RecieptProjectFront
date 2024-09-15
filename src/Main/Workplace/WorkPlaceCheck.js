function WorkPlaceCheck({workplace, onSelectionChange}){


    const checkboxChangeHandle = (event) => {
        onSelectionChange(workplace.idWorkplace, event.target.checked); // Notify parent about change
    };

    return (
        <label  >
            <input 
                type="checkbox"
                value={workplace.idWorkplace} // assuming warehouse has an id
                onChange={checkboxChangeHandle}
            />
            {workplace.name}  {/* assuming warehouse has a name */}
        </label>
    );
}
export default WorkPlaceCheck