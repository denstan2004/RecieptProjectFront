import "./Receipt.css";
function Receipt({ receipt,setReceipt }) {
  const HandleOnButtonClick = () => {
    setReceipt(receipt);
    
  };
  
  return (
    <div className="reciept-container">
      <div className="receipt-param">
        <div>{receipt.dateReceipt}</div>
      </div>
      <div className="receipt-param">
        <div>{receipt.translationTypeReceipt}</div>
      </div>
      <div className="receipt-param">
        <div>{receipt.numberReceipt1C}</div>
      </div>
      <div className="receipt-param">
        <div>{receipt.sumTotal}</div>
      </div>
      <div className="receipt-param">
        <button onClick={HandleOnButtonClick}>Деталі чеку</button>
      </div>
    </div>
  );
}

export default Receipt;
