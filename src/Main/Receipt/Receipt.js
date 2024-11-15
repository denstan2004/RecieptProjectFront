import { useState } from "react";
import "./Receipt.css";
import { FaQuestionCircle } from 'react-icons/fa';

function Receipt({userSelect, receipt, setReceipt }) {
  const [isSelected, setIsSelected] = useState(false);
  const [isChanged,setIsChanged]=useState(false);
  // Функція, яка викликається при кліку на рядок
  const HandleOnRowClick = () => {
    setIsSelected(!isSelected);
    userSelect(receipt); // Змінюємо стан isSelected на протилежний
  };

  const HandleOnButtonClick = () => {
    setReceipt(receipt);
  };


  return (
    <div
      className={`reciept-container ${isSelected ? "selected" : ""}`}
    >
      <div onClick={HandleOnRowClick} className="receipt-param-name">
        <div></div>
        <div>{receipt.dateReceipt.split("T")[0]}</div>
        <div> {receipt.dateReceipt.split("T")[1]}</div>
        {receipt.isChanged ??         <FaQuestionCircle  className="receipt-question-icon"  color="gray"   size={23}  />
      }

      </div>
      <div onClick={HandleOnRowClick} className="receipt-param">
        <div>{receipt.translationTypeReceipt}</div>
      </div>
      <div onClick={HandleOnRowClick} className="receipt-param">
        <div>{receipt.sumTotal}</div>
      </div>
      <div onClick={HandleOnRowClick}  className="receipt-param">
        <div>{receipt.numberReceipt1C}</div>
      </div>
      <div onClick={HandleOnRowClick} className="receipt-param-name">
        <div>{receipt.warehousName}</div>
      </div>
      <div onClick={HandleOnRowClick} className="receipt-param-name">
        <div>{receipt.workplaceName}</div>
      </div>
      <div onClick={HandleOnRowClick} className="receipt-param-name">
        {receipt.client ? (
          <div>{receipt.client.nameClient}</div>
        ) : (
          <div className="receipt-param-name">--</div>
        )}
      </div>
      <div onClick={HandleOnRowClick} className="receipt-param">
      {receipt.sumCash==0 &&  receipt.sumCreditCard!=0 ? <div>Карта  {receipt.bankName}</div>: <div>Готівка</div>
      }
     
      </div>
      <div className="receipt-param">
        <button className="receipt-param-button" onClick={HandleOnButtonClick}>
          Деталі чеку
        </button>
      </div>
    </div>
  );
}

export default Receipt;
