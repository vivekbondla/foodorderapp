import { useContext } from "react";
import { useState } from "react";
import useHTTP from "../../hooks/use-http";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import CheckOut from "./CheckOut";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting,setIsSubmitting]=useState(false);
  const [submitted,setSubmitted]=useState(false);

  


  const cartCtx = useContext(CartContext);

  

  const addItemToCartHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const removeItemFromCartHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const orderConfirmHandler = () => {
    setIsCheckout(true);
  };

  const submitUserDataHandler =(userData)=>{
    setIsSubmitting(true);
  fetch('https://foodorderapp-c1ef4-default-rtdb.firebaseio.com/orders.json',{
    method : 'POST', body: JSON.stringify({user:userData , orderedItems:cartCtx.items})
  })

  setIsSubmitting(false);
  setSubmitted(true);
  cartCtx.clearCart();
  }

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item, key) => (
        <CartItem
          key={key}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onAdd={addItemToCartHandler.bind(null, item)}
          onRemove={removeItemFromCartHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  const totalPrice = `₹${cartCtx.totalPrice}`;
  const hasItemsInCart = cartCtx.items.length > 0;

  

  const ModalActions = (
    <>
     
      <div className={classes.actions}>
        <button onClick={props.onHideCart} className={classes["button--alt"]}>
          Close
        </button>
        {hasItemsInCart && (
          <button className={classes.button} onClick={orderConfirmHandler}>
            Order
          </button>
        )}
      </div>
    </>
  );

  const cartModalContent =<> {cartItems}
  <div className={classes.total}>
    <span>Total Price</span>
    <span>{totalPrice}</span>
  </div>
  {isCheckout&&<CheckOut onCancel={props.onHideCart} onConfirm={submitUserDataHandler}/>}
  {!isCheckout&&ModalActions}</>



  return (
    <Modal onCloseCart={props.onHideCart}>
      {!isSubmitting && !submitted && cartModalContent}
      {isSubmitting && <p>Sending data to backend</p>}
      {!isSubmitting&&submitted &&<p>Successfully submitted data!</p>}     
    </Modal>
  );
};

export default Cart;
