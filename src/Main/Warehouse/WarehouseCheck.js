function WarehouseCheck({warehouse, onSelectionChange}){


    const checkboxChangeHandle = (event) => {
        onSelectionChange(warehouse.code, event.target.checked); // Notify parent about change
    };

    return (
        <label  >
            <input 
                type="checkbox"
                value={warehouse.code} // assuming warehouse has an id
                onChange={checkboxChangeHandle}
            />
            {warehouse.name}  {/* assuming warehouse has a name */}
        </label>
    );
}
export default WarehouseCheck