import { useState, useEffect } from "react";

function ReceiptInfoWares({ Ware, updateWares }) {
  const [quantity, setQuantity] = useState(Ware.quantity);
  const [pricePerOne, setPricePerOne] = useState(Ware.price);
  const [sumTotal, setSumTotal] = useState(Ware.sumTotal);

  // Оновлення кількості товару
  const onQuantityChange = (e) => {
    const newQuantity = e.target.value;
    setQuantity(newQuantity);
  };

  // Оновлення ціни товару за одиницю
  const onPriceChange = (e) => {
    const newPrice = e.target.value;
    setPricePerOne(newPrice);
  };

  // Обробка завершення редагування кількості або ціни
  const recalculateSumTotal = () => {
    const newSumTotal = (
      quantity * pricePerOne -
      Ware.sumBonus -
      Ware.sumDiscount -
      Ware.sumWallet
    ).toFixed(2);
    setSumTotal(newSumTotal);

    // Створити оновлену копію товару
    const updatedWare = {
      ...Ware,
      quantity: parseFloat(quantity),
      price: parseFloat(pricePerOne),
      sumTotal: parseFloat(newSumTotal),
    };

    // Викликати функцію для оновлення товару в батьківському компоненті
    updateWares(updatedWare);
  };

  // Викликати функцію перерахунку при зміні кількості або ціни
  useEffect(() => {
    recalculateSumTotal();
  }, [quantity, pricePerOne]);

  return (
    <div key={Ware.codeWares} className="receipt-info-wares">
      <div className="receipt-info-wares-item-name">{Ware.nameWares}</div>
      <div className="receipt-info-wares-item">{Ware.articl}</div>
      <div className="receipt-info-wares-item">{Ware.codeWares}</div>

      {Ware.codeUKTZED ? (
        <div className="receipt-info-wares-item">{Ware.codeUKTZED}</div>
      ) : (
        <div className="receipt-info-wares-item">--</div>
      )}

      {/* Поле для редагування ціни */}
      <input
        type="number"
        value={pricePerOne}
        onChange={onPriceChange}
        onBlur={recalculateSumTotal}
        className="receipt-info-wares-item"
      />

      {/* Поле для редагування кількості */}
      <input
        type="number"
        value={quantity}
        onChange={onQuantityChange}
        onBlur={recalculateSumTotal}
        className="receipt-info-wares-item"
      />

      <div className="receipt-info-wares-item">{Ware.sumWallet}</div>
      <div className="receipt-info-wares-item">{Ware.sumBonus}</div>
      <div className="receipt-info-wares-item">{Ware.sumDiscount}</div>
      <div className="receipt-info-wares-item">{sumTotal}</div>
    </div>
  );
}

export default ReceiptInfoWares;
