import { useRef, useState } from 'react';
import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';


const MealItemForm =(props)=>{

    const amountInputRef = useRef();
    const [entredAmountIsValid,setEnteredAmountIsValid]=useState(true);


    const submitHandler=(event)=>{
        event.preventDefault();
        const enteredAmount = amountInputRef.current.value;
        const enteredAmountNumFormat = +enteredAmount;

        if(enteredAmountNumFormat.length===0||enteredAmountNumFormat<1||enteredAmountNumFormat>5){
            setEnteredAmountIsValid(false);
            return;

        }
        props.onAddToCart(enteredAmountNumFormat);

    }
    return(
        <form className={classes.form} onSubmit={submitHandler}>
           <Input ref={amountInputRef} lable="Amount" input={ {type:'number', min:'1', max:'5', step:'1', id:Math.random(), defaultValue:'1'}} />
            <button>+Add</button>
            {!entredAmountIsValid&&<p>Please enter between 1 and 5</p>}
        </form>
    )

}
export default MealItemForm;