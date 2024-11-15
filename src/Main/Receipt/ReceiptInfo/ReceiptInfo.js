import { useEffect, useState } from "react";
import "./ReceiptInfo.css";
import axios from "axios"
import ReceiptInfoWares from "./ReceiptInfoWares/ReceiptInfoWares";
import MessageBox from "./ReceiptInfoMessageBox/ReceiptInfoMessageBox";

function ReceiptInfo({ ReceiptInfo, Selectedreciept }) {
  const [infoWares, setInfoWares] = useState([]);
  const [infoLog, setInfoLog] = useState([]);
  const [infoEvent, setInfoEvent] = useState([]);
  const [waresVisibility, setWaresVisibility] = useState(true);
  const [logVisibility, setLogVisibility] = useState(false);
  const [eventVisibility, setEventVisibility] = useState(false);
  const [sum, setSum] = useState(0);
  const[messageVisibility,setMessageVisibility]=useState(false)
  const[messageText,setMessageText]=useState("")
  const ShowUpdateMessage=()=>{
    setMessageText("Ви впевнені що хочете оновити чек?")
    setMessageVisibility(true);
  }
  const ShowDeleteMessage=()=>{
    setMessageText("Ви впевнені що хочете видалити чек?")
    setMessageVisibility(true);
  }
  const Submit=(bool,action)=>{
    console.log(bool);
    setMessageVisibility(false)
    if(bool==="true")  { onChangeReceipt(action);}
  }
  const ResetVisibility = () => {
    setEventVisibility(false);
    setLogVisibility(false);
    setWaresVisibility(false);
  };

  useEffect(() => {
    console.log(Selectedreciept);
    if (ReceiptInfo) {
      setInfoWares(ReceiptInfo.wares || []);
      setInfoEvent(ReceiptInfo.events || []);
      setInfoLog(ReceiptInfo.logs || []);
    }
    setSum(Selectedreciept.sumTotal || 0);
  }, [ReceiptInfo]);

  const onWaresChange = async () => {
    await ResetVisibility();
    setWaresVisibility(true);
  };

  const onEventChange = async () => {
    await ResetVisibility();
    setEventVisibility(true);
  };

  const onLogChange = async () => {
    await ResetVisibility();
    setLogVisibility(true);
  };

  // Функція для оновлення товару в масиві
  const updateWares = (updatedWare) => {
    const newInfoWares = infoWares.map((ware) =>
      ware.codeWares === updatedWare.codeWares ? updatedWare : ware
    );
    setInfoWares(newInfoWares);

    // Переобчислити загальну суму чека
    const newSum = newInfoWares.reduce(
      (acc, ware) => acc + parseFloat(ware.sumTotal),
      0
    );
    setSum(newSum.toFixed(2));
  };
  const onChangeReceipt=(action)=>{
    if(action==="Update"){
   const  payload={
      codeReceipt: Selectedreciept.codeReceipt,
      codePeriod: Selectedreciept.codePeriod,
      idWorkplace:Selectedreciept.idWorkplace,
      Wares: infoWares

    }
    axios.post(`${localStorage.getItem("back-prefix")}/Update/Receipt`, payload)
    .then(response => {
       if(response.data){
          alert("Змінено")
       }
    })
    .catch(error => {
        console.error('There was an error!', error);
    });  } 
    else if(action==="Delete")
    {
      
    }
  }

  return (
    <div className="receipt-info-container">
      {messageVisibility ? 
      <div className="message-container">
          <MessageBox text={messageText} Submit={Submit} ></MessageBox>
      </div> :<div></div>
      }
      <div className="reciept-info-buttons">
        <button className="button-81" onClick={onWaresChange}>
          Позиції
        </button>
        <button className="button-81" onClick={onEventChange}>
          Події
        </button>
        <button className="button-81" onClick={onLogChange}>
          Логи
        </button>
        <button className="button-83" onClick={ShowUpdateMessage}>
          Змінити чек
        </button>
        <button className="button-82"  onClick={ShowDeleteMessage}>
          Видалити чек
        </button>
      </div>
      <div className="receipt-info-receipt-data">
        <div className="receipt-info-name">{Selectedreciept.warehousName}</div>
        <div className="receipt-info-name">
          {Selectedreciept.client.nameClient}
        </div>
        <div className="receipt-info-sum-total">{sum}</div>
      </div>
      <div className="receipt-info-table">
        {waresVisibility && (
          <div className="receipt-info-wares">
            <div className="receipt-info-wares-item-tittle-name">Назва товару</div>
            <div className="receipt-info-wares-item-tittle">Артикул</div>
            <div className="receipt-info-wares-item-tittle">Код товару</div>
            <div className="receipt-info-wares-item-tittle">Код uktzed</div>
            <div className="receipt-info-wares-item-tittle">Ціна</div>
            <div className="receipt-info-wares-item-tittle">Кількість</div>
            <div className="receipt-info-wares-item-tittle">Сума гаманця</div>
            <div className="receipt-info-wares-item-tittle">Сума бонуса</div>
            <div className="receipt-info-wares-item-tittle">Сума знижки</div>
            <div className="receipt-info-wares-item-tittle">Сума total</div>
          </div>
        )}

        {waresVisibility && infoWares.length > 0 && (
          <div>
            {infoWares.map((el) => (
              <ReceiptInfoWares
                key={el.codeWares}
                Ware={el}
                updateWares={updateWares}
              />
            ))}
          </div>
        )}
        {eventVisibility && infoEvent ? (
          <div>
            {infoEvent.map((el) => (
              <div className="receipt-info-events">
                <div className="receipt-info-events-item">{el.eventName}</div>
                <div className="receipt-info-events-item">{el.createdAt}</div>
                <div className="receipt-info-events-item">{el.resolvedAt}</div>
                {el.productName ? (
                  <div className="receipt-info-events-item">
                    {el.productName}
                  </div>
                ) : (
                  <div className="receipt-info-events-item">--</div>
                )}
              </div>
            ))}
          </div>
        ) : null}

        {logVisibility && infoLog && infoLog.length > 0 && (
          <div>
            {infoLog.map((el) => (
              <div className="receipt-info-log">
                <div className="receipt-info-log-item">{el.createdAt}</div>
                <div className="receipt-info-log-item">{el.updatedBy}</div>
                <div className="receipt-info-log-item">{el.actions}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ReceiptInfo;
