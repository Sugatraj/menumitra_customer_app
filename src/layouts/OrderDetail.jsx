import React from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function OrderDetail() {
  const { orderId } = useParams();

  return (
    <>
      <Header />
      <div className="page-content bottom-content">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="title border-bottom pb-1 font-w600">
              Order #{orderId}
            </h5>
            <span className="status-badge completed">
              Completed
            </span>
          </div>
          <div className="order-summery">
            <ul className="summery-list mb-4">
              <li>
                <p className="order-name">Lemon Rice</p>
                <div className="d-flex align-items-center">
                  <span className="badge bg-light text-dark me-2">Veg</span>
                  <span className="order-quantity">x1</span>
                </div>
              </li>
              <li>
                <h6 className="mb-0 font-12">Bill Amount</h6>
                <span className="font-12 font-w600 text-dark">₹180.00</span>
              </li>
              <li>
                <h6 className="mb-0 font-12">Service Charge (1%)</h6>
                <span className="font-12 font-w600 text-dark">₹1.74</span>
              </li>
              <li>
                <h6 className="mb-0 font-12">GST (1%)</h6>
                <span className="font-12 font-w600 text-dark">₹1.76</span>
              </li>
              <li>
                <h6 className="mb-0 font-12 text-success">Special Discount</h6>
                <span className="font-12 font-w600 text-success">-₹10.50</span>
              </li>
              <li>
                <h6 className="mb-0 font-12">Additional Charges</h6>
                <span className="font-12 font-w600 text-dark">₹5.00</span>
              </li>
              <li>
                <h6 className="mb-0 font-14 text-primary">FINAL AMOUNT</h6>
                <span className="font-14 font-w600 text-primary">₹198.00</span>
              </li>
            </ul>

            <div className="deliver-location mb-4">
              <div className="d-flex align-items-center mb-3">
                <span className="font-w600 flex-1">Deliver to</span>
                <span className="font-w800 text-success">PARCEL</span>
              </div>
              <h6 className="address font-14">
                satara, maharashtra
              </h6>
            </div>

            <h5 className="title border-bottom pb-2 mb-2 font-w600">Basic Detail</h5>
            <div className="view-title mb-4">
              <ul>
                <li>
                  <span>Order ID</span>
                  <span className="text-dark">{orderId}</span>
                </li>
                <li>
                  <span>Payment Method</span>
                  <span className="text-dark">CASH</span>
                </li>
                <li>
                  <span>Delivery On</span>
                  <span className="text-dark">31 May 2025 02:18 PM</span>
                </li>
              </ul>
            </div>

            <h5 className="title border-bottom pb-2 mb-2 font-w600">
              Order Tracking
            </h5>
            <ul className="dz-timeline style-2 mb-5">
              <li className="timeline-item active">
                <h6 className="timeline-tilte">Order Created</h6>
                <p className="timeline-date">31 May 2025 02:18 PM</p>
              </li>
              <li className="timeline-item active">
                <h6 className="timeline-tilte">Order Received</h6>
                <p className="timeline-date">31 May 2025 02:18 PM</p>
              </li>
              <li className="timeline-item active">
                <h6 className="timeline-tilte">Order Confirmed</h6>
                <p className="timeline-date">31 May 2025 02:18 PM</p>
              </li>
              <li className="timeline-item active">
                <h6 className="timeline-tilte">Order Processed</h6>
                <p className="timeline-date">31 May 2025 02:18 PM</p>
              </li>
              <li className="timeline-item active">
                <h6 className="timeline-tilte">Order Delivered</h6>
                <p className="timeline-date">31 May 2025 02:18 PM</p>
              </li>
            </ul>

            <h5 className="title border-bottom pb-2 mb-2 font-w600">
              User Information
            </h5>
            <div className="item-list style-6 m-b30">
              <ul>
                <li>
                  <div className="item-content">
                    {/* <div className="item-media media media-65">
                      <img src="../assets/images/avatar/1.jpg" alt="user" />
                    </div> */}
                    <div className="item-inner">
                      <div className="item-title-row">
                        <h6 className="item-title mb-1 sub-title">
                          <a href="#">Sugatraj Sarwade</a>
                        </h6>
                        <span className="info">
                          <i className="fa-solid me-1 fa-phone" />
                          7972908961
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
                    {/* <div className="item-media media media-65">
                      <img src="../assets/images/store/store1.jpg" alt="store" />
                    </div> */}
                    <div className="item-inner">
                      <div className="item-title-row">
                        <h6 className="item-title mb-1 sub-title">
                          <a href="#">Bhavani Hotel</a>
                        </h6>
                        <span className="info">
                          <i className="fa-solid me-1 fa-phone" />
                          6767679760
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
