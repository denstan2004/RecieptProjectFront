import { useEffect, useState } from "react";
import "./ReceiptInfo.css";

function ReceiptInfo({ ReceiptInfo }) {
   const [infoWares, setInfoWares] = useState(undefined);
   const [infoLog, setInfoLog] = useState(undefined);
   const [infoEvent, setInfoEvent] = useState(undefined);
   const [waresVisibility, setWaresVisibility] = useState(true);
   const [logVisibility, setLogVisibility] = useState(false);
   const [eventVisibility, setEventVisibility] = useState(false);

   const ResetVisibility = () => {
      setEventVisibility(false);
      setLogVisibility(false);
      setWaresVisibility(false);
      console.log("reset");
   };

   useEffect(() => {
      console.log(ReceiptInfo); // Перевірка, що приходить у ReceiptInfo
      if (ReceiptInfo) {
         setInfoWares(ReceiptInfo.wares);
         setInfoEvent(ReceiptInfo.events);
         setInfoLog(ReceiptInfo.logs);
      }
   }, [ReceiptInfo]);

   const onWaresChange = async () => {
      await ResetVisibility();
      setWaresVisibility(true);
      console.log("change");
   };

   const onEventChange = async () => {
      await ResetVisibility();
      setEventVisibility(true);
   };

   const onLogChange = async () => {
      await ResetVisibility();
      setLogVisibility(true);
   };

   return (
      <div>
         <div className="reciept-info-buttons">
            <button onClick={onWaresChange}>Позиції</button>
            <button onClick={onEventChange}>Події</button>
            <button onClick={onLogChange}>Логи</button>
         </div>

         {/* Позиції */}
         {waresVisibility && infoWares ? (
            <div>
               {infoWares.map(el => (
                  <div key={el.codeWares}>{el.codeWares}</div>
               ))}
            </div>
         ) : null}

         {/* Події */}
         {eventVisibility && infoEvent ? (
            <div>
               {infoEvent.map(el => (
                  <div key={el.eventName}>{el.eventName}</div>
               ))}
            </div>
         ) : null}

         {/* Логи */}
         {logVisibility && infoLog && infoLog.length > 0 ? (
            <div>
               {infoLog.map(el => (
                  <div key={el.codeWares}>{el.codeWares}</div>
               ))}
            </div>
         ) : null}
      </div>
   );
}

export default ReceiptInfo;
