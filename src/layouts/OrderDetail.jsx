import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useOutlet } from "../contexts/OutletContext"

const OrderRating = ({ orderId }) => {
  const { outletId } = useOutlet();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    if (rating === 0) return;
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      const auth = JSON.parse(localStorage.getItem("auth")) || {};
      const accessToken = auth.accessToken;
      const userId = auth.userId || "73";

      const response = await fetch('https://men4u.xyz/v2/user/rating_to_order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          outlet_id: outletId.toString(),
          user_id: userId,
          order_id: orderId,
          rating: rating.toString()
        })
      });

      const data = await response.json();

      if (response.ok && data.detail === "rating updated") {
        setIsSubmitted(true);
      } else {
        throw new Error(data.detail || 'Failed to submit rating');
      }
    } catch (error) {
      console.error('Error submitting rating:', error);
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="rating-section bg-light rounded-4 p-3 mb-4">
        <div className="text-center">
          <div className="text-success mb-2">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="#00B67A"/>
            </svg>
          </div>
          <h6 className="text-success mb-0">Thank you for rating this order!</h6>
          <div className="d-flex justify-content-center mt-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill={star <= rating ? "#FFA902" : "#D1D1D1"}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"/>
              </svg>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rating-section bg-light rounded-4 p-3 mb-4">
      <div className="text-center">
        <h6 className="title font-w600 mb-3">How was your order?</h6>
        <div className="stars d-flex justify-content-center gap-2 mb-3">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              className={`btn btn-link p-0 m-0`}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              onClick={() => setRating(star)}
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill={star <= (hover || rating) ? "#FFA902" : "#D1D1D1"}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"/>
              </svg>
            </button>
          ))}
        </div>
        {error && (
          <div className="alert alert-danger py-2 mb-3">{error}</div>
        )}
        <button
          className="btn btn-primary px-4"
          onClick={handleSubmit}
          disabled={rating === 0 || isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Submitting...
            </>
          ) : (
            'Submit Rating'
          )}
        </button>
      </div>
    </div>
  );
};

function OrderDetail() {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const VegIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="12" height="12" rx="2" fill="white" stroke="#00B67A" strokeWidth="2"/>
      <circle cx="8" cy="8" r="3" fill="#00B67A"/>
    </svg>
  );

  const NonVegIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="12" height="12" rx="2" fill="white" stroke="#E74C3C" strokeWidth="2"/>
      <circle cx="8" cy="8" r="3" fill="#E74C3C"/>
    </svg>
  );

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        // Get auth data from localStorage
        const auth = JSON.parse(localStorage.getItem("auth")) || {};
        const accessToken = auth.accessToken;
        const userId = auth.userId || "73"; // Get userId from localStorage

        if (!accessToken) {
          throw new Error("Authentication token not found");
        }

        const response = await fetch('https://men4u.xyz/v2/user/get_order_details', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          },
          body: JSON.stringify({ 
            order_id: orderId,
            user_id: parseInt(userId) // Add user_id to payload
          })
        });

        if (!response.ok) {
          throw new Error("Failed to fetch order details");
        }

        const data = await response.json();
        
        if (data.detail) {
          setOrderDetails(data.detail);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (error) {
        console.error('Error fetching order details:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="page-content bottom-content">
          <div className="container">Loading...</div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="page-content bottom-content">
          <div className="container">Error: {error}</div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="page-content bottom-content">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="title border-bottom pb-1 font-w600">
              Order #{orderDetails.order_details.order_number}
            </h5>
            <span className="status-badge">
              {orderDetails.order_details.order_status}
            </span>
          </div>

          <div className="order-summery">
            <ul className="summery-list mb-4">
              {orderDetails.menu_details.map((menu, index) => (
                <li key={index}>
                  <p className="order-name">{menu.menu_name}</p>
                  <div className="d-flex align-items-center">
                    <span className="me-2">
                      {menu.menu_food_type.toLowerCase() === "veg" ? <VegIcon /> : <NonVegIcon />}
                    </span>
                    <span className="order-quantity">x{menu.quantity}</span>
                  </div>
                </li>
              ))}
              <li>
                <h6 className="mb-0 font-12">Bill Amount</h6>
                <span className="font-12 font-w600 text-dark">₹{orderDetails.order_details.total_bill_amount}</span>
              </li>
              <li>
                <h6 className="mb-0 font-12">Service Charge ({orderDetails.order_details.service_charges_percent}%)</h6>
                <span className="font-12 font-w600 text-dark">₹{orderDetails.order_details.service_charges_amount}</span>
              </li>
              <li>
                <h6 className="mb-0 font-12">GST ({orderDetails.order_details.gst_percent}%)</h6>
                <span className="font-12 font-w600 text-dark">₹{orderDetails.order_details.gst_amount}</span>
              </li>
              {orderDetails.order_details.discount_amount > 0 && (
                <li>
                  <h6 className="mb-0 font-12">Discount ({orderDetails.order_details.discount_percent}%)</h6>
                  <span className="font-12 font-w600 text-success">-₹{orderDetails.order_details.discount_amount}</span>
                </li>
              )}
              <li>
                <h6 className="mb-0 font-14 text-primary">FINAL AMOUNT</h6>
                <span className="font-14 font-w600 text-primary">₹{orderDetails.order_details.final_grand_total}</span>
              </li>
            </ul>

            <div className="deliver-location mb-4">
              <div className="d-flex align-items-center mb-3">
                <span className="font-w600 flex-1">Deliver to</span>
                <span className="font-w800">{orderDetails.order_details.order_type}</span>
              </div>
              {orderDetails.order_details.table_number && (
                <h6 className="address font-14">
                  Table: {orderDetails.order_details.table_number.join(", ")}
                  ({orderDetails.order_details.section_name})
                </h6>
              )}
            </div>

            <h5 className="title border-bottom pb-2 mb-2 font-w600">Basic Detail</h5>
            <div className="view-title mb-4">
              <ul>
                <li>
                  <span>Order ID</span>
                  <span className="text-dark">{orderDetails.order_details.order_number}</span>
                </li>
                <li>
                  <span>Payment Method</span>
                  <span className="text-dark">{orderDetails.order_details.payment_method || "Not Paid"}</span>
                </li>
                <li>
                  <span>Delivery On</span>
                  <span className="text-dark">{`${orderDetails.order_details.date} ${orderDetails.order_details.time}`}</span>
                </li>
              </ul>
            </div>

            {/* <h5 className="title border-bottom pb-2 mb-2 font-w600">
              Order Tracking
            </h5>
            <ul className="dz-timeline style-2 mb-5">
              <li className="timeline-item active">
                <h6 className="timeline-tilte">Order Created</h6>
                <p className="timeline-date">30 May 2025 12:19 PM</p>
              </li>
              <li className="timeline-item active">
                <h6 className="timeline-tilte">Order Received</h6>
                <p className="timeline-date">30 May 2025 12:19 PM</p>
              </li>
              <li className="timeline-item active">
                <h6 className="timeline-tilte">Order Cooking</h6>
                <p className="timeline-date">30 May 2025 12:19 PM</p>
              </li>
              <li className="timeline-item">
                <h6 className="timeline-tilte">Order Processed</h6>
                <p className="timeline-date">30 May 2025 12:19 PM</p>
              </li>
              <li className="timeline-item">
                <h6 className="timeline-tilte">Order Delivered</h6>
                <p className="timeline-date">30 May 2025 12:19 PM</p>
              </li>
            </ul> */}

            <h5 className="title border-bottom pb-2 mb-2 font-w600">
              User Information
            </h5>
            <div className="item-list style-6 m-b30">
              <ul>
                <li>
                  <div className="item-content">
                    <div className="item-inner">
                      <div className="item-title-row">
                        <h6 className="item-title mb-1 sub-title">
                          <a href="#">{orderDetails.order_details.user_name}</a>
                        </h6>
                        <span className="info">
                          <i className="fa-solid me-1 fa-phone" />
                          {orderDetails.order_details.user_mobile}
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            <h5 className="title border-bottom pb-2 mb-2 font-w600">
              Store Information
            </h5>
            <div className="item-list style-6">
              <ul>
                <li>
                  <div className="item-content">
                    <div className="item-inner">
                      <div className="item-title-row">
                        <h6 className="item-title mb-1 sub-title">
                          <a href="#">{orderDetails.order_details.outlet_name}</a>
                        </h6>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          
          <OrderRating orderId={orderDetails.order_details.order_id} />

        </div>
      </div>
      <Footer />
    </>
  );
}

export default OrderDetail;
