import { createContext, useContext, useState } from 'react';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cateringCart, setCateringCart] = useState([]);
  const [rentalCart,   setRentalCart]   = useState([]);

  const addToCart = (item, type) => {
    const setCart = type === 'catering' ? setCateringCart : setRentalCart;
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const removeFromCart = (id, type) => {
    const setCart = type === 'catering' ? setCateringCart : setRentalCart;
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const updateQty = (id, qty, type) => {
    const setCart = type === 'catering' ? setCateringCart : setRentalCart;
    if (qty <= 0) { removeFromCart(id, type); return; }
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty } : i));
  };

  const clearCart = type => {
    if (type === 'catering') setCateringCart([]);
    else setRentalCart([]);
  };

  const cateringCount = cateringCart.reduce((s, i) => s + i.qty, 0);
  const rentalCount   = rentalCart.reduce((s, i) => s + i.qty, 0);

  return (
    <CartContext.Provider value={{
      cateringCart, rentalCart,
      addToCart, removeFromCart, updateQty, clearCart,
      cateringCount, rentalCount,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be inside CartProvider');
  return ctx;
};