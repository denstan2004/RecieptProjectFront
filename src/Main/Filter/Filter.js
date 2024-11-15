import axios from "axios";
import { useEffect, useState } from "react";
import "./Filter.css";

function Filter({ workplace, dateStart, dateEnd, setFilteredReceipts, handleFillterShow }) {
  const defaultValues = {
    lowerAmount: 0,
    higherAmount: 0,
    checkDiscount: false,
    checkIsCard: false,
    checkIsCash: false,
    typeReceipt: 0,
    stateReceipt: -100,
    numberReceipt: "0",
    numberOrder: "0",
    numberReceiptPOS: -1,
    idWorkplacePay: 0,
    userCreate: "0",
    numberReceipt1C: "0",
    codeClient: -1,
    bankCheck: false,
    eBank: 0
  };

  const [lowerAmount, setLowerAmount] = useState(defaultValues.lowerAmount);
  const [higherAmount, setHigherAmount] = useState(defaultValues.higherAmount);
  const [checkDiscount, setCheckDiscount] = useState(defaultValues.checkDiscount);
  const [checkIsCard, setCheckIsCard] = useState(defaultValues.checkIsCard);
  const [checkIsCash, setCheckIsCash] = useState(defaultValues.checkIsCash);
  const [typeReceipt, setTypeReceipt] = useState(defaultValues.typeReceipt);
  const [stateReceipt, setStateReceipt] = useState(defaultValues.stateReceipt);
  const [numberReceipt, setNumberReceipt] = useState(defaultValues.numberReceipt);
  const [numberOrder, setNumberOrder] = useState(defaultValues.numberOrder);
  const [numberReceiptPOS, setNumberReceiptPOS] = useState(defaultValues.numberReceiptPOS);
  const [idWorkplacePay, setIdWorkplacePay] = useState(defaultValues.idWorkplacePay);
  const [userCreate, setUserCreate] = useState(defaultValues.userCreate);
  const [numberReceipt1C, setNumberReceipt1C] = useState(defaultValues.numberReceipt1C);
  const [codeClient, setCodeClient] = useState(defaultValues.codeClient);
  const [nameClient, setNameClient] = useState('');
  const [namePrefix, setNamePrefix] = useState('');
  const [allClients, setAllClients] = useState([]);
  const [bankCheck, setBankCheck] = useState(defaultValues.bankCheck);
  const [eBank, setEBank] = useState(defaultValues.eBank);

  const banks = {
    choose: -1,
    privat: 3,
    oshad: 11,
    undef: 0,
  };

  const resetFilters = () => {
    setLowerAmount(defaultValues.lowerAmount);
    setHigherAmount(defaultValues.higherAmount);
    setCheckDiscount(defaultValues.checkDiscount);
    setCheckIsCard(defaultValues.checkIsCard);
    setCheckIsCash(defaultValues.checkIsCash);
    setTypeReceipt(defaultValues.typeReceipt);
    setStateReceipt(defaultValues.stateReceipt);
    setNumberReceipt(defaultValues.numberReceipt);
    setNumberOrder(defaultValues.numberOrder);
    setNumberReceiptPOS(defaultValues.numberReceiptPOS);
    setIdWorkplacePay(defaultValues.idWorkplacePay);
    setUserCreate(defaultValues.userCreate);
    setNumberReceipt1C(defaultValues.numberReceipt1C);
    setCodeClient(defaultValues.codeClient);
    setAllClients([]);
    setNameClient('');
    setNamePrefix('');
    setEBank(defaultValues.eBank);
    setBankCheck(defaultValues.bankCheck);
  };

  const checkboxDiscountChangeHandle = () => setCheckDiscount((prev) => !prev);
  const checkboxCardChangeHandle = () => setCheckIsCard((prev) => !prev);
  const checkboxCashChangeHandle = () => setCheckIsCash((prev) => !prev);

  const handleLowerAmountChange = (event) => setLowerAmount(event.target.value);
  const handleHigherAmountChange = (event) => setHigherAmount(event.target.value);
  const handleNumberReceiptChange = (event) => setNumberReceipt(event.target.value);
  const handleNumberOrderChange = (event) => setNumberOrder(event.target.value);
  const handleNumberReceiptPOSChange = (event) => setNumberReceiptPOS(event.target.value);
  const handleIdWorkplacePayChange = (event) => setIdWorkplacePay(event.target.value);
  const handleUserCreateChange = (event) => setUserCreate(event.target.value);
  const handleNumberReceipt1CChange = (event) => setNumberReceipt1C(event.target.value);

  const handleSelectChange = (event) => {
    setCodeClient(event.target.value);
  };

  const handleNamePrefixChange = (event) => {
    const name = event.target.value;
    if (name.length >= 4) {
      axios.get(`${localStorage.getItem("back-prefix")}/Get/All/ClientNameByPrefix/${name}`)
        .then(response => {
          setAllClients(response.data);
          setNameClient('----');
        })
        .catch(error => console.error('There was an error!', error));
    }
    setNamePrefix(name);
  };

  const handleTypeReceiptChange = (event) => {
    const value = event.target.value === "Повернення" ? -1 : 1;
    setTypeReceipt(event.target.value === "----" ? 0 : value);
  };

  const handleStateReceiptChange = (event) => {
    const stateMap = {
      "Скасовано": -1,
      "Фіскалізацізовано": 8,
      "Відправлено в 1С": 9,
    };
    setStateReceipt(stateMap[event.target.value] || -100);
  };

  const handleBankChange = (event) => {
    const selectedBank = event.target.value;
    setEBank(selectedBank);
    setBankCheck(selectedBank !== banks.choose);
  };

  const fillterHandle = () => {
    const payload = {
      WorkplacesIds: Array.from(workplace),
      begin: dateStart,
      end: dateEnd,
      fillter: {
        LowerAmount: parseFloat(lowerAmount),
        HigherAmount: parseFloat(higherAmount),
        CheckDiscount: !!checkDiscount,
        CheckIsCard: !!checkIsCard,
        CheckIsCash: !!checkIsCash,
        NumberReceipt: numberReceipt.toString(),
        NumberOrder: numberOrder.toString(),
        NumberReceiptPOS: parseInt(numberReceiptPOS, 10),
        IdWorkplacePay: parseInt(idWorkplacePay, 10),
        UserCreate: userCreate.toString(),
        NumberReceipt1C: numberReceipt1C.toString(),
        CodeClient: codeClient,
        TypeReceipt: parseInt(typeReceipt, 10),
        StateReceipt: parseInt(stateReceipt, 10),
        isStateReceiptneeded: stateReceipt !== -100,
        isTypeReceiptneeded: typeReceipt !== 0,
        nameClient: "---",
        eBank: parseInt(eBank, 10),
        bankCheck: bankCheck,
      }
    };

    axios.post(`${localStorage.getItem("back-prefix")}/Get/All/ReceiptsByDate/`, payload)
      .then(response => {
        setFilteredReceipts(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  };
  return (
    <div className="filter-container">
      <div className="filter-close-button-container">
        <button className="fillter-button" onClick={handleFillterShow}>✕</button>
      </div>
      <div>
        <div>Карта на знижку</div>
        <input onChange={checkboxDiscountChangeHandle} type="checkbox" />
      </div>
      <div>
        <div>Розрахунок картою</div>
        <input onChange={checkboxCardChangeHandle} type="checkbox" />
      </div>
      <div>
        <div>Розрахунок готівкою</div>
        <input onChange={checkboxCashChangeHandle} type="checkbox" />
      </div>
      <div>
        <div>Нижня межа суми</div>
        <input value={lowerAmount || ''} onChange={handleLowerAmountChange} />
      </div>
      <div>
        <div>Верхня межа суми</div>
        <input value={higherAmount || ''} onChange={handleHigherAmountChange} />
      </div>
      <div>
        <div>Тип чеку</div>
        <select onChange={handleTypeReceiptChange}>
          <option>----</option>
          <option>Повернення</option>
          <option>Продаж</option>
        </select>
      </div>
      <div>
        <div>Статус чеку</div>
        <select onChange={handleStateReceiptChange}>
          <option>----</option>
          <option>Фіскалізацізовано</option>
          <option>Відправлено в 1С</option>
        </select>
      </div>
      <div>
        <div>Номер чеку фіскальний</div>
        <input value={numberReceipt || ''} onChange={handleNumberReceiptChange} />
      </div>
      <div>
        <div>Номер замовлення</div>
        <input value={numberOrder || ''} onChange={handleNumberOrderChange} />
      </div>
      <div className="fillter-client">
        <div>Клієнт</div>
        <input value={namePrefix || ''} onChange={handleNamePrefixChange} />
        <select onChange={handleSelectChange}>
          {allClients.map((item) => (
            <option key={item.codeClient} value={item.codeClient}>
              {item.nameClient}
            </option>
          ))}
        </select>
      </div>
      <div>
        <div>Номер чеку POS</div>
        <input value={numberReceiptPOS || ''} onChange={handleNumberReceiptPOSChange} />
      </div>
      <div>
        <div>ID робочого місця</div>
        <input value={idWorkplacePay || ''} onChange={handleIdWorkplacePayChange} />
      </div>
      <div>
        <div>Користувач</div>
        <input value={userCreate || ''} onChange={handleUserCreateChange} />
      </div>
      <div>
        <div>Номер чеку 1С</div>
        <input value={numberReceipt1C || ''} onChange={handleNumberReceipt1CChange} />
      </div>
      <div>
        <div>Вибір банку</div>
        <select value={eBank} onChange={handleBankChange}>
          <option value={banks.choose}>----</option>
          <option value={banks.privat}>ПриватБанк</option>
          <option value={banks.oshad}>ОщадБанк</option>
        </select>
      </div>
      <div>
        <button onClick={fillterHandle}>Застосувати фільтр</button>
        <button onClick={resetFilters}>Очистити фільтр</button>
      </div>
    </div>
  );
}

export default Filter;
