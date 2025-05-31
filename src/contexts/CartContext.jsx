import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  // Initialize cart items from localStorage
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Initialize order settings from localStorage
  const [orderSettings, setOrderSettings] = useState(() => {
    const savedSettings = localStorage.getItem('orderSettings');
    return savedSettings ? JSON.parse(savedSettings) : {
      outlet_id: "1",
      section_id: "1",
      order_type: "parcel", // default to parcel
      coupon: null,
      action: "create_order"
    };
  });

  // Save cart items to localStorage when updated
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Save order settings to localStorage when updated
  useEffect(() => {
    localStorage.setItem('orderSettings', JSON.stringify(orderSettings));
  }, [orderSettings]);

  // Add item to cart with comment
  const addToCart = (item, portionId, quantity = 1, comment = "") => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(
        cartItem => cartItem.menuId === item.menuId && cartItem.portionId === portionId
      );

      if (existingItemIndex > -1) {
        // Update quantity if item exists
        const newItems = [...prevItems];
        newItems[existingItemIndex].quantity += quantity;
        if (comment) newItems[existingItemIndex].comment = comment;
        return newItems;
      }

      // Add new item
      const selectedPortion = item.portions.find(p => p.portion_id === portionId);
      return [...prevItems, {
        menuId: item.menuId,
        menuName: item.menuName,
        portionId: portionId,
        portionName: selectedPortion.portion_name,
        price: selectedPortion.price,
        quantity: quantity,
        image: item.image,
        menuFoodType: item.menuFoodType,
        comment: comment
      }];
    });
  };

  // Update order settings
  const updateOrderSettings = (settings) => {
    setOrderSettings(prev => ({
      ...prev,
      ...settings
    }));
  };

  // Format cart for API
  const getFormattedOrderData = (userId) => {
    const orderData = {
      outlet_id: orderSettings.outlet_id,
      user_id: userId,
      section_id: orderSettings.section_id,
      order_type: orderSettings.order_type,
      order_items: cartItems.map(item => ({
        menu_id: item.menuId,
        quantity: item.quantity,
        portion_name: item.portionName.toLowerCase(),
        comment: item.comment || ""
      })),
      action: orderSettings.action
    };

    // Only add coupon if it exists
    if (orderSettings.coupon) {
      orderData.coupon = orderSettings.coupon;
    }

    return orderData;
  };

  // Remove item from cart
  const removeFromCart = (menuId, portionId) => {
    setCartItems(prevItems => 
      prevItems.filter(item => !(item.menuId === menuId && item.portionId === portionId))
    );
  };

  // Update item quantity
  const updateQuantity = (menuId, portionId, quantity) => {
    if (quantity < 1) {
      removeFromCart(menuId, portionId);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.menuId === menuId && item.portionId === portionId
          ? { ...item, quantity }
          : item
      )
    );
  };

  // Clear cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Get cart total
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Get cart items count
  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Update comment for an item
  const updateComment = (menuId, portionId, comment) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.menuId === menuId && item.portionId === portionId
          ? { ...item, comment }
          : item
      )
    );
  };

  const value = {
    cartItems,
    orderSettings,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
    updateOrderSettings,
    getFormattedOrderData,
    updateComment
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
