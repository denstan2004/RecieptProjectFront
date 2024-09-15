import { useState } from "react";

function DateFilter({ setDate }) {
    const [dateStart, setDateStart] = useState("");
    const [dateEnd, setDateEnd] = useState("");

    const DateSetHandler = () => {
        setDate(dateStart, dateEnd);
    };

    const dateStartChange = (event) => {
        setDateStart(event.target.value);
    };

    const dateEndChange = (event) => {
        setDateEnd(event.target.value);
    };

    return (
        <div>
            <div>
                <div>Час початку</div>
                <input onChange={dateStartChange} type="datetime-local" value={dateStart}></input>
            </div>
            <div>
                <div>Час кінця</div>
                <input onChange={dateEndChange} type="datetime-local" value={dateEnd}></input>
            </div>
            <button onClick={DateSetHandler}>Прийняти обмеження</button>
        </div>
    );
}

export default DateFilter;
