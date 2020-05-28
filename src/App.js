import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";

import { ProductContext } from "./contexts/ProductContext";
import { CartContext } from "./contexts/CartContext";
import data from "./data";

// Components
import Navigation from "./components/Navigation";
import Products from "./components/Products";
import ShoppingCart from "./components/ShoppingCart";

function App() {
  const [products] = useState(data);
  const [cart, setCart] = useState([]);

  const addItem = (item) => {
    // add the given item to the cart
    const tempCart = [...cart, { ...item, id: Date.now() }];
    localStorage.setItem("book-cart", JSON.stringify(tempCart));
    setCart(tempCart);
  };

  const removeItem = (id) => {
    // console.log(id);
    const tempCart = cart.filter((item) => item.id !== id);
    localStorage.setItem("book-cart", JSON.stringify(tempCart));
    setCart(tempCart);
  };

  const clearCart = () => {
    localStorage.removeItem("book-cart");
    setCart([]);
  };
  useEffect(() => {
    const localStorageCart = localStorage.getItem("book-cart");
    const thisNewCart = localStorageCart ? JSON.parse(localStorageCart) : [];
    setCart(thisNewCart);
  }, []);

  return (
    <ProductContext.Provider value={{ products, addItem }}>
      <CartContext.Provider value={{ cart, removeItem, clearCart }}>
        <div className="App">
          <Navigation />

          {/* Routes */}
          <Route exact path="/">
            <Products />
          </Route>

          <Route path="/cart">
            <ShoppingCart />
          </Route>
        </div>
      </CartContext.Provider>
    </ProductContext.Provider>
  );
}

export default App;
