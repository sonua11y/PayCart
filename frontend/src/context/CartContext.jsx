import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (food) => {
    setCart((prev) => [...prev, food]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};