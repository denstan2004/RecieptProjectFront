import { useEffect, useState } from "react";
import "./DateFillter.css"
function DateFilter({ setDate,start,end }) {
    const [dateStart, setDateStart] = useState("");
    const [dateEnd, setDateEnd] = useState("");
    useEffect(()=>{
        setDateStart(start);
        setDateEnd(end);
    },[start,end    ])

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
        <div className="date-fillter-container">
            <div>
                <div>Час початку</div>
                <input onChange={dateStartChange} type="datetime-local" value={dateStart}></input>
            </div>
            <div>
                <div>Час кінця</div>
                <input onChange={dateEndChange} type="datetime-local" value={dateEnd}></input>
            </div>
            <button className="receipt-button-date" onClick={DateSetHandler}>Прийняти обмеження</button>
        </div>
    );
}

export default DateFilter;
