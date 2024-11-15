import { useEffect, useState } from "react";

function WarehouseCheck({ warehouse, onSelectionChange, selectedWarehouses }) {
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        if (selectedWarehouses.size !== 0) {
            console.log(warehouse.idwarehouse);
            console.log(selectedWarehouses);
            // Use .has() instead of .some() for Set
            if (selectedWarehouses.has(warehouse.code)) { 
                console.log(true);
                setChecked(true);
            } else {
                setChecked(false); // Reset if not found
            }
        }
    }, [selectedWarehouses, warehouse.idwarehouse]);

    const checkboxChangeHandle = (event) => {
        console.log(selectedWarehouses);
        setChecked(true);
        onSelectionChange(warehouse.code, event.target.checked);
    };

    return (
        <label>
            <input
                checked={checked}
                type="checkbox"
                value={warehouse.code}
                onChange={checkboxChangeHandle}
            />
            {warehouse.name}  {/* assuming warehouse has a name */}
        </label>
    );
}

export default WarehouseCheck;
