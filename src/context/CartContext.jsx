import {
  createContext,
  useEffect,
  useMemo,
  useState,
} from "react";

// ========================================
// Context
// ========================================

export const CartContext =
  createContext();

// ========================================
// Provider
// ========================================

export const CartProvider = ({
  children,
}) => {
  // ========================================
  // State
  // ========================================

  const [cart, setCart] = useState(() => {
    const storedCart =
      localStorage.getItem("cart");

    return storedCart
      ? JSON.parse(storedCart)
      : [];
  });

  // ========================================
  // Persist Cart
  // ========================================

  useEffect(() => {
    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );
  }, [cart]);

  // ========================================
  // Add To Cart
  // ========================================

  const addToCart = (course) => {
    setCart((prevCart) => {
      const alreadyExists =
        prevCart.some(
          (item) => item._id === course._id
        );

      if (alreadyExists) {
        return prevCart;
      }

      return [...prevCart, course];
    });
  };

  // ========================================
  // Remove From Cart
  // ========================================

  const removeFromCart = (
    courseId
  ) => {
    setCart((prevCart) =>
      prevCart.filter(
        (course) =>
          course._id !== courseId
      )
    );
  };

  // ========================================
  // Clear Cart
  // ========================================

  const clearCart = () => {
    setCart([]);
  };

  // ========================================
  // Total Price
  // ========================================

  const totalPrice = useMemo(() => {
    return cart.reduce(
      (accumulator, course) =>
        accumulator + course.precio,
      0
    );
  }, [cart]);

  // ========================================
  // Total Items
  // ========================================

  const totalItems = useMemo(() => {
    return cart.length;
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,

        addToCart,
        removeFromCart,
        clearCart,

        totalPrice,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};