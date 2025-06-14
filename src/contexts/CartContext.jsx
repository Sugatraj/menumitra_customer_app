import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { clearAppData } from '../utils/clearAppData';
import { useOutlet } from './OutletContext';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children, onLogout }) => {
  const { user, setShowAuthOffcanvas } = useAuth();
  const { outletId, sectionId } = useOutlet();

  // Initialize cart items from localStorage
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Initialize orderSettings from localStorage or default values
  const [orderSettings, setOrderSettings] = useState(() => {
    const savedSettings = localStorage.getItem('orderSettings');
    return savedSettings ? JSON.parse(savedSettings) : { order_type: null };
  });

  // Add useEffect to update settings when context values change
  useEffect(() => {
    setOrderSettings(prev => ({
      ...prev,
      outlet_id: 1,
      section_id: sectionId
    }));
  }, [outletId, sectionId]);

  // Save cart items to localStorage when updated
  useEffect(() => {
    // localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Save order settings to localStorage when updated
  useEffect(() => {
    localStorage.setItem('orderSettings', JSON.stringify(orderSettings));
  }, [orderSettings]);

  // Add item to cart with comment
  const addToCart = (menuItem, portionId, quantity, comment, immediate = false) => {
    // Check if user is authenticated
    const authData = localStorage.getItem('auth');
    if (!authData || !user) {
      setShowAuthOffcanvas(true);
      return;
    }

    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(
        item => item.menuId === menuItem.menuId && item.portionId === portionId
      );

      if (existingItemIndex !== -1) {
        // Update existing item
        const updatedItems = [...prevItems];
        if (quantity === 0) {
          // Remove item if quantity is 0
          updatedItems.splice(existingItemIndex, 1);
        } else {
          // Update quantity and comment for specific portion
          updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex],
            quantity: quantity,
            comment: comment // Store comment for this specific portion
          };
        }
        return updatedItems;
      } else if (quantity > 0) {
        // Add new item with portion-specific comment
        return [...prevItems, {
          menuId: menuItem.menuId,
          menuName: menuItem.menuName,
          portionId: portionId,
          portionName: menuItem.portions.find(p => p.portion_id === portionId)?.portion_name,
          price: menuItem.portions.find(p => p.portion_id === portionId)?.price,
          quantity: quantity,
          comment: comment
        }];
      }
      return prevItems;
    });
  };

  // Update order settings
  const updateOrderSettings = (settings) => {
    const newSettings = { ...orderSettings, ...settings };
    setOrderSettings(newSettings);
    localStorage.setItem('orderSettings', JSON.stringify(newSettings));
  };

  // Format cart for API
  const getFormattedOrderData = (userId) => {
    const orderData = {
      outlet_id: outletId,
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
    // Check if user is authenticated
    const authData = localStorage.getItem('auth');
    if (!authData || !user) {
      setShowAuthOffcanvas(true);
      return;
    }

    if (quantity === 0) {
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

  // Update the clearCart method to be more comprehensive
  const clearCart = useCallback(() => {
    setCartItems([]);
    localStorage.removeItem('cart');
    localStorage.removeItem('orderSettings');
    
    // Call onLogout callback if provided
    if (onLogout) {
      onLogout();
    }
  }, [onLogout]);

  // Get cart total
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Get cart items count (unique items, not quantities)
  const getCartCount = () => {
    return cartItems.length; // This will return the number of unique items in cart
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

  // Update getCartItemComment to be portion-specific
  const getCartItemComment = (menuId, portionId) => {
    const cartItem = cartItems.find(item => 
      item.menuId === menuId && item.portionId === portionId
    );
    return cartItem?.comment || '';
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
    updateComment,
    getCartItemComment
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
