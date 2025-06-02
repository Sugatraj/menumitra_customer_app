import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

function OrderDetail() {
  return (
    <>
      <Header />
      <div className="page-content bottom-content">
        <div className="container">
          <h5 className="title border-bottom pb-1 font-w600">Orders</h5>
          <div className="order-summery">
            <ul className="summery-list mb-4">
              <li>
                <p className="order-name">
                  Apple Royal Gala 4pcs - 1kg - $10.0
                </p>
                <span className="order-quantity">x1</span>
              </li>
              <li>
                <h6 className="mb-0 font-12">Order item Total</h6>
                <span className="font-12 font-w600 text-dark">$157.32</span>
              </li>
              <li>
                <h6 className="mb-0 font-12">Order Delivery Charge</h6>
                <span className="font-12 font-w600 text-dark">$15.35</span>
              </li>
              <li>
                <h6 className="mb-0 font-12">Split Order Tax</h6>
                <span className="font-12 font-w600 text-dark">$1.0</span>
              </li>
              <li>
                <h6 className="mb-0 font-12">Split Order Discount</h6>
                <span className="font-12 font-w600 text-dark">$0.0</span>
              </li>
              <li>
                <h6 className="mb-0 font-12">Split Order Wallet Discount</h6>
                <span className="font-12 font-w600 text-dark">$0.0</span>
              </li>
              <li>
                <h6 className="mb-0 font-14 text-primary">
                  AMMOUNT TO COLLECT
                </h6>
                <span className="font-14 font-w600 text-primary">$352.17</span>
              </li>
            </ul>
            <div className="deliver-location mb-4">
              <div className="d-flex align-items-center mb-3">
                <span className="font-w600 flex-1">Deliver to</span>
                <span className="font-w800">HOME</span>
              </div>
              <h6 className="address font-14">
                ABC 132, Mahaveer Nagar Ext. Near Mh-Park Kota, rajasthan
              </h6>
            </div>
            <h5 className="title border-bottom pb-2 mb-2 font-w600">
              Basic Detail
            </h5>
            <div className="view-title mb-4">
              <ul>
                <li>
                  <span>Order ID</span>
                  <span className="text-dark">277</span>
                </li>
                <li>
                  <span>Payment Method</span>
                  <span className="text-dark">COD</span>
                </li>
                <li>
                  <span>Delivery On</span>
                  <span className="text-dark">
                    Monday, February 13,2023 6:53pm
                  </span>
                </li>
              </ul>
            </div>
            <h5 className="title border-bottom pb-2 mb-2 font-w600">
              Order Tracking
            </h5>
            <ul className="dz-timeline style-2 mb-5">
              <li className="timeline-item active">
                <h6 className="timeline-tilte">Order Created</h6>
                <p className="timeline-date">Feb 8,2023-12:20pm</p>
              </li>
              <li className="timeline-item process">
                <h6 className="timeline-tilte">Order Recived</h6>
                <p className="timeline-date">Feb 8,2023-12:20pm</p>
              </li>
              <li className="timeline-item">
                <h6 className="timeline-tilte">Order Confirmed</h6>
                <p className="timeline-date">Feb 8,2023-12:20pm</p>
              </li>
              <li className="timeline-item">
                <h6 className="timeline-tilte">Order Processed</h6>
                <p className="timeline-date">Feb 8,2023-12:20pm</p>
              </li>
              <li className="timeline-item">
                <h6 className="timeline-tilte">Order Delivered</h6>
                <p className="timeline-date">Feb 8,2023-12:20pm</p>
              </li>
            </ul>
            <h5 className="title border-bottom pb-2 mb-2 font-w600">
              User Information
            </h5>
            <div className="item-list style-6 m-b30">
              <ul>
                <li>
                  <div className="item-content">
                    <div className="item-media media media-65">
                      <img src="../assets/images/avatar/1.jpg" alt="logo" />
                    </div>
                    <div className="item-inner">
                      <div className="item-title-row">
                        <h6 className="item-title mb-1 sub-title">
                          <a href="javascript:void(0);">Mutahi Muturi</a>
                        </h6>
                        <span className="info">
                          <i className="fa-solid me-1 fa-envelope" />
                          test@gmail.com
                        </span>
                        <span className="info">
                          <i className="fa-solid me-1 fa-phone" />
                          1234567890
                        </span>
                      </div>
                    </div>
                    <div className="deliver-icon">
                      <svg
                        height={24}
                        viewBox="0 0 548.244 548.244"
                        width={24}
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g>
                          <g>
                            <path
                              clipRule="evenodd"
                              d="m392.19 156.054-180.922 125.613-189.236-63.087c-13.209-4.412-22.108-16.805-22.032-30.728.077-13.923 9.078-26.24 22.338-30.498l483.812-155.805c11.5-3.697 24.123-.663 32.666 7.88 8.542 8.543 11.577 21.165 7.879 32.666l-155.805 483.811c-4.258 13.26-16.575 22.261-30.498 22.338-13.923.076-26.316-8.823-30.728-22.032l-63.393-190.153z"
                              fillRule="evenodd"
                            />
                          </g>
                        </g>
                      </svg>
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
                    <div className="item-media media media-65">
                      <img src="../assets/images/store/store1.jpg" alt="logo" />
                    </div>
                    <div className="item-inner">
                      <div className="item-title-row">
                        <h6 className="item-title mb-1 sub-title">
                          <a href="javascript:void(0);">Fresh Market</a>
                        </h6>
                        <span className="info">
                          <i className="fa-solid me-1 fa-envelope" />
                          test@gmail.com
                        </span>
                        <span className="info">
                          <i className="fa-solid me-1 fa-phone" />
                          1234567890
                        </span>
                      </div>
                    </div>
                    <div className="deliver-icon">
                      <svg
                        height={24}
                        viewBox="0 0 548.244 548.244"
                        width={24}
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g>
                          <g>
                            <path
                              clipRule="evenodd"
                              d="m392.19 156.054-180.922 125.613-189.236-63.087c-13.209-4.412-22.108-16.805-22.032-30.728.077-13.923 9.078-26.24 22.338-30.498l483.812-155.805c11.5-3.697 24.123-.663 32.666 7.88 8.542 8.543 11.577 21.165 7.879 32.666l-155.805 483.811c-4.258 13.26-16.575 22.261-30.498 22.338-13.923.076-26.316-8.823-30.728-22.032l-63.393-190.153z"
                              fillRule="evenodd"
                            />
                          </g>
                        </g>
                      </svg>
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
