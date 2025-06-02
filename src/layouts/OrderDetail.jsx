import React from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function OrderDetail() {
  const { orderId } = useParams();

  // Dummy order details data
  const dummyOrderDetails = {
    '0012345': {
      items: [
        {
          name: 'Chicken Biryani',
          quantity: 2,
          price: 15.99
        },
        {
          name: 'Butter Naan',
          quantity: 4,
          price: 3.99
        }
      ],
      summary: {
        itemTotal: 39.94,
        deliveryCharge: 5.00,
        tax: 3.59,
        discount: 0,
        walletDiscount: 0,
        totalAmount: 48.53
      },
      delivery: {
        address: "123 Main St, Downtown Area, City",
        type: "HOME"
      },
      payment: {
        method: "COD",
        deliveryTime: "Monday, February 13,2023 6:53pm"
      },
      tracking: [
        {
          status: "Order Created",
          time: "Feb 8,2023-12:20pm",
          isActive: true
        },
        {
          status: "Order Received",
          time: "Feb 8,2023-12:25pm",
          isActive: true
        },
        {
          status: "Order Confirmed",
          time: "Feb 8,2023-12:30pm",
          isActive: true
        },
        {
          status: "Order Processed",
          time: "Feb 8,2023-12:45pm",
          isActive: false
        },
        {
          status: "Order Delivered",
          time: "Feb 8,2023-1:20pm",
          isActive: false
        }
      ],
      user: {
        name: "John Doe",
        email: "john@example.com",
        phone: "1234567890",
        avatar: "../assets/images/avatar/1.jpg"
      },
      store: {
        name: "Fresh Market",
        email: "store@example.com",
        phone: "9876543210",
        image: "../assets/images/store/store1.jpg"
      },
      status: 'On Delivery',
      iconColor: '#FFA902',
      iconBgClass: ''
    },
    '0012346': {
      items: [
        {
          name: 'Margherita Pizza',
          quantity: 1,
          price: 12.99
        },
        {
          name: 'Garlic Bread',
          quantity: 2,
          price: 4.99
        }
      ],
      summary: {
        itemTotal: 22.97,
        deliveryCharge: 3.00,
        tax: 2.08,
        discount: 5.00,
        walletDiscount: 0,
        totalAmount: 23.05
      },
      delivery: {
        address: "456 Park Avenue, Uptown Area, City",
        type: "OFFICE"
      },
      payment: {
        method: "PAID",
        deliveryTime: "Monday, February 13,2023 7:30pm"
      },
      tracking: [
        {
          status: "Order Created",
          time: "Feb 8,2023-12:20pm",
          isActive: true
        },
        {
          status: "Order Received",
          time: "Feb 8,2023-12:25pm",
          isActive: true
        },
        {
          status: "Order Confirmed",
          time: "Feb 8,2023-12:30pm",
          isActive: true
        },
        {
          status: "Order Processed",
          time: "Feb 8,2023-12:45pm",
          isActive: true
        },
        {
          status: "Order Delivered",
          time: "Feb 8,2023-1:20pm",
          isActive: true
        }
      ],
      user: {
        name: "Jane Smith",
        email: "jane@example.com",
        phone: "9876543210",
        avatar: "../assets/images/avatar/2.jpg"
      },
      store: {
        name: "Pizza Palace",
        email: "pizza@example.com",
        phone: "1234567890",
        image: "../assets/images/store/store2.jpg"
      },
      status: 'Completed',
      iconColor: '#00B67A',
      iconBgClass: 'bg-success',
      itemCount: 8
    },
    '0012347': {
      items: [
        {
          name: 'Veggie Burger',
          quantity: 3,
          price: 8.99
        },
        {
          name: 'French Fries',
          quantity: 2,
          price: 3.99
        }
      ],
      summary: {
        itemTotal: 34.95,
        deliveryCharge: 4.00,
        tax: 3.12,
        discount: 0,
        walletDiscount: 0,
        totalAmount: 42.07
      },
      delivery: {
        address: "789 Beach Road, Seaside Area, City",
        type: "OTHER"
      },
      payment: {
        method: "CANCELLED",
        deliveryTime: "Monday, February 13,2023 8:00pm"
      },
      tracking: [
        {
          status: "Order Created",
          time: "Feb 8,2023-12:20pm",
          isActive: true
        },
        {
          status: "Order Cancelled",
          time: "Feb 8,2023-12:25pm",
          isActive: true
        },
        {
          status: "Order Confirmed",
          time: "Feb 8,2023-12:30pm",
          isActive: false
        },
        {
          status: "Order Processed",
          time: "Feb 8,2023-12:45pm",
          isActive: false
        },
        {
          status: "Order Delivered",
          time: "Feb 8,2023-1:20pm",
          isActive: false
        }
      ],
      user: {
        name: "Mike Johnson",
        email: "mike@example.com",
        phone: "5555555555",
        avatar: "../assets/images/avatar/3.jpg"
      },
      store: {
        name: "Burger Joint",
        email: "burger@example.com",
        phone: "6666666666",
        image: "../assets/images/store/store3.jpg"
      },
      status: 'Cancelled',
      iconColor: '#E74C3C',
      iconBgClass: 'bg-danger',
      itemCount: 15
    }
  };

  const orderDetails = dummyOrderDetails[orderId];

  if (!orderDetails) {
    return <div>Order not found</div>;
  }

  const getStatusStyles = (status) => {
    switch (status.toLowerCase()) {
      case 'cancelled':
        return {
          headerClass: 'text-danger',
          badgeClass: 'status-badge cancelled',
          iconColor: '#E74C3C',
          iconBgClass: 'bg-custom-red',
          timelineClass: 'cancelled',
          badgeBg: '#FFEBEE',
          statusColors: {
            background: '#FFF5F5',
            border: '#FFCDD2',
            text: '#C0392B',
            accent: '#E74C3C',
            muted: '#EF5350'
          }
        };
      case 'completed':
        return {
          headerClass: 'text-success',
          badgeClass: 'status-badge completed',
          iconColor: '#00B67A',
          iconBgClass: 'bg-custom-green',
          timelineClass: 'completed',
          statusColors: {
            background: '#E8F5E9',
            border: '#A5D6A7',
            text: '#2E7D32',
            accent: '#00B67A',
            muted: '#81C784'
          }
        };
      default:
        return {
          headerClass: 'text-warning',
          badgeClass: 'status-badge pending',
          iconColor: '#FFA902',
          iconBgClass: 'bg-warning',
          timelineClass: 'pending',
          statusColors: {
            background: '#FFF8E1',
            border: '#FFE082',
            text: '#F57C00',
            accent: '#FFA902',
            muted: '#FFB74D'
          }
        };
    }
  };

  const statusStyles = getStatusStyles(orderDetails.status);

  return (
    <>
      <Header />
      <div className="page-content bottom-content">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="title border-bottom pb-1 font-w600">
              Order #{orderId}
            </h5>
            <span className={`${statusStyles.badgeClass} ms-2`}>
              {orderDetails.status}
            </span>
          </div>
          <div className={`order-summery ${orderDetails.status.toLowerCase() === 'cancelled' ? 'cancelled-order' : ''}`}>
            {orderDetails.status.toLowerCase() === 'cancelled' && (
              <div className="alert alert-custom-red mb-3">
                <i className="fas fa-exclamation-triangle me-2"></i>
                <strong>Order Cancelled</strong>
                <p className="mb-0 mt-1 small">This order has been cancelled and cannot be processed further.</p>
              </div>
            )}

            <div className="d-flex align-items-center mb-3">
              <h5 className="title mb-0">Order #{orderId}</h5>
              <span className={`${statusStyles.badgeClass} ms-2`}>
                {orderDetails.status}
              </span>
            </div>

            <div className="summary-section p-3 mb-4" style={{ 
              borderRadius: '8px', 
              background: orderDetails.status.toLowerCase() === 'cancelled' ? '#FFEBEE' : 'white',
              borderColor: orderDetails.status.toLowerCase() === 'cancelled' ? statusStyles.statusColors?.border : '#e4e4e4'
            }}>
              <ul className={`summery-list mb-4 ${orderDetails.status.toLowerCase() === 'cancelled' ? 'text-muted' : ''}`}>
                {orderDetails.items.map((item, index) => (
                  <li key={index}>
                <p className="order-name">
                      {item.name} - ${item.price}
                </p>
                    <span className="order-quantity">x{item.quantity}</span>
              </li>
                ))}
              <li>
                <h6 className="mb-0 font-12">Order item Total</h6>
                  <span className="font-12 font-w600 text-dark">
                    ${orderDetails.summary.itemTotal}
                  </span>
              </li>
              <li>
                <h6 className="mb-0 font-12">Order Delivery Charge</h6>
                  <span className="font-12 font-w600 text-dark">
                    ${orderDetails.summary.deliveryCharge}
                  </span>
              </li>
              <li>
                <h6 className="mb-0 font-12">Split Order Tax</h6>
                  <span className="font-12 font-w600 text-dark">
                    ${orderDetails.summary.tax}
                  </span>
              </li>
              <li>
                <h6 className="mb-0 font-12">Split Order Discount</h6>
                  <span className="font-12 font-w600 text-dark">
                    ${orderDetails.summary.discount}
                  </span>
              </li>
              <li>
                <h6 className="mb-0 font-12">Split Order Wallet Discount</h6>
                  <span className="font-12 font-w600 text-dark">
                    ${orderDetails.summary.walletDiscount}
                  </span>
              </li>
              <li>
                  <h6 className="mb-0 font-14 text-primary">AMOUNT TO COLLECT</h6>
                  <span className="font-14 font-w600 text-primary">
                    ${orderDetails.summary.totalAmount}
                  </span>
              </li>
            </ul>
            </div>

            <div className="deliver-location mb-4">
              <div className="d-flex align-items-center mb-3">
                <span className="font-w600 flex-1">Deliver to</span>
                <span className={`font-w800 ${statusStyles.headerClass}`}>
                  {orderDetails.delivery.type}
                </span>
              </div>
              <h6 className="address font-14">{orderDetails.delivery.address}</h6>
            </div>

            <h5 className="title border-bottom pb-2 mb-2 font-w600">
              Basic Detail
            </h5>
            <div className="view-title mb-4">
              <ul>
                <li>
                  <span>Order ID</span>
                  <span className={`text-dark ${statusStyles.headerClass}`}>{orderId}</span>
                </li>
                <li>
                  <span>Payment Method</span>
                  <span className={`text-dark ${statusStyles.headerClass}`}>
                    {orderDetails.payment.method}
                  </span>
                </li>
                <li>
                  <span>Delivery On</span>
                  <span className={`text-dark ${orderDetails.status.toLowerCase() === 'cancelled' ? 'text-danger' : ''}`}>
                    {orderDetails.payment.deliveryTime}
                  </span>
                </li>
              </ul>
            </div>

            <div className="tracking-section">
              <h5 className={`title border-bottom pb-2 mb-2 font-w600 ${statusStyles.headerClass}`}>
              Order Tracking
                <span 
                  className={`badge ms-2`} 
                  style={{ 
                    fontSize: '12px',
                    backgroundColor: statusStyles.iconColor
                  }}
                >
                  {orderDetails.status}
                </span>
            </h5>
              <ul className={`dz-timeline style-2 mb-5 ${statusStyles.timelineClass}`}>
                {orderDetails.tracking.map((step, index) => (
                  <li 
                    key={index} 
                    className={`timeline-item ${
                      step.isActive ? 'active' : ''
                    } ${
                      orderDetails.status.toLowerCase() === 'cancelled' && 
                      step.status === 'Order Cancelled' ? 'cancelled' : 
                      orderDetails.status.toLowerCase() === 'completed' ? 'completed' : ''
                    }`}
                  >
                    <h6 className="timeline-tilte">
                      {step.status}
                      {step.status === 'Order Cancelled' && orderDetails.status.toLowerCase() === 'cancelled' && (
                        <i className="fas fa-ban ms-2"></i>
                      )}
                      {step.status === 'Order Delivered' && orderDetails.status.toLowerCase() === 'completed' && (
                        <i className="fas fa-check-circle ms-2"></i>
                      )}
                    </h6>
                    <p className="timeline-date">{step.time}</p>
              </li>
                ))}
            </ul>
            </div>

            {/* User Information */}
            <h5 className="title border-bottom pb-2 mb-2 font-w600">
              User Information
            </h5>
            <div className="item-list style-6 m-b30">
              <ul>
                <li>
                  <div className="item-content">
                    <div className="item-media media media-65">
                      <img src={orderDetails.user.avatar} alt="user avatar" />
                    </div>
                    <div className="item-inner">
                      <div className="item-title-row">
                        <h6 className="item-title mb-1 sub-title">
                          <a href="#">{orderDetails.user.name}</a>
                        </h6>
                        <span className="info">
                          <i className="fa-solid me-1 fa-envelope" />
                          {orderDetails.user.email}
                        </span>
                        <span className="info">
                          <i className="fa-solid me-1 fa-phone" />
                          {orderDetails.user.phone}
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            {/* Store Information */}
            <h5 className="title border-bottom pb-2 mb-2 font-w600">
              Store Information
            </h5>
            <div className="item-list style-6">
              <ul>
                <li>
                  <div className="item-content">
                    <div className="item-media media media-65">
                      <img src={orderDetails.store.image} alt="store logo" />
                    </div>
                    <div className="item-inner">
                      <div className="item-title-row">
                        <h6 className="item-title mb-1 sub-title">
                          <a href="#">{orderDetails.store.name}</a>
                        </h6>
                        <span className="info">
                          <i className="fa-solid me-1 fa-envelope" />
                          {orderDetails.store.email}
                        </span>
                        <span className="info">
                          <i className="fa-solid me-1 fa-phone" />
                          {orderDetails.store.phone}
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            <div className="cancelled-watermark"></div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default OrderDetail;
