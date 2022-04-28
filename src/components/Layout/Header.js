import React from "react";
import classes from './Header.module.css'
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <>
      <header className={classes.header}>
          <h1>Vivek's Restuarant</h1>
          <HeaderCartButton onClick={props.onShowCart}/>
          
      </header>
      
      <div className={classes['main-image']}>
          <img src="https://raw.githubusercontent.com/academind/react-complete-guide-code/11-practice-food-order-app/extra-files/meals.jpg" alt='delicious food'/>
      </div>
    </>
  );
};
export default Header;
