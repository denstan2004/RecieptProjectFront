import { useEffect, useState } from "react";

function Filter({Receipts, setFltrdReceipts}) {
    const [lowerAmount, setLowerAmount] = useState(0);
    const [higherAmount, setHigherAmount] = useState(0);
    const [checkDiscount, setCheckDiscount] = useState(false);
    const [checkIsCard, setCheckIsCard] = useState(false);
        useEffect(()=>{
            console.log(Receipts);
        },[Receipts])
    const checkboxDiscountChangeHandle = () => {
        setCheckDiscount(prev => !prev); // Тогл (перемикач) стану
    };

    const checkboxCardChangeHandle = () => {
        setCheckIsCard(prev => !prev); // Тогл (перемикач) стану
    };

    // Правильна передача значення з input
    const LowerChangeHandle = (event) => {
        setLowerAmount(event.target.value); // Отримання значення з input
    };
    
    const HigherChangeHandle = (event) => {
        setHigherAmount(event.target.value); // Отримання значення з input
    };
    const FillterReceipts = () => {
        let newReceipts = Receipts.filter(el => {
        let tempReceipt;
            // Умова 1: Коли обидва чекбокси активні
            if (checkDiscount === true && checkIsCard === true) {
               
                if(el.percentDiscount>0 && el.sumCash==0)
                {
                    tempReceipt=el;
                }
                
            }
            // Умова 2: Тільки чекбокс карти
            else if (checkDiscount !== true && checkIsCard === true) {
               
                if( el.sumCash==0)
                {
                    tempReceipt=el;
                }
            }
            // Умова 3: Тільки чекбокс на знижку
            else if (checkDiscount === true && checkIsCard !== true) {
                if(el.percentDiscount>0)
                    {
                        tempReceipt=el;
                    }
            }
            // Умова 4: Якщо жоден чекбокс не активний
            else {
                tempReceipt=el;
            }
            if(tempReceipt==undefined)
            {
                console.log(123);

                return false
            }
            if(higherAmount>0)
            {
                console.log(123);
                
                   if(tempReceipt.sumTotal>=lowerAmount && tempReceipt.sumTotal<=higherAmount)
                    {
                        return true
                    }
                    return false;
               
            }
            else{
                return true;
            }


        });
        console.log(newReceipts);
        setFltrdReceipts(newReceipts); // Оновлюємо стан відфільтрованими результатами
    }
    
    return (
        <div>
            <div>
                <div>Карта на знижку</div>
                <input onChange={checkboxDiscountChangeHandle} type="checkbox" />
            </div>
            <div>
                <div>Розрахунок картою</div>
                <input onChange={checkboxCardChangeHandle} type="checkbox" />
            </div>
            <div>
                <div>Нижня межа суми</div>
                <input value={lowerAmount || ''} onChange={LowerChangeHandle} />
            </div>
            <div>
                <div>Верхня межа суми</div>
                <input value={higherAmount || ''} onChange={HigherChangeHandle} />
            </div>
            <div>
                <button onClick={FillterReceipts}> Задіяти фільтри</button>
            </div>
        </div>
    );
}

export default Filter;
