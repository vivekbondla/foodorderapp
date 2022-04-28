import { useReducer } from "react";

import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalPrice: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalPrice =
      state.totalPrice + action.item.price * action.item.amount;

    const existingItemInCartIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingItemInCart = state.items[existingItemInCartIndex];
    let updatedItems = [...state.items];
    if (existingItemInCart) {
      const newUpdatedItem = {
        ...existingItemInCart,
        amount: existingItemInCart.amount + action.item.amount,
      };
      updatedItems[existingItemInCartIndex] = newUpdatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalPrice: updatedTotalPrice,
    };
  }
  if (action.type === "REMOVE") {
    const existingItemInCartIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItemInCart = state.items[existingItemInCartIndex];
    const updatedTotalPrice = state.totalPrice - existingItemInCart.price;
    let updatedItems;
    if (existingItemInCart.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = {
        ...existingItemInCart,
        amount: existingItemInCart.amount - 1,
      };
      updatedItems = [...state.items];
      updatedItems[existingItemInCartIndex] = updatedItem;
    }
    return {
      items: updatedItems,
      totalPrice: updatedTotalPrice,
    };
  }
  if(action.type==='CLEAR'){
    return defaultCartState;
  }
  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };
  const clearCartItemsHandler=()=>{
    dispatchCartAction({type:"CLEAR"});
  }

  const cartContext = {
    items: cartState.items,
    totalPrice: cartState.totalPrice,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart:clearCartItemsHandler
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
