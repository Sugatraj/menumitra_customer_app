import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCart } from "../contexts/CartContext";
import axios from "axios";
import { API_CONFIG } from "../constants/config";

const FooterSummary = React.memo(function FooterSummary({ checkoutDetails }) {
  // Fallback to zeros if no data yet
  const details = checkoutDetails || {
    grand_total: "0.00",
    discount_percent: "0",
    discount_amount: "0.00",
    total_bill_amount: "0.00",
    service_charges_percent: "0",
    service_charges_amount: "0.00",
    gst_percent: "0",
    gst_amount: "0.00",
    final_grand_total: "0.00"
  };
  return (
    <div className="view-title mb-2">
      <ul>
        <li className="py-0">
          <h5>Total</h5>
          <h5>₹{details.grand_total}</h5>
        </li>
        <li>
          <span className="text-soft">
            Discount ({details.discount_percent}%)
          </span>
          <span className="text-soft">
            ₹{details.discount_amount}
          </span>
        </li>
        <li>
          <span className="text-soft">Subtotal</span>
          <span className="text-soft">
            ₹{details.total_bill_amount}
          </span>
        </li>
        {Number(details.discount_amount) > 0 && (
          <li>
            <span className="text-soft">
              Discount ({details.discount_percent}%)
            </span>
            <span className="text-soft text-success">
              -₹{details.discount_amount}
            </span>
          </li>
        )}
        <li>
          <span className="text-soft">
            Service Charge ({details.service_charges_percent}%)
          </span>
          <span className="text-soft">
            ₹{details.service_charges_amount}
          </span>
        </li>
        <li>
          <span className="text-soft">
            GST ({details.gst_percent}%)
          </span>
          <span className="text-soft">
            ₹{details.gst_amount}
          </span>
        </li>
        <li>
          <h5>Grand Total</h5>
          <h5>₹{details.final_grand_total}</h5>
        </li>
      </ul>
    </div>
  );
});

function Checkout() {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    getCartTotal,
    getCartCount,
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
      const auth = JSON.parse(localStorage.getItem("auth"));
      const accessToken = auth?.accessToken;

      if (!accessToken) {
        setError("Authentication required");
        return;
      }

      // Transform cart items to required format
      const orderItems = cartItems.map((item) => ({
        menu_id: item.menuId,
        portion_id: item.portionId,
        quantity: item.quantity,
      }));

      // Debug logs
      console.log("POST URL:", "https://men4u.xyz/v2/user/get_checkout_detail");
      console.log("orderItems:", orderItems);

      const response = await axios.post(
        "https://men4u.xyz/v2/user/get_checkout_detail",
        {
          outlet_id: "1",
          order_items: orderItems,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      setCheckoutDetails(prev => ({
        ...prev,
        ...response.data.detail
      }));
    } catch (err) {
      console.error("Checkout details error:", err);
      if (err.response) {
        console.error("API error response:", err.response);
      }
      if (err.response?.status === 401) {
        setError("Session expired. Please login again.");
      } else {
        setError("Failed to fetch checkout details");
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

  // Remove item handler
  const handleRemoveItem = (menuId, portionId) => {
    // Remove from context
    removeFromCart(menuId, portionId);

    // Remove from localStorage if you store cart there
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = cart.filter(
      (item) => !(item.menuId === menuId && item.portionId === portionId)
    );
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <>
      <Header />
      <div className="page-content">
        <div className="container bottom-content shop-cart-wrapper">
          <div className="item-list style-2">
            <ul>
              {cartItems.map((item) => (
                <li key={`${item.menuId}-${item.portionId}`} className="position-relative">
                  {/* Remove button at top right */}
                  <button
                    type="button"
                    className="position-absolute top-0 end-0 m-2 p-0 border-0 bg-transparent shadow-none"
                    aria-label="Remove"
                    onClick={() => handleRemoveItem(item.menuId, item.portionId)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                    </svg>
                  </button>
                  <div className="item-content">
                    <div className="item-media media media-100">
                      <img
                        src={
                          item.image ||
                          "https://cdn.vox-cdn.com/thumbor/aNM9cSJCkTc4-RK1avHURrKBOjU=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/20059022/shutterstock_1435374326.jpg"
                        }
                        alt={item.menuName}
                      />
                    </div>
                    <div className="item-inner">
                      <div className="item-title-row">
                        <h5 className="item-title sub-title">
                          <a href={`/product/${item.menuId}`}>
                            {item.menuName}
                          </a>
                        </h5>
                        <div className="item-subtitle text-soft">
                          {item.portionName}
                          {item.comment && (
                            <small className="d-block">{item.comment}</small>
                          )}
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
                                  onClick={() =>
                                    handleQuantityChange(
                                      item.menuId,
                                      item.portionId,
                                      item.quantity - 1
                                    )
                                  }
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
                                  onClick={() =>
                                    handleQuantityChange(
                                      item.menuId,
                                      item.portionId,
                                      item.quantity + 1
                                    )
                                  }
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
        <div className="footer fixed p-b60">
          <div className="container">
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            <FooterSummary checkoutDetails={checkoutDetails} />
            <div className="footer-btn d-flex align-items-center">
              <button
                className="btn btn-primary flex-1"
                onClick={() => {
                  /* Handle checkout */
                }}
                disabled={cartItems.length === 0 || !!error}
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
