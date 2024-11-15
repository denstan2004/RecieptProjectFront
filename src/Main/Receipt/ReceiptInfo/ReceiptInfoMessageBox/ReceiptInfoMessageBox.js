import "./ReceiptInfoMessageBox.css"
function MessageBox({text,Submit,}){
    
    const onButtonClick=(e)=>{
        if(text==="Ви впевнені що хочете оновити чек?")

        Submit(e.target.value,"Update");
        else if(text==="Ви впевнені що хочете видалити чек?")
        Submit(e.target.value,"Delete");

    }
    return(
    <div className="message-box">
        <div className="message-box-text">
            {text}
        </div>
        <div className="message-box-buttons">
            <button class="button-81" onClick={onButtonClick} value={true}>Підтвердити</button>
            <button class="button-81" onClick={onButtonClick} value={false}>Відхилити</button>
        </div>
    </div>
    )
}
export default MessageBox
