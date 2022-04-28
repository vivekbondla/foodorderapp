import React, { useState } from "react";
import { Suspense } from "react";
//import Cart from "./components/Cart/Cart";
//import Header from "./components/Layout/Header";
//import Meals from "./components/Meals/Meals";
import CartProvider from "./store/CartProvider";

function App() {
  const Meals = React.lazy(() => import("./components/Meals/Meals"));
  const Header = React.lazy(() => import("./components/Layout/Header"));
  const Cart = React.lazy(() => import("./components/Cart/Cart"));
  //const CartProvider = React.lazy(() => import("./store/CartProvider"));

  const [showCart, setShowCart] = useState(false);

  const cartShowHandler = (props) => {
    setShowCart(true);
  };

  const hideCartHandler = () => {
    setShowCart(false);
  };

  return (
    <Suspense fallback={<p>loading....</p>}>
      <CartProvider>
        {showCart && <Cart onHideCart={hideCartHandler} />}
        <Header onShowCart={cartShowHandler} />
        <main>
          <Meals />
        </main>
      </CartProvider>
    </Suspense>
  );
}
export default App;
