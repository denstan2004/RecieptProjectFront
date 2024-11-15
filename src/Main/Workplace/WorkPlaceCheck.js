import { useState,useEffect } from "react";
function WorkPlaceCheck({workplace, onSelectionChange,selectedWorkPlaces}){
    const [checked, setChecked] = useState(false);
    useEffect(() => {
        if (selectedWorkPlaces.size !== 0) {
            console.log(workplace.idwarehouse);
            console.log(selectedWorkPlaces);
            // Use .has() instead of .some() for Set
            if (selectedWorkPlaces.has(workplace.idWorkplace)) { 
                console.log(true);
                setChecked(true);
            } else {
                setChecked(false); // Reset if not found
            }
        }
    }, [selectedWorkPlaces, workplace.idwarehouse]);
    const checkboxChangeHandle = (event) => {
        setChecked(true);
        console.log(selectedWorkPlaces)
        onSelectionChange(workplace.idWorkplace, event.target.checked);
    };

    return (
        <label >
            <input 
                checked ={checked}
                type="checkbox"
                value={workplace.idWorkplace} // assuming warehouse has an id
                onChange={checkboxChangeHandle}
            />
            {workplace.name}  {/* assuming warehouse has a name */}
        </label>
    );
}
export default WorkPlaceCheck