import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCart } from '../contexts/CartContext';
import axios from 'axios';
import { API_CONFIG } from '../constants/config';

function Checkout() {
  const { 
    cartItems, 
    updateQuantity, 
    removeFromCart, 
    getCartTotal,
    getCartCount 
  } = useCart();
  const [checkoutDetails, setCheckoutDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Calculate subtotal
  const subtotal = getCartTotal();
  
  // Calculate tax (2%)
  const taxRate = 0.02;
  const taxAmount = subtotal * taxRate;
  
  // Calculate final total
  const total = subtotal - taxAmount;

  const handleQuantityChange = (menuId, portionId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(menuId, portionId);
    } else {
      updateQuantity(menuId, portionId, newQuantity);
    }
  };

  const fetchCheckoutDetails = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get token from localStorage.auth
      const auth = JSON.parse(localStorage.getItem('auth'));
      const accessToken = auth?.accessToken;

      if (!accessToken) {
        setError('Authentication required');
        return;
      }

      // Transform cart items to required format
      const orderItems = cartItems.map(item => ({
        menu_id: item.menuId,
        portion_id: item.portionId,
        quantity: item.quantity
      }));

      // Debug logs
      console.log('POST URL:', 'https://men4u.xyz/v2/user/get_checkout_detail');
      console.log('orderItems:', orderItems);

      const response = await axios.post(
        'https://men4u.xyz/v2/user/get_checkout_detail',
        {
          outlet_id: "1",
          order_items: orderItems
        },
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      );

      setCheckoutDetails(response.data.detail);
    } catch (err) {
      console.error('Checkout details error:', err);
      if (err.response) {
        console.error('API error response:', err.response);
      }
      if (err.response?.status === 401) {
        setError('Session expired. Please login again.');
      } else {
        setError('Failed to fetch checkout details');
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch checkout details when cart items change
  useEffect(() => {
    if (cartItems.length > 0) {
      fetchCheckoutDetails();
    } else {
      setCheckoutDetails(null);
    }
  }, [cartItems]);

  return (
    <>
      <Header />
      <div className="page-content">
        <div className="container bottom-content shop-cart-wrapper">
          <div className="item-list style-2">
            <ul>
              {cartItems.map((item) => (
                <li key={`${item.menuId}-${item.portionId}`}>
                  <div className="item-content">
                    <div className="item-media media media-100">
                      <img src={item.image || "https://cdn.vox-cdn.com/thumbor/aNM9cSJCkTc4-RK1avHURrKBOjU=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/20059022/shutterstock_1435374326.jpg"} alt={item.menuName} />
                    </div>
                    <div className="item-inner">
                      <div className="item-title-row">
                        <h5 className="item-title sub-title">
                          <a href={`/product/${item.menuId}`}>{item.menuName}</a>
                        </h5>
                        <div className="item-subtitle text-soft">
                          {item.portionName}
                          {item.comment && <small className="d-block">{item.comment}</small>}
                        </div>
                      </div>
                      <div className="item-footer">
                        <div className="d-flex align-items-center">
                          <h6 className="me-2">₹ {item.price}</h6>
                        </div>
                        <div className="d-flex align-items-center">
                          <div className="dz-stepper stepper-fill small-stepper border-2">    
                            <div className="input-group bootstrap-touchspin bootstrap-touchspin-injected">
                              <span className="input-group-btn input-group-prepend">
                                <button
                                  className="btn btn-primary bootstrap-touchspin-down"
                                  type="button"
                                  onClick={() => handleQuantityChange(
                                    item.menuId, 
                                    item.portionId, 
                                    item.quantity - 1
                                  )}
                                >
                                  -
                                </button>
                              </span>
                              <input
                                className="stepper form-control"
                                type="text"
                                value={item.quantity}
                                readOnly
                              />
                              <span className="input-group-btn input-group-append">
                                <button
                                  className="btn btn-primary bootstrap-touchspin-up"
                                  type="button"
                                  onClick={() => handleQuantityChange(
                                    item.menuId, 
                                    item.portionId, 
                                    item.quantity + 1
                                  )}
                                >
                                  +
                                </button>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="footer fixed p-b80">
          <div className="container">
            {loading ? (
              <div className="text-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : error ? (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            ) : checkoutDetails && (
              <div className="view-title mb-2">
                <ul>
                  <li>
                    <span className="text-soft">Subtotal</span>
                    <span className="text-soft">₹{checkoutDetails.total_bill_amount}</span>
                  </li>
                  {Number(checkoutDetails.discount_amount) > 0 && (
                    <li>
                      <span className="text-soft">Discount ({checkoutDetails.discount_percent}%)</span>
                      <span className="text-soft text-success">-₹{checkoutDetails.discount_amount}</span>
                    </li>
                  )}
                  <li>
                    <span className="text-soft">Service Charge ({checkoutDetails.service_charges_percent}%)</span>
                    <span className="text-soft">₹{checkoutDetails.service_charges_amount}</span>
                  </li>
                  <li>
                    <span className="text-soft">GST ({checkoutDetails.gst_percent}%)</span>
                    <span className="text-soft">₹{checkoutDetails.gst_amount}</span>
                  </li>
                  <li>
                    <h5>Total</h5>
                    <h5>₹{checkoutDetails.final_grand_total}</h5>
                  </li>
                  <li>
                    <a href="javascript:void(0);" className="promo-bx">
                      Apply Promotion Code
                      <span>2 Promos</span>
                    </a>
                  </li>
                </ul>
              </div>
            )}
            <div className="footer-btn d-flex align-items-center">
              <button 
                className="btn btn-primary flex-1"
                onClick={() => {/* Handle checkout */}}
                disabled={cartItems.length === 0 || loading || !!error}
              >
                CHECKOUT ({getCartCount()} items)
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Checkout;
