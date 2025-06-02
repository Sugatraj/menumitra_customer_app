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
      iconBgClass: '',
      itemCount: 12
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
      iconColor: 'var(--primary)',
      iconBgClass: 'bg-primary',
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
      iconColor: 'var(--primary)',
      iconBgClass: 'bg-danger',
      itemCount: 15
    }
  };

  const orderDetails = dummyOrderDetails[orderId];

  if (!orderDetails) {
    return <div>Order not found</div>;
  }

  return (
    <>
      <Header />
      <div className="page-content bottom-content">
        <div className="container">
          <h5 className="title border-bottom pb-1 font-w600">Order #{orderId}</h5>
          <div className="order-summery">
            <ul className="summery-list mb-4">
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

            <div className="deliver-location mb-4">
              <div className="d-flex align-items-center mb-3">
                <span className="font-w600 flex-1">Deliver to</span>
                <span className="font-w800">{orderDetails.delivery.type}</span>
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
                  <span className="text-dark">{orderId}</span>
                </li>
                <li>
                  <span>Payment Method</span>
                  <span className="text-dark">{orderDetails.payment.method}</span>
                </li>
                <li>
                  <span>Delivery On</span>
                  <span className="text-dark">{orderDetails.payment.deliveryTime}</span>
                </li>
              </ul>
            </div>

            <h5 className="title border-bottom pb-2 mb-2 font-w600">
              Order Tracking
            </h5>
            <ul className="dz-timeline style-2 mb-5">
              {orderDetails.tracking.map((step, index) => (
                <li key={index} className={`timeline-item ${step.isActive ? 'active' : ''}`}>
                  <h6 className="timeline-tilte">{step.status}</h6>
                  <p className="timeline-date">{step.time}</p>
                </li>
              ))}
            </ul>

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
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default OrderDetail;
