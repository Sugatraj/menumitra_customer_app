import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCart } from '../contexts/CartContext';

function Checkout() {
  const { 
    cartItems, 
    updateQuantity, 
    removeFromCart, 
    getCartTotal,
    getCartCount 
  } = useCart();

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
            <div className="view-title mb-2">
              <ul>
                <li>
                  <span className="text-soft">Subtotal</span>
                  <span className="text-soft">₹{subtotal.toFixed(2)}</span>
                </li>
                <li>
                  <span className="text-soft">TAX (2%)</span>
                  <span className="text-soft">-₹{taxAmount.toFixed(2)}</span>
                </li>
                <li>
                  <h5>Total</h5>
                  <h5>₹{total.toFixed(2)}</h5>
                </li>
                <li>
                  <a href="javascript:void(0);" className="promo-bx">
                    Apply Promotion Code
                    <span>2 Promos</span>
                  </a>
                </li>
              </ul>
            </div>
            <div className="footer-btn d-flex align-items-center">
              <button 
                className="btn btn-primary flex-1"
                onClick={() => {/* Handle checkout */}}
                disabled={cartItems.length === 0}
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
