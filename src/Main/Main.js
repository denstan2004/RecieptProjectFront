import { useEffect, useState } from "react";
import axios from 'axios';
import WarehouseCheck from "./Warehouse/WarehouseCheck";
import WorkplaceCheck from "./Workplace/WorkPlaceCheck"
import "./Main.css"
import Receipt from "./Receipt/Receipt";
import ReceiptInfo from "./Receipt/ReceiptInfo/ReceiptInfo";
import Filter from "./Filter/Filter";
import DateFilter from "./Filter/DateFilter";

function Main(){
    const [allWarehouses,setAllWarehouses] = useState([]); //всі склади і заклади
    const [selectedWarehouses,setSelectedWarehouses] = useState(new Set()); // обрані склади заклади
    const [warehouseVisibility, setWarehouseVisibility]=useState (false);// видимість панелі склади і заклади
    const [fillterVisibility, setFillterVisibility]=useState (false);// видимість панелі склади і заклади
    const [workPlaceVisivility, setWorkPlaceVisibility]=useState(false); // видимиість вікна з касами
    const [dateFillterVisivility, setDateFillterVisibility]=useState(false); // видимиість вікна з касами
 //   const [dateStart,setDateStart]= useState();
   // const [dateEnd,setDateEnd]=useState();
    const [allWorkPlaces, setAllWorkPlaces]=useState([]);// всі робочі місця 
    const [selectedWorkPlaces,setSelectedWorkPlaces]=useState(); // обрані робочі місця
    const [receipts,setReceipts]=useState([]); // всі чеки 
    const [fillteredReceipts,setFillteredReceipts]=useState([]); // відфільтровані чеки
    const [selectedreciept,SetSelectedReciept]=useState(undefined); // обраний чек 
    const [selectedrecieptVisibility,setSelectedrecieptVisibility]= useState(false); // видимість вінка обраного чека 
    const [selectedReceiptInfo, setSelectedReceiptInfo]= useState(); // інформація обраного чекa
    localStorage.setItem("back-prefix", "https://localhost:59527/api/Spar");

    useEffect(() => {
        fetchWarehouses();  
    }, []);

    const fetchWarehouses = async () => {
        axios.get(`${localStorage.getItem("back-prefix")}/Get/All/Warehouses`, {
            withCredentials: true 
        })
        .then(response => {
            if (response.status === 200) {
                setAllWarehouses(response.data);
            }
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
    };
    const setReceipt=(receipt)=>
    {
        SetSelectedReciept(receipt);
    }
    useEffect(()=>{
            if( selectedreciept!=undefined)
            {
                fetchReceipt();
                setSelectedrecieptVisibility(true);
            }
    },[selectedreciept])
    const fetchReceipt = async () => {
        axios.get(`${localStorage.getItem("back-prefix")}/Get/FullInfo/ByReceipt/${selectedreciept.idWorkplace}/${selectedreciept.codeReceipt}/${selectedreciept.codePeriod}`, {
            withCredentials: true 
        })
        .then(response => {
            if (response.status === 200) {
                console.log(response.data);
                setSelectedReceiptInfo(response.data);
            }
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
    };
    const handleWarehouseSelection = (warehouseCode, isChecked) => {
        setSelectedWarehouses(prevSelected => {
            const updatedSelection = new Set(prevSelected);
            if (isChecked) {
                updatedSelection.add(warehouseCode); // Add to Set
            } else {
                updatedSelection.delete(warehouseCode); // Remove from Set
            }
            console.log(updatedSelection);

            return updatedSelection;
        });
    };
    const HandleWorkPlaceButtonClick= async () => {
        await axios.post(`${localStorage.getItem("back-prefix")}/Get/Last/ReceiptByWorkPlace`, 
            Array.from(selectedWorkPlaces) // Send the array directly
        )
        .then(response => {
            setReceipts(response.data);
            setFillteredReceipts(response.data)
            console.log(response.data);
            setWarehouseVisibility(false);
            setWorkPlaceVisibility(false);
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
    };
    const HandleWarehouseButtonClick = async () => {
        await axios.post(`${localStorage.getItem("back-prefix")}/Get/All/WorkplacesById`, 
            Array.from(selectedWarehouses) // Send the array directly
        )
        .then(response => {
            setAllWorkPlaces(response.data);
            console.log(response.data);
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
        setWorkPlaceVisibility(true);
    };
    
    const handleWorkplaceSelection = (workplaceCode, isChecked) => {
        setSelectedWorkPlaces(prevSelected => {
            const updatedSelection = new Set(prevSelected);
            if (isChecked) {
                updatedSelection.add(workplaceCode); // Add to Set
            } else {
                updatedSelection.delete(workplaceCode); // Remove from Set
            }
            console.log(updatedSelection);

            return updatedSelection;
        });
    };
    const handleWarehouseShow=()=>{
        const a= warehouseVisibility
        setWarehouseVisibility(!a);
    }
    const handleWorkplaceShow=()=>{
        const a= workPlaceVisivility
        setWorkPlaceVisibility(!a);
    }
    const handleFillterShow=()=>{
        const a= fillterVisibility
        setFillterVisibility(!a);
    }
    const handleDateFillterShow=()=>{
        const a= dateFillterVisivility
        setDateFillterVisibility(!a);
    }
    const CloseReceiptInfo=()=>{
        setSelectedrecieptVisibility(false)
        setSelectedReceiptInfo(undefined)
        SetSelectedReciept(undefined)
    }
    const setFltrdReceipts = (fltrdreceipts)=>{
        setFillteredReceipts(fltrdreceipts);
    }
    const setDate = (dateStart, dateEnd) => {
        // Create the payload object with the required fields
        const payload = {
            WorkplacesIds: Array.from(selectedWorkPlaces), // Convert selectedWorkPlaces Set to Array
            begin: dateStart, // Assuming dateStart is in ISO 8601 format
            end: dateEnd // Assuming dateEnd is in ISO 8601 format
        };
    
        // Send the POST request with the payload
        axios.post(`${localStorage.getItem("back-prefix")}/Get/All/ReceiptsByDate`, payload)
            .then(response => {
                setReceipts(response.data);
                setFillteredReceipts(response.data);
                console.log(response.data);
                setWarehouseVisibility(false);
                setWorkPlaceVisibility(false);
                setDateFillterVisibility(false);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }
    
  
    
    return (
        <div>
            <div className="Buttons">
                <button onClick={handleWarehouseShow}>SHOW Warehouse</button>
                <button onClick={handleWorkplaceShow}>SHOW Workplace</button>
                <button onClick={handleFillterShow}>SHOW Fillter</button>
                <button onClick={handleDateFillterShow}>SHOW Date Fillter</button>

            </div>
            <div className="Checkboxes">
            { warehouseVisibility ?
                <div className="warehouseCheckcontainer">
                   
                    <div className="WarehouseCheckbox">
                       {allWarehouses.map(warehouse => (
                            <WarehouseCheck key={warehouse.id} onSelectionChange={handleWarehouseSelection} warehouse={warehouse} />
                      ))}
                    </div>
                    <div className="button-warehouse">
                        <button  onClick={HandleWarehouseButtonClick}>Обрати warehouse</button>
                    </div>
                </div>
                :
                <div></div>
                }
                { workPlaceVisivility ?
                <div  className="warehouseCheckcontainer">
                     <div className="WorkPlaceCheckbox">
                         {allWorkPlaces.map(workplace => (
                           <WorkplaceCheck key={workplace.id} onSelectionChange={handleWorkplaceSelection} workplace={workplace} />
                           ))}
                    </div>
                    <div className="button-workplace">
                         <button  onClick={HandleWorkPlaceButtonClick}>Обрати workplace</button>
                    </div>
                </div>
                :
                <div></div>
                }
                { dateFillterVisivility ?
                <div  className="warehouseCheckcontainer">
                     <DateFilter setDate={setDate}></DateFilter>
                </div>
                :
                <div></div>
                }
                 { fillterVisibility ?
                <div  className="warehouseCheckcontainer">
                   <Filter  setFltrdReceipts ={setFltrdReceipts }Receipts={receipts}></Filter>
                </div>
                :
                <div></div>
                }
            </div>
           {fillteredReceipts.length!=0 ?
           <div>
                   {fillteredReceipts.map((receipt, index) => (
                <Receipt setReceipt={setReceipt}  key={index} receipt={receipt} />
                    ))}
           </div>
           :
           <div>

           </div>
           }
           { selectedrecieptVisibility && selectedReceiptInfo ? (
                 <div className="receipt-info">
                    <button className="receipt-info-close-button" onClick={CloseReceiptInfo}>закрити</button>
                    <ReceiptInfo ReceiptInfo={selectedReceiptInfo}></ReceiptInfo>
             </div>
 )
                : 
                <div> </div> 
            }

        </div>
    );
}

export default Main;
