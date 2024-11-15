import { useEffect, useState } from "react";
import axios from 'axios';
import WarehouseCheck from "./Warehouse/WarehouseCheck";
import WorkplaceCheck from "./Workplace/WorkPlaceCheck"
import "./Main.css"
import Receipt from "./Receipt/Receipt";
import ReceiptInfo from "./Receipt/ReceiptInfo/ReceiptInfo";
import Filter from "./Filter/Filter";
import DateFilter from "./Filter/DateFilter";
import "./Receipt/Receipt.css"
function Main(){
    const [allWarehouses,setAllWarehouses] = useState([]); //всі склади і заклади
    const [selectedWarehouses,setSelectedWarehouses] = useState(new Set()); // обрані склади заклади
    const [warehouseVisibility, setWarehouseVisibility]=useState (false);// видимість панелі склади і заклади
    const [fillterVisibility, setFillterVisibility]=useState (false);// видимість панелі склади і заклади
    const [workPlaceVisivility, setWorkPlaceVisibility]=useState(false); // видимиість вікна з касами
    const [dateFillterVisivility, setDateFillterVisibility]=useState(false); // видимиість вікна з касами
    const [dateStart,setDateStart]= useState();
    const [dateEnd,setDateEnd]=useState();
    const [allWorkPlaces, setAllWorkPlaces]=useState([]);// всі робочі місця 
    const [selectedWorkPlaces,setSelectedWorkPlaces]=useState(new Set()); // обрані робочі місця
    const [receipts,setReceipts]=useState([]); // всі чеки 
    const [fillteredReceipts,setFillteredReceipts]=useState([]); // відфільтровані чеки
    const [selectedreciept,SetSelectedReciept]=useState(undefined); // обраний чек 
    const [selectedrecieptVisibility,setSelectedrecieptVisibility]= useState(false); // видимість вінка обраного чека 
    const [selectedReceiptInfo, setSelectedReceiptInfo]= useState(); // інформація обраного чекa
    const [userSelectedReceipts,setUserSelectedReceipts]=useState([]);  // чеки до 1с
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
        
       setDateFillterVisibility(true);
    };
    const HandleWarehouseButtonClick = async () => {
        setSelectedWorkPlaces(new Set());
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
        setDateStart(dateStart);
        setDateEnd( dateEnd);
        const payload = {
            WorkplacesIds: Array.from(selectedWorkPlaces), // Convert selectedWorkPlaces Set to Array
            begin: dateStart, // Assuming dateStart is in ISO 8601 format
            end: dateEnd // Assuming dateEnd is in ISO 8601 format
        };
    
        // Send the POST request with the payload
        axios.post(`${localStorage.getItem("back-prefix")}/Get/All/ReceiptsByDate`, payload,{ withCredentials: true })
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
    const userSelect = (receipt) => {
        setUserSelectedReceipts((prev) => {
            const isReceiptSelected = prev.findIndex(item => 
                item.codePeriod === receipt.codePeriod &&
                item.idWorkplace === receipt.idWorkplace &&
                item.codeReceipt === receipt.codeReceipt
            ) !== -1;
    
            if (isReceiptSelected) {
                // Якщо чек вже є в масиві, видаляємо його
                return prev.filter(item => 
                    !(item.codePeriod === receipt.codePeriod &&
                    item.idWorkplace === receipt.idWorkplace &&
                    item.codeReceipt === receipt.codeReceipt)
                );
            } else {
                // Якщо чека немає, додаємо його
                return [...prev, receipt];
            }
        });
    };
    
  
    const handleSend1c = async () => {
        try {
            // Масив промісів для усіх POST запитів
            const promises = userSelectedReceipts.map(async (element) => {
                const payload = {
                    idWorkplace: element.idWorkplace,
                    codePeriod: element.codePeriod,
                    codeReceipt: element.codeReceipt
                };
                console.log(payload);
    
                // Виконуємо POST запит для кожного елемента
                const response = await axios.post(`https://localhost:59527/SendReceipt1C`, payload);
    
                if (response.status !== 200) {
                    throw new Error('Error sending receipt to 1C');
                }
            });
    
            // Використовуємо Promise.all, щоб дочекатися виконання усіх запитів
            await Promise.all(promises);
    
            // Якщо всі запити успішні, показуємо повідомлення про успіх
            alert("Відправлено в 1с");
        } catch (error) {
            // Якщо хоча б один запит не вдався, показуємо помилку
            console.error('There was an error!', error);
            alert("Помилка при відправленні в 1с");
        }
    };
     const handleCheck1c =()=>{
        axios.get(`https://localhost:59527/GetInfo`, {
            withCredentials: true 
        })
        .then(response => {
            if (response.status === 200) {
                alert(response.data);
            }
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
    };
     
    return (
        <div>
            <div className="Buttons">
                <button className="button-81" onClick={handleWarehouseShow}>SHOW Warehouse</button>
                <button className="button-81" onClick={handleWorkplaceShow}>SHOW Workplace</button>
                <button className="button-81" onClick={handleDateFillterShow}>SHOW Date Fillter</button>
                <button className="button-81" onClick={handleFillterShow}>SHOW Fillter</button>
                <button className="button-81" onClick={handleSend1c}>Send to 1C</button>
                <button className="button-81" onClick={handleCheck1c}>Check 1C</button>


            </div>
            <div className="Checkboxes">
            { warehouseVisibility ?
                <div className="warehouseCheckcontainer">
                   
                    <div className="WarehouseCheckbox">
                       {allWarehouses.map(warehouse => (
                            <WarehouseCheck selectedWarehouses={selectedWarehouses}  key={warehouse.id} onSelectionChange={handleWarehouseSelection} warehouse={warehouse} />
                      ))}
                    </div>
                    <div className="button-warehouse">
                        <button className="receipt-button" onClick={HandleWarehouseButtonClick}>Обрати warehouse</button>
                    </div>
                </div>
                :
                <div></div>
                }
                { workPlaceVisivility ?
                <div  className="workplaceCheckcontainer">
                     <div className="WorkPlaceCheckbox">
                         {allWorkPlaces.map(workplace => (
                           <WorkplaceCheck selectedWorkPlaces={selectedWorkPlaces} key={workplace.id} onSelectionChange={handleWorkplaceSelection} workplace={workplace} />
                           ))}
                    </div>
                    <div className="button-workplace">
                         <button className="receipt-button"   onClick={HandleWorkPlaceButtonClick}>Обрати workplace</button>
                    </div>
                </div>
                :
                <div></div>
                }
                { dateFillterVisivility ?
                <div  className="dateFilterCheckcontainer">
                     <DateFilter start={dateStart} end={dateEnd} setDate={setDate}></DateFilter>
                </div>
                :
                <div></div>
                }
                 { fillterVisibility ?
                <div  className="fillterCheckcontainer">
                   <Filter handleFillterShow={handleFillterShow} workplace={selectedWorkPlaces} dateStart={dateStart} dateEnd={dateEnd} setFilteredReceipts={setFltrdReceipts}></Filter>
                </div>
                :
                <div></div>
                }
            </div>
           {fillteredReceipts.length!=0 ?
           
            <div>
            <div className="reciept-container">
                    <div className="receipt-param-type-name">Час створення</div>
                    <div className="receipt-param-type">Тип чеку</div>
                     <div className="receipt-param-type">Ціна </div>
                    <div className="receipt-param-type">Код в 1С</div>
                     <div className="receipt-param-type-name">Назва каси</div>
                     <div className="receipt-param-type-name">Назва точки</div>
                     <div className="receipt-param-type-name">Клієнт</div>
                     <div className="receipt-param-type">Спосіб оплати</div>
                     <div className="receipt-param-type">Інформація чека</div>
            </div>
           <div>
                   {fillteredReceipts.map((receipt, index) => (
                <Receipt userSelect={userSelect} setReceipt={setReceipt}  key={index} receipt={receipt} />
                    ))}
           </div>
           </div>
           :
           <div>

           </div>
           }
           { selectedrecieptVisibility && selectedReceiptInfo ? (
                 <div className="receipt-info">
                    <div className="receipt-info-close-button">
                        <button className="button-81"  onClick={CloseReceiptInfo}>закрити</button> 
                    </div>
                  
                    <ReceiptInfo Selectedreciept={selectedreciept} ReceiptInfo={selectedReceiptInfo}></ReceiptInfo>
             </div>
 )
                : 
                <div> </div> 
            }

        </div>
    );
}

export default Main;
