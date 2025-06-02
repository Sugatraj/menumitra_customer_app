import React, { useEffect, useState } from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";

function Orders() {
  // State to store the orders data
  const [ordersData, setOrdersData] = useState({
    paid: {},
    cancelled: {}
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      // Get user_id and access token from localStorage
      const auth = JSON.parse(localStorage.getItem('auth')) || {};
      const userId = auth.userId || '73'; // Default to 73 for testing
      const accessToken = auth.accessToken;
      const outletId = '1'; // You might want to get this dynamically

      if (!accessToken) {
        throw new Error('Authentication token not found');
      }

      const response = await fetch('https://men4u.xyz/v2/user/get_completed_and_cancel_order_list', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          user_id: parseInt(userId),
          outlet_id: parseInt(outletId)
        })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }

      const data = await response.json();
      
      // Store the orders data in state
      if (data.detail && data.detail.lists) {
        setOrdersData(data.detail.lists);
      }
      
      setIsLoading(false);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError(err.message);
      setIsLoading(false);
    }
  };

  // Log the state when it changes (for debugging)
  useEffect(() => {
    console.log('Orders data updated:', ordersData);
  }, [ordersData]);

  // Rest of your existing JSX code...
  return (
    <>
      <Header />
      <div className="page-content">
        {isLoading ? (
          <div>Loading orders...</div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : (
          // Your existing tab and accordion structure
          <div className="container pb">
            <div className="default-tab style-1">
              <ul className="nav nav-tabs" id="myTab3" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active"
                    id="all-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#all-tab-pane"
                    type="button"
                    role="tab"
                    aria-controls="all-tab-pane"
                    aria-selected="true"
                  >
                    All
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link d-flex align-items-center"
                    id="completed-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#completed-tab-pane"
                    type="button"
                    role="tab"
                    aria-controls="completed-tab-pane"
                    aria-selected="false"
                  >
                    <svg
                      className="me-2"
                      width={16}
                      height={16}
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx={8}
                        cy={8}
                        r={7}
                        fill="#027335"
                        stroke="(--bg-white)"
                        strokeWidth={2}
                      />
                    </svg>
                    Completed
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link d-flex align-items-center"
                    id="cancelled-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#cancelled-tab-pane"
                    type="button"
                    role="tab"
                    aria-controls="cancelled-tab-pane"
                    aria-selected="false"
                  >
                    <svg
                      className="me-2"
                      width={16}
                      height={16}
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx={8}
                        cy={8}
                        r={7}
                        fill="#FF0000"
                        stroke="var(--bg-white)"
                        strokeWidth={2}
                      />
                    </svg>
                    Cancelled
                  </button>
                </li>
              </ul>
              <div className="tab-content" id="myTabContent3">
                <div
                  className="tab-pane fade show active"
                  id="all-tab-pane"
                  role="tabpanel"
                  aria-labelledby="all-tab"
                  tabIndex={0}
                >
                  <div className="accordion style-3" id="accordionExample">
                    <div className="accordion-item">
                      <div className="accordion-header" id="heading1">
                        <a
                          href="javascript:void(0);"
                          className="accordion-button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapse1"
                          aria-expanded="true"
                          aria-controls="collapse1"
                        >
                          <div className="d-flex align-items-center">
                            <div className="icon-box me-3">
                              <svg
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M20.929 1.628C20.8546 1.44247 20.7264 1.28347 20.5608 1.17153C20.3952 1.05959 20.1999 0.999847 20 1H4C3.80012 0.999847 3.60479 1.05959 3.43919 1.17153C3.2736 1.28347 3.14535 1.44247 3.071 1.628L1.071 6.628C1.02414 6.74643 1.00005 6.87264 1 7V22C1 22.2652 1.10536 22.5196 1.29289 22.7071C1.48043 22.8946 1.73478 23 2 23H22C22.2652 23 22.5196 22.8946 22.7071 22.7071C22.8946 22.5196 23 22.2652 23 22V7C23 6.87264 22.9759 6.74643 22.929 6.628L20.929 1.628ZM4.677 3H19.323L20.523 6H3.477L4.677 3ZM3 21V8H21V21H3Z"
                                  fill="#FFA902"
                                />
                                <path
                                  d="M10 17H6C5.73478 17 5.48043 17.1054 5.29289 17.2929C5.10536 17.4804 5 17.7348 5 18C5 18.2652 5.10536 18.5196 5.29289 18.7071C5.48043 18.8947 5.73478 19 6 19H10C10.2652 19 10.5196 18.8947 10.7071 18.7071C10.8946 18.5196 11 18.2652 11 18C11 17.7348 10.8946 17.4804 10.7071 17.2929C10.5196 17.1054 10.2652 17 10 17Z"
                                  fill="#FFA902"
                                />
                              </svg>
                            </div>
                            <div>
                              <h6 className="sub-title">Order ID #0012345</h6>
                              <ul className="item-status d-flex align-items-center">
                                <li className="me-2 text-soft">12 Items</li>
                                <li className="text-soft">On Delivery</li>
                              </ul>
                            </div>
                          </div>
                        </a>
                      </div>
                      <div
                        id="collapse1"
                        className="accordion-collapse collapse show"
                        aria-labelledby="heading1"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body pb-0">
                          <ul className="p-2">
                            <li className="d-flex align-items-start mb-3">
                              <div className="me-3">
                                <svg
                                  width={14}
                                  height={14}
                                  viewBox="0 0 14 14"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <rect
                                    width={14}
                                    height={14}
                                    rx={7}
                                    fill="#027335"
                                  />
                                </svg>
                              </div>
                              <div>
                                <h6 className="sub-title mb-1">Order Placed</h6>
                                <span className="text-soft">
                                  January 19th, 12 : 02 AM
                                </span>
                              </div>
                            </li>
                            <li className="d-flex align-items-start mb-3">
                              <div className="me-3">
                                <svg
                                  width={14}
                                  height={14}
                                  viewBox="0 0 14 14"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <rect
                                    width={14}
                                    height={14}
                                    rx={7}
                                    fill="#027335"
                                  />
                                </svg>
                              </div>
                              <div>
                                <h6 className="sub-title mb-1">Order Confirmed</h6>
                                <span className="text-soft">
                                  January 19th, 12 : 02 AM
                                </span>
                              </div>
                            </li>
                            <li className="d-flex align-items-start mb-3">
                              <div className="me-3">
                                <svg
                                  width={14}
                                  height={14}
                                  viewBox="0 0 14 14"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <rect
                                    width={14}
                                    height={14}
                                    rx={7}
                                    fill="#027335"
                                  />
                                </svg>
                              </div>
                              <div>
                                <h6 className="sub-title mb-1">
                                  Your Order On Delivery by Courir
                                </h6>
                                <span className="text-soft">
                                  January 19th, 12 : 02 AM
                                </span>
                              </div>
                            </li>
                            <li className="d-flex align-items-start">
                              <div className="me-3">
                                <svg
                                  width={14}
                                  height={14}
                                  viewBox="0 0 14 14"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <rect
                                    width={14}
                                    height={14}
                                    rx={7}
                                    fill="#7D8FAB"
                                  />
                                </svg>
                              </div>
                              <div>
                                <h6 className="sub-title mb-1 text-soft">
                                  Order Delivered
                                </h6>
                                <span className="text-soft">
                                  January 19th, 12 : 02 AM
                                </span>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <div className="accordion-header" id="heading2">
                        <a
                          href="javascript:void(0);"
                          className="accordion-button collapsed"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapse2"
                          aria-expanded="true"
                          aria-controls="collapse2"
                        >
                          <div className="d-flex align-items-center">
                            <div className="icon-box bg-primary me-3">
                              <svg
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M20.929 1.628C20.8546 1.44247 20.7264 1.28347 20.5608 1.17153C20.3952 1.05959 20.1999 0.999847 20 1H4C3.80012 0.999847 3.60479 1.05959 3.43919 1.17153C3.2736 1.28347 3.14535 1.44247 3.071 1.628L1.071 6.628C1.02414 6.74643 1.00005 6.87264 1 7V22C1 22.2652 1.10536 22.5196 1.29289 22.7071C1.48043 22.8946 1.73478 23 2 23H22C22.2652 23 22.5196 22.8946 22.7071 22.7071C22.8946 22.5196 23 22.2652 23 22V7C23 6.87264 22.9759 6.74643 22.929 6.628L20.929 1.628ZM4.677 3H19.323L20.523 6H3.477L4.677 3ZM3 21V8H21V21H3Z"
                                  fill="var(--primary)"
                                />
                                <path
                                  d="M10 17H6C5.73478 17 5.48043 17.1054 5.29289 17.2929C5.10536 17.4804 5 17.7348 5 18C5 18.2652 5.10536 18.5196 5.29289 18.7071C5.48043 18.8947 5.73478 19 6 19H10C10.2652 19 10.5196 18.8947 10.7071 18.7071C10.8946 18.5196 11 18.2652 11 18C11 17.7348 10.8946 17.4804 10.7071 17.2929C10.5196 17.1054 10.2652 17 10 17Z"
                                  fill="var(--primary)"
                                />
                              </svg>
                            </div>
                            <div>
                              <h6 className="sub-title">Order ID #0012345</h6>
                              <ul className="item-status d-flex align-items-center">
                                <li className="me-2 text-soft">12 Items</li>
                                <li className="text-soft">On Delivery</li>
                              </ul>
                            </div>
                          </div>
                        </a>
                      </div>
                      <div
                        id="collapse2"
                        className="accordion-collapse collapse"
                        aria-labelledby="heading2"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body pb-0">
                          <ul className="p-2">
                            <li className="d-flex align-items-start mb-3">
                              <div className="me-3">
                                <svg
                                  width={14}
                                  height={14}
                                  viewBox="0 0 14 14"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <rect
                                    width={14}
                                    height={14}
                                    rx={7}
                                    fill="#027335"
                                  />
                                </svg>
                              </div>
                              <div>
                                <h6 className="sub-title mb-1">Order Placed</h6>
                                <span className="text-soft">
                                  January 19th, 12 : 02 AM
                                </span>
                              </div>
                            </li>
                            <li className="d-flex align-items-start mb-3">
                              <div className="me-3">
                                <svg
                                  width={14}
                                  height={14}
                                  viewBox="0 0 14 14"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <rect
                                    width={14}
                                    height={14}
                                    rx={7}
                                    fill="#027335"
                                  />
                                </svg>
                              </div>
                              <div>
                                <h6 className="sub-title mb-1">Order Confirmed</h6>
                                <span className="text-soft">
                                  January 19th, 12 : 02 AM
                                </span>
                              </div>
                            </li>
                            <li className="d-flex align-items-start mb-3">
                              <div className="me-3">
                                <svg
                                  width={14}
                                  height={14}
                                  viewBox="0 0 14 14"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <rect
                                    width={14}
                                    height={14}
                                    rx={7}
                                    fill="#027335"
                                  />
                                </svg>
                              </div>
                              <div>
                                <h6 className="sub-title mb-1">
                                  Your Order On Delivery by Courir
                                </h6>
                                <span className="text-soft">
                                  January 19th, 12 : 02 AM
                                </span>
                              </div>
                            </li>
                            <li className="d-flex align-items-start">
                              <div className="me-3">
                                <svg
                                  width={14}
                                  height={14}
                                  viewBox="0 0 14 14"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <rect
                                    width={14}
                                    height={14}
                                    rx={7}
                                    fill="#7D8FAB"
                                  />
                                </svg>
                              </div>
                              <div>
                                <h6 className="sub-title mb-1 text-soft">
                                  Order Delivered
                                </h6>
                                <span className="text-soft">
                                  January 19th, 12 : 02 AM
                                </span>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <div className="accordion-header" id="heading3">
                        <a
                          href="javascript:void(0);"
                          className="accordion-button collapsed"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapse3"
                          aria-expanded="true"
                          aria-controls="collapse3"
                        >
                          <div className="d-flex align-items-center">
                            <div className="icon-box bg-danger me-3">
                              <svg
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M20.929 1.628C20.8546 1.44247 20.7264 1.28347 20.5608 1.17153C20.3952 1.05959 20.1999 0.999847 20 1H4C3.80012 0.999847 3.60479 1.05959 3.43919 1.17153C3.2736 1.28347 3.14535 1.44247 3.071 1.628L1.071 6.628C1.02414 6.74643 1.00005 6.87264 1 7V22C1 22.2652 1.10536 22.5196 1.29289 22.7071C1.48043 22.8946 1.73478 23 2 23H22C22.2652 23 22.5196 22.8946 22.7071 22.7071C22.8946 22.5196 23 22.2652 23 22V7C23 6.87264 22.9759 6.74643 22.929 6.628L20.929 1.628ZM4.677 3H19.323L20.523 6H3.477L4.677 3ZM3 21V8H21V21H3Z"
                                  fill="var(--primary)"
                                />
                                <path
                                  d="M10 17H6C5.73478 17 5.48043 17.1054 5.29289 17.2929C5.10536 17.4804 5 17.7348 5 18C5 18.2652 5.10536 18.5196 5.29289 18.7071C5.48043 18.8947 5.73478 19 6 19H10C10.2652 19 10.5196 18.8947 10.7071 18.7071C10.8946 18.5196 11 18.2652 11 18C11 17.7348 10.8946 17.4804 10.7071 17.2929C10.5196 17.1054 10.2652 17 10 17Z"
                                  fill="var(--primary)"
                                />
                              </svg>
                            </div>
                            <div>
                              <h6 className="sub-title">Order ID #0012345</h6>
                              <ul className="item-status d-flex align-items-center">
                                <li className="me-2 text-soft">12 Items</li>
                                <li className="text-soft">On Delivery</li>
                              </ul>
                            </div>
                          </div>
                        </a>
                      </div>
                      <div
                        id="collapse3"
                        className="accordion-collapse collapse"
                        aria-labelledby="heading3"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body pb-0">
                          <ul className="p-2">
                            <li className="d-flex align-items-start mb-3">
                              <div className="me-3">
                                <svg
                                  width={14}
                                  height={14}
                                  viewBox="0 0 14 14"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <rect
                                    width={14}
                                    height={14}
                                    rx={7}
                                    fill="#027335"
                                  />
                                </svg>
                              </div>
                              <div>
                                <h6 className="sub-title mb-1">Order Placed</h6>
                                <span className="text-soft">
                                  January 19th, 12 : 02 AM
                                </span>
                              </div>
                            </li>
                            <li className="d-flex align-items-start mb-3">
                              <div className="me-3">
                                <svg
                                  width={14}
                                  height={14}
                                  viewBox="0 0 14 14"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <rect
                                    width={14}
                                    height={14}
                                    rx={7}
                                    fill="#027335"
                                  />
                                </svg>
                              </div>
                              <div>
                                <h6 className="sub-title mb-1">Order Confirmed</h6>
                                <span className="text-soft">
                                  January 19th, 12 : 02 AM
                                </span>
                              </div>
                            </li>
                            <li className="d-flex align-items-start mb-3">
                              <div className="me-3">
                                <svg
                                  width={14}
                                  height={14}
                                  viewBox="0 0 14 14"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <rect
                                    width={14}
                                    height={14}
                                    rx={7}
                                    fill="#027335"
                                  />
                                </svg>
                              </div>
                              <div>
                                <h6 className="sub-title mb-1">
                                  Your Order On Delivery by Courir
                                </h6>
                                <span className="text-soft">
                                  January 19th, 12 : 02 AM
                                </span>
                              </div>
                            </li>
                            <li className="d-flex align-items-start">
                              <div className="me-3">
                                <svg
                                  width={14}
                                  height={14}
                                  viewBox="0 0 14 14"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <rect
                                    width={14}
                                    height={14}
                                    rx={7}
                                    fill="#7D8FAB"
                                  />
                                </svg>
                              </div>
                              <div>
                                <h6 className="sub-title mb-1 text-soft">
                                  Order Delivered
                                </h6>
                                <span className="text-soft">
                                  January 19th, 12 : 02 AM
                                </span>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <div className="accordion-header" id="heading4">
                        <a
                          href="javascript:void(0);"
                          className="accordion-button collapsed"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapse4"
                          aria-expanded="true"
                          aria-controls="collapse4"
                        >
                          <div className="d-flex align-items-center">
                            <div className="icon-box bg-primary me-3">
                              <svg
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M20.929 1.628C20.8546 1.44247 20.7264 1.28347 20.5608 1.17153C20.3952 1.05959 20.1999 0.999847 20 1H4C3.80012 0.999847 3.60479 1.05959 3.43919 1.17153C3.2736 1.28347 3.14535 1.44247 3.071 1.628L1.071 6.628C1.02414 6.74643 1.00005 6.87264 1 7V22C1 22.2652 1.10536 22.5196 1.29289 22.7071C1.48043 22.8946 1.73478 23 2 23H22C22.2652 23 22.5196 22.8946 22.7071 22.7071C22.8946 22.5196 23 22.2652 23 22V7C23 6.87264 22.9759 6.74643 22.929 6.628L20.929 1.628ZM4.677 3H19.323L20.523 6H3.477L4.677 3ZM3 21V8H21V21H3Z"
                                  fill="var(--primary)"
                                />
                                <path
                                  d="M10 17H6C5.73478 17 5.48043 17.1054 5.29289 17.2929C5.10536 17.4804 5 17.7348 5 18C5 18.2652 5.10536 18.5196 5.29289 18.7071C5.48043 18.8947 5.73478 19 6 19H10C10.2652 19 10.5196 18.8947 10.7071 18.7071C10.8946 18.5196 11 18.2652 11 18C11 17.7348 10.8946 17.4804 10.7071 17.2929C10.5196 17.1054 10.2652 17 10 17Z"
                                  fill="var(--primary)"
                                />
                              </svg>
                            </div>
                            <div>
                              <h6 className="sub-title">Order ID #0012345</h6>
                              <ul className="item-status d-flex align-items-center">
                                <li className="me-2 text-soft">12 Items</li>
                                <li className="text-soft">On Delivery</li>
                              </ul>
                            </div>
                          </div>
                        </a>
                      </div>
                      <div
                        id="collapse4"
                        className="accordion-collapse collapse"
                        aria-labelledby="heading4"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body pb-0">
                          <ul className="p-2">
                            <li className="d-flex align-items-start mb-3">
                              <div className="me-3">
                                <svg
                                  width={14}
                                  height={14}
                                  viewBox="0 0 14 14"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <rect
                                    width={14}
                                    height={14}
                                    rx={7}
                                    fill="#027335"
                                  />
                                </svg>
                              </div>
                              <div>
                                <h6 className="sub-title mb-1">Order Placed</h6>
                                <span className="text-soft">
                                  January 19th, 12 : 02 AM
                                </span>
                              </div>
                            </li>
                            <li className="d-flex align-items-start mb-3">
                              <div className="me-3">
                                <svg
                                  width={14}
                                  height={14}
                                  viewBox="0 0 14 14"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <rect
                                    width={14}
                                    height={14}
                                    rx={7}
                                    fill="#027335"
                                  />
                                </svg>
                              </div>
                              <div>
                                <h6 className="sub-title mb-1">Order Confirmed</h6>
                                <span className="text-soft">
                                  January 19th, 12 : 02 AM
                                </span>
                              </div>
                            </li>
                            <li className="d-flex align-items-start mb-3">
                              <div className="me-3">
                                <svg
                                  width={14}
                                  height={14}
                                  viewBox="0 0 14 14"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <rect
                                    width={14}
                                    height={14}
                                    rx={7}
                                    fill="#027335"
                                  />
                                </svg>
                              </div>
                              <div>
                                <h6 className="sub-title mb-1">
                                  Your Order On Delivery by Courir
                                </h6>
                                <span className="text-soft">
                                  January 19th, 12 : 02 AM
                                </span>
                              </div>
                            </li>
                            <li className="d-flex align-items-start">
                              <div className="me-3">
                                <svg
                                  width={14}
                                  height={14}
                                  viewBox="0 0 14 14"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <rect
                                    width={14}
                                    height={14}
                                    rx={7}
                                    fill="#7D8FAB"
                                  />
                                </svg>
                              </div>
                              <div>
                                <h6 className="sub-title mb-1 text-soft">
                                  Order Delivered
                                </h6>
                                <span className="text-soft">
                                  January 19th, 12 : 02 AM
                                </span>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="completed-tab-pane"
                  role="tabpanel"
                  aria-labelledby="completed-tab"
                  tabIndex={0}
                >
                  <div className="accordion style-3" id="accordionExample3">
                    <div className="accordion-item">
                      <div className="accordion-header" id="heading9">
                        <a
                          href="javascript:void(0);"
                          className="accordion-button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapse9"
                          aria-expanded="true"
                          aria-controls="collapse9"
                        >
                          <div className="d-flex align-items-center">
                            <div className="icon-box me-3">
                              <svg
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M20.929 1.628C20.8546 1.44247 20.7264 1.28347 20.5608 1.17153C20.3952 1.05959 20.1999 0.999847 20 1H4C3.80012 0.999847 3.60479 1.05959 3.43919 1.17153C3.2736 1.28347 3.14535 1.44247 3.071 1.628L1.071 6.628C1.02414 6.74643 1.00005 6.87264 1 7V22C1 22.2652 1.10536 22.5196 1.29289 22.7071C1.48043 22.8946 1.73478 23 2 23H22C22.2652 23 22.5196 22.8946 22.7071 22.7071C22.8946 22.5196 23 22.2652 23 22V7C23 6.87264 22.9759 6.74643 22.929 6.628L20.929 1.628ZM4.677 3H19.323L20.523 6H3.477L4.677 3ZM3 21V8H21V21H3Z"
                                  fill="#FFA902"
                                />
                                <path
                                  d="M10 17H6C5.73478 17 5.48043 17.1054 5.29289 17.2929C5.10536 17.4804 5 17.7348 5 18C5 18.2652 5.10536 18.5196 5.29289 18.7071C5.48043 18.8947 5.73478 19 6 19H10C10.2652 19 10.5196 18.8947 10.7071 18.7071C10.8946 18.5196 11 18.2652 11 18C11 17.7348 10.8946 17.4804 10.7071 17.2929C10.5196 17.1054 10.2652 17 10 17Z"
                                  fill="#FFA902"
                                />
                              </svg>
                            </div>
                            <div>
                              <h6 className="sub-title">Order ID #0012345</h6>
                              <ul className="item-status d-flex align-items-center">
                                <li className="me-2 text-soft">12 Items</li>
                                <li className="text-soft">On Delivery</li>
                              </ul>
                            </div>
                          </div>
                        </a>
                      </div>
                      <div
                        id="collapse9"
                        className="accordion-collapse collapse show"
                        aria-labelledby="heading9"
                        data-bs-parent="#accordionExample3"
                      >
                        <div className="accordion-body pb-0">
                          <ul className="p-2">
                            <li className="d-flex align-items-start mb-3">
                              <div className="me-3">
                                <svg
                                  width={14}
                                  height={14}
                                  viewBox="0 0 14 14"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <rect
                                    width={14}
                                    height={14}
                                    rx={7}
                                    fill="#027335"
                                  />
                                </svg>
                              </div>
                              <div>
                                <h6 className="sub-title mb-1">Order Placed</h6>
                                <span className="text-soft">
                                  January 19th, 12 : 02 AM
                                </span>
                              </div>
                            </li>
                            <li className="d-flex align-items-start mb-3">
                              <div className="me-3">
                                <svg
                                  width={14}
                                  height={14}
                                  viewBox="0 0 14 14"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <rect
                                    width={14}
                                    height={14}
                                    rx={7}
                                    fill="#027335"
                                  />
                                </svg>
                              </div>
                              <div>
                                <h6 className="sub-title mb-1">Order Confirmed</h6>
                                <span className="text-soft">
                                  January 19th, 12 : 02 AM
                                </span>
                              </div>
                            </li>
                            <li className="d-flex align-items-start mb-3">
                              <div className="me-3">
                                <svg
                                  width={14}
                                  height={14}
                                  viewBox="0 0 14 14"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <rect
                                    width={14}
                                    height={14}
                                    rx={7}
                                    fill="#027335"
                                  />
                                </svg>
                              </div>
                              <div>
                                <h6 className="sub-title mb-1">
                                  Your Order On Delivery by Courir
                                </h6>
                                <span className="text-soft">
                                  January 19th, 12 : 02 AM
                                </span>
                              </div>
                            </li>
                            <li className="d-flex align-items-start">
                              <div className="me-3">
                                <svg
                                  width={14}
                                  height={14}
                                  viewBox="0 0 14 14"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <rect
                                    width={14}
                                    height={14}
                                    rx={7}
                                    fill="#7D8FAB"
                                  />
                                </svg>
                              </div>
                              <div>
                                <h6 className="sub-title mb-1 text-soft">
                                  Order Delivered
                                </h6>
                                <span className="text-soft">
                                  January 19th, 12 : 02 AM
                                </span>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <div className="accordion-header" id="heading10">
                        <a
                          href="javascript:void(0);"
                          className="accordion-button collapsed"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapse10"
                          aria-expanded="true"
                          aria-controls="collapse10"
                        >
                          <div className="d-flex align-items-center">
                            <div className="icon-box bg-primary me-3">
                              <svg
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M20.929 1.628C20.8546 1.44247 20.7264 1.28347 20.5608 1.17153C20.3952 1.05959 20.1999 0.999847 20 1H4C3.80012 0.999847 3.60479 1.05959 3.43919 1.17153C3.2736 1.28347 3.14535 1.44247 3.071 1.628L1.071 6.628C1.02414 6.74643 1.00005 6.87264 1 7V22C1 22.2652 1.10536 22.5196 1.29289 22.7071C1.48043 22.8946 1.73478 23 2 23H22C22.2652 23 22.5196 22.8946 22.7071 22.7071C22.8946 22.5196 23 22.2652 23 22V7C23 6.87264 22.9759 6.74643 22.929 6.628L20.929 1.628ZM4.677 3H19.323L20.523 6H3.477L4.677 3ZM3 21V8H21V21H3Z"
                                  fill="var(--primary)"
                                />
                                <path
                                  d="M10 17H6C5.73478 17 5.48043 17.1054 5.29289 17.2929C5.10536 17.4804 5 17.7348 5 18C5 18.2652 5.10536 18.5196 5.29289 18.7071C5.48043 18.8947 5.73478 19 6 19H10C10.2652 19 10.5196 18.8947 10.7071 18.7071C10.8946 18.5196 11 18.2652 11 18C11 17.7348 10.8946 17.4804 10.7071 17.2929C10.5196 17.1054 10.2652 17 10 17Z"
                                  fill="var(--primary)"
                                />
                              </svg>
                            </div>
                            <div>
                              <h6 className="sub-title">Order ID #0012345</h6>
                              <ul className="item-status d-flex align-items-center">
                                <li className="me-2 text-soft">12 Items</li>
                                <li className="text-soft">On Delivery</li>
                              </ul>
                            </div>
                          </div>
                        </a>
                      </div>
                      <div
                        id="collapse10"
                        className="accordion-collapse collapse"
                        aria-labelledby="heading10"
                        data-bs-parent="#accordionExample3"
                      >
                        <div className="accordion-body pb-0">
                          <ul className="p-2">
                            <li className="d-flex align-items-start mb-3">
                              <div className="me-3">
                                <svg
                                  width={14}
                                  height={14}
                                  viewBox="0 0 14 14"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <rect
                                    width={14}
                                    height={14}
                                    rx={7}
                                    fill="#027335"
                                  />
                                </svg>
                              </div>
                              <div>
                                <h6 className="sub-title mb-1">Order Placed</h6>
                                <span className="text-soft">
                                  January 19th, 12 : 02 AM
                                </span>
                              </div>
                            </li>
                            <li className="d-flex align-items-start mb-3">
                              <div className="me-3">
                                <svg
                                  width={14}
                                  height={14}
                                  viewBox="0 0 14 14"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <rect
                                    width={14}
                                    height={14}
                                    rx={7}
                                    fill="#027335"
                                  />
                                </svg>
                              </div>
                              <div>
                                <h6 className="sub-title mb-1">Order Confirmed</h6>
                                <span className="text-soft">
                                  January 19th, 12 : 02 AM
                                </span>
                              </div>
                            </li>
                            <li className="d-flex align-items-start mb-3">
                              <div className="me-3">
                                <svg
                                  width={14}
                                  height={14}
                                  viewBox="0 0 14 14"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <rect
                                    width={14}
                                    height={14}
                                    rx={7}
                                    fill="#027335"
                                  />
                                </svg>
                              </div>
                              <div>
                                <h6 className="sub-title mb-1">
                                  Your Order On Delivery by Courir
                                </h6>
                                <span className="text-soft">
                                  January 19th, 12 : 02 AM
                                </span>
                              </div>
                            </li>
                            <li className="d-flex align-items-start">
                              <div className="me-3">
                                <svg
                                  width={14}
                                  height={14}
                                  viewBox="0 0 14 14"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <rect
                                    width={14}
                                    height={14}
                                    rx={7}
                                    fill="#7D8FAB"
                                  />
                                </svg>
                              </div>
                              <div>
                                <h6 className="sub-title mb-1 text-soft">
                                  Order Delivered
                                </h6>
                                <span className="text-soft">
                                  January 19th, 12 : 02 AM
                                </span>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <div className="accordion-header" id="heading11">
                        <a
                          href="javascript:void(0);"
                          className="accordion-button collapsed"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapse11"
                          aria-expanded="true"
                          aria-controls="collapse11"
                        >
                          <div className="d-flex align-items-center">
                            <div className="icon-box bg-danger me-3">
                              <svg
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M20.929 1.628C20.8546 1.44247 20.7264 1.28347 20.5608 1.17153C20.3952 1.05959 20.1999 0.999847 20 1H4C3.80012 0.999847 3.60479 1.05959 3.43919 1.17153C3.2736 1.28347 3.14535 1.44247 3.071 1.628L1.071 6.628C1.02414 6.74643 1.00005 6.87264 1 7V22C1 22.2652 1.10536 22.5196 1.29289 22.7071C1.48043 22.8946 1.73478 23 2 23H22C22.2652 23 22.5196 22.8946 22.7071 22.7071C22.8946 22.5196 23 22.2652 23 22V7C23 6.87264 22.9759 6.74643 22.929 6.628L20.929 1.628ZM4.677 3H19.323L20.523 6H3.477L4.677 3ZM3 21V8H21V21H3Z"
                                  fill="var(--primary)"
                                />
                                <path
                                  d="M10 17H6C5.73478 17 5.48043 17.1054 5.29289 17.2929C5.10536 17.4804 5 17.7348 5 18C5 18.2652 5.10536 18.5196 5.29289 18.7071C5.48043 18.8947 5.73478 19 6 19H10C10.2652 19 10.5196 18.8947 10.7071 18.7071C10.8946 18.5196 11 18.2652 11 18C11 17.7348 10.8946 17.4804 10.7071 17.2929C10.5196 17.1054 10.2652 17 10 17Z"
                                  fill="var(--primary)"
                                />
                              </svg>
                            </div>
                            <div>
                              <h6 className="sub-title">Order ID #0012345</h6>
                              <ul className="item-status d-flex align-items-center">
                                <li className="me-2 text-soft">12 Items</li>
                                <li className="text-soft">On Delivery</li>
                              </ul>
                            </div>
                          </div>
                        </a>
                      </div>
                      <div
                        id="collapse11"
                        className="accordion-collapse collapse"
                        aria-labelledby="heading11"
                        data-bs-parent="#accordionExample3"
                      >
                        <div className="accordion-body pb-0">
                          <ul className="p-2">
                            <li className="d-flex align-items-start mb-3">
                              <div className="me-3">
                                <svg
                                  width={14}
                                  height={14}
                                  viewBox="0 0 14 14"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <rect
                                    width={14}
                                    height={14}
                                    rx={7}
                                    fill="#027335"
                                  />
                                </svg>
                              </div>
                              <div>
                                <h6 className="sub-title mb-1">Order Placed</h6>
                                <span className="text-soft">
                                  January 19th, 12 : 02 AM
                                </span>
                              </div>
                            </li>
                            <li className="d-flex align-items-start mb-3">
                              <div className="me-3">
                                <svg
                                  width={14}
                                  height={14}
                                  viewBox="0 0 14 14"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <rect
                                    width={14}
                                    height={14}
                                    rx={7}
                                    fill="#027335"
                                  />
                                </svg>
                              </div>
                              <div>
                                <h6 className="sub-title mb-1">Order Confirmed</h6>
                                <span className="text-soft">
                                  January 19th, 12 : 02 AM
                                </span>
                              </div>
                            </li>
                            <li className="d-flex align-items-start mb-3">
                              <div className="me-3">
                                <svg
                                  width={14}
                                  height={14}
                                  viewBox="0 0 14 14"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <rect
                                    width={14}
                                    height={14}
                                    rx={7}
                                    fill="#027335"
                                  />
                                </svg>
                              </div>
                              <div>
                                <h6 className="sub-title mb-1">
                                  Your Order On Delivery by Courir
                                </h6>
                                <span className="text-soft">
                                  January 19th, 12 : 02 AM
                                </span>
                              </div>
                            </li>
                            <li className="d-flex align-items-start">
                              <div className="me-3">
                                <svg
                                  width={14}
                                  height={14}
                                  viewBox="0 0 14 14"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <rect
                                    width={14}
                                    height={14}
                                    rx={7}
                                    fill="#7D8FAB"
                                  />
                                </svg>
                              </div>
                              <div>
                                <h6 className="sub-title mb-1 text-soft">
                                  Order Delivered
                                </h6>
                                <span className="text-soft">
                                  January 19th, 12 : 02 AM
                                </span>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <div className="accordion-header" id="heading12">
                        <a
                          href="javascript:void(0);"
                          className="accordion-button collapsed"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapse12"
                          aria-expanded="true"
                          aria-controls="collapse12"
                        >
                          <div className="d-flex align-items-center">
                            <div className="icon-box bg-primary me-3">
                              <svg
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M20.929 1.628C20.8546 1.44247 20.7264 1.28347 20.5608 1.17153C20.3952 1.05959 20.1999 0.999847 20 1H4C3.80012 0.999847 3.60479 1.05959 3.43919 1.17153C3.2736 1.28347 3.14535 1.44247 3.071 1.628L1.071 6.628C1.02414 6.74643 1.00005 6.87264 1 7V22C1 22.2652 1.10536 22.5196 1.29289 22.7071C1.48043 22.8946 1.73478 23 2 23H22C22.2652 23 22.5196 22.8946 22.7071 22.7071C22.8946 22.5196 23 22.2652 23 22V7C23 6.87264 22.9759 6.74643 22.929 6.628L20.929 1.628ZM4.677 3H19.323L20.523 6H3.477L4.677 3ZM3 21V8H21V21H3Z"
                                  fill="var(--primary)"
                                />
                                <path
                                  d="M10 17H6C5.73478 17 5.48043 17.1054 5.29289 17.2929C5.10536 17.4804 5 17.7348 5 18C5 18.2652 5.10536 18.5196 5.29289 18.7071C5.48043 18.8947 5.73478 19 6 19H10C10.2652 19 10.5196 18.8947 10.7071 18.7071C10.8946 18.5196 11 18.2652 11 18C11 17.7348 10.8946 17.4804 10.7071 17.2929C10.5196 17.1054 10.2652 17 10 17Z"
                                  fill="var(--primary)"
                                />
                              </svg>
                            </div>
                            <div>
                              <h6 className="sub-title">Order ID #0012345</h6>
                              <ul className="item-status d-flex align-items-center">
                                <li className="me-2 text-soft">12 Items</li>
                                <li className="text-soft">On Delivery</li>
                              </ul>
                            </div>
                          </div>
                        </a>
                      </div>
                      <div
                        id="collapse12"
                        className="accordion-collapse collapse"
                        aria-labelledby="heading12"
                        data-bs-parent="#accordionExample3"
                      >
                        <div className="accordion-body pb-0">
                          <ul className="p-2">
                            <li className="d-flex align-items-start mb-3">
                              <div className="me-3">
                                <svg
                                  width={14}
                                  height={14}
                                  viewBox="0 0 14 14"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <rect
                                    width={14}
                                    height={14}
                                    rx={7}
                                    fill="#027335"
                                  />
                                </svg>
                              </div>
                              <div>
                                <h6 className="sub-title mb-1">Order Placed</h6>
                                <span className="text-soft">
                                  January 19th, 12 : 02 AM
                                </span>
                              </div>
                            </li>
                            <li className="d-flex align-items-start mb-3">
                              <div className="me-3">
                                <svg
                                  width={14}
                                  height={14}
                                  viewBox="0 0 14 14"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <rect
                                    width={14}
                                    height={14}
                                    rx={7}
                                    fill="#027335"
                                  />
                                </svg>
                              </div>
                              <div>
                                <h6 className="sub-title mb-1">Order Confirmed</h6>
                                <span className="text-soft">
                                  January 19th, 12 : 02 AM
                                </span>
                              </div>
                            </li>
                            <li className="d-flex align-items-start mb-3">
                              <div className="me-3">
                                <svg
                                  width={14}
                                  height={14}
                                  viewBox="0 0 14 14"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <rect
                                    width={14}
                                    height={14}
                                    rx={7}
                                    fill="#027335"
                                  />
                                </svg>
                              </div>
                              <div>
                                <h6 className="sub-title mb-1">
                                  Your Order On Delivery by Courir
                                </h6>
                                <span className="text-soft">
                                  January 19th, 12 : 02 AM
                                </span>
                              </div>
                            </li>
                            <li className="d-flex align-items-start">
                              <div className="me-3">
                                <svg
                                  width={14}
                                  height={14}
                                  viewBox="0 0 14 14"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <rect
                                    width={14}
                                    height={14}
                                    rx={7}
                                    fill="#7D8FAB"
                                  />
                                </svg>
                              </div>
                              <div>
                                <h6 className="sub-title mb-1 text-soft">
                                  Order Delivered
                                </h6>
                                <span className="text-soft">
                                  January 19th, 12 : 02 AM
                                </span>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="cancelled-tab-pane"
                  role="tabpanel"
                  aria-labelledby="cancelled-tab"
                  tabIndex={0}
                >
                  <div className="accordion style-3" id="accordionExample2">
                    <div className="accordion-item">
                      <div className="accordion-header" id="heading5">
                        <a
                          href="javascript:void(0);"
                          className="accordion-button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapse5"
                          aria-expanded="true"
                          aria-controls="collapse5"
                        >
                          <div className="d-flex align-items-center">
                            <div className="icon-box me-3">
                              <svg
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M20.929 1.628C20.8546 1.44247 20.7264 1.28347 20.5608 1.17153C20.3952 1.05959 20.1999 0.999847 20 1H4C3.80012 0.999847 3.60479 1.05959 3.43919 1.17153C3.2736 1.28347 3.14535 1.44247 3.071 1.628L1.071 6.628C1.02414 6.74643 1.00005 6.87264 1 7V22C1 22.2652 1.10536 22.5196 1.29289 22.7071C1.48043 22.8946 1.73478 23 2 23H22C22.2652 23 22.5196 22.8946 22.7071 22.7071C22.8946 22.5196 23 22.2652 23 22V7C23 6.87264 22.9759 6.74643 22.929 6.628L20.929 1.628ZM4.677 3H19.323L20.523 6H3.477L4.677 3ZM3 21V8H21V21H3Z"
                                  fill="#FFA902"
                                />
                                <path
                                  d="M10 17H6C5.73478 17 5.48043 17.1054 5.29289 17.2929C5.10536 17.4804 5 17.7348 5 18C5 18.2652 5.10536 18.5196 5.29289 18.7071C5.48043 18.8947 5.73478 19 6 19H10C10.2652 19 10.5196 18.8947 10.7071 18.7071C10.8946 18.5196 11 18.2652 11 18C11 17.7348 10.8946 17.4804 10.7071 17.2929C10.5196 17.1054 10.2652 17 10 17Z"
                                  fill="#FFA902"
                                />
                              </svg>
                            </div>
                            <div>
                              <h6 className="sub-title">Order ID #0012345</h6>
                              <ul className="item-status d-flex align-items-center">
                                <li className="me-2 text-soft">12 Items</li>
                                <li className="text-soft">On Delivery</li>
                              </ul>
                            </div>
                          </div>
                        </a>
                      </div>
                      <div
                        id="collapse5"
                        className="accordion-collapse collapse show"
                        aria-labelledby="heading5"
                        data-bs-parent="#accordionExample2"
                      >
                        <div className="accordion-body pb-0">
                          <ul className="p-2">
                            <li className="d-flex align-items-start mb-3">
                              <div className="me-3">
                                <svg
                                  width={14}
                                  height={14}
                                  viewBox="0 0 14 14"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <rect
                                    width={14}
                                    height={14}
                                    rx={7}
                                    fill="#027335"
                                  />
                                </svg>
                              </div>
                              <div>
                                <h6 className="sub-title mb-1">Order Placed</h6>
                                <span className="text-soft">
                                  January 19th, 12 : 02 AM
                                </span>
                              </div>
                            </li>
                            <li className="d-flex align-items-start mb-3">
                              <div className="me-3">
                                <svg
                                  width={14}
                                  height={14}
                                  viewBox="0 0 14 14"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <rect
                                    width={14}
                                    height={14}
                                    rx={7}
                                    fill="#027335"
                                  />
                                </svg>
                              </div>
                              <div>
                                <h6 className="sub-title mb-1">Order Confirmed</h6>
                                <span className="text-soft">
                                  January 19th, 12 : 02 AM
                                </span>
                              </div>
                            </li>
                            <li className="d-flex align-items-start mb-3">
                              <div className="me-3">
                                <svg
                                  width={14}
                                  height={14}
                                  viewBox="0 0 14 14"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <rect
                                    width={14}
                                    height={14}
                                    rx={7}
                                    fill="#027335"
                                  />
                                </svg>
                              </div>
                              <div>
                                <h6 className="sub-title mb-1">
                                  Your Order On Delivery by Courir
                                </h6>
                                <span className="text-soft">
                                  January 19th, 12 : 02 AM
                                </span>
                              </div>
                            </li>
                            <li className="d-flex align-items-start">
                              <div className="me-3">
                                <svg
                                  width={14}
                                  height={14}
                                  viewBox="0 0 14 14"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <rect
                                    width={14}
                                    height={14}
                                    rx={7}
                                    fill="#7D8FAB"
                                  />
                                </svg>
                              </div>
                              <div>
                                <h6 className="sub-title mb-1 text-soft">
                                  Order Delivered
                                </h6>
                                <span className="text-soft">
                                  January 19th, 12 : 02 AM
                                </span>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <div className="accordion-header" id="heading6">
                        <a
                          href="javascript:void(0);"
                          className="accordion-button collapsed"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapse6"
                          aria-expanded="true"
                          aria-controls="collapse6"
                        >
                          <div className="d-flex align-items-center">
                            <div className="icon-box bg-primary me-3">
                              <svg
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M20.929 1.628C20.8546 1.44247 20.7264 1.28347 20.5608 1.17153C20.3952 1.05959 20.1999 0.999847 20 1H4C3.80012 0.999847 3.60479 1.05959 3.43919 1.17153C3.2736 1.28347 3.14535 1.44247 3.071 1.628L1.071 6.628C1.02414 6.74643 1.00005 6.87264 1 7V22C1 22.2652 1.10536 22.5196 1.29289 22.7071C1.48043 22.8946 1.73478 23 2 23H22C22.2652 23 22.5196 22.8946 22.7071 22.7071C22.8946 22.5196 23 22.2652 23 22V7C23 6.87264 22.9759 6.74643 22.929 6.628L20.929 1.628ZM4.677 3H19.323L20.523 6H3.477L4.677 3ZM3 21V8H21V21H3Z"
                                  fill="var(--primary)"
                                />
                                <path
                                  d="M10 17H6C5.73478 17 5.48043 17.1054 5.29289 17.2929C5.10536 17.4804 5 17.7348 5 18C5 18.2652 5.10536 18.5196 5.29289 18.7071C5.48043 18.8947 5.73478 19 6 19H10C10.2652 19 10.5196 18.8947 10.7071 18.7071C10.8946 18.5196 11 18.2652 11 18C11 17.7348 10.8946 17.4804 10.7071 17.2929C10.5196 17.1054 10.2652 17 10 17Z"
                                  fill="var(--primary)"
                                />
                              </svg>
                            </div>
                            <div>
                              <h6 className="sub-title">Order ID #0012345</h6>
                              <ul className="item-status d-flex align-items-center">
                                <li className="me-2 text-soft">12 Items</li>
                                <li className="text-soft">On Delivery</li>
                              </ul>
                            </div>
                          </div>
                        </a>
                      </div>
                      <div
                        id="collapse6"
                        className="accordion-collapse collapse"
                        aria-labelledby="heading6"
                        data-bs-parent="#accordionExample2"
                      >
                        <div className="accordion-body pb-0">
                          <ul className="p-2">
                            <li className="d-flex align-items-start mb-3">
                              <div className="me-3">
                                <svg
                                  width={14}
                                  height={14}
                                  viewBox="0 0 14 14"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <rect
                                    width={14}
                                    height={14}
                                    rx={7}
                                    fill="#027335"
                                  />
                                </svg>
                              </div>
                              <div>
                                <h6 className="sub-title mb-1">Order Placed</h6>
                                <span className="text-soft">
                                  January 19th, 12 : 02 AM
                                </span>
                              </div>
                            </li>
                            <li className="d-flex align-items-start mb-3">
                              <div className="me-3">
                                <svg
                                  width={14}
                                  height={14}
                                  viewBox="0 0 14 14"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <rect
                                    width={14}
                                    height={14}
                                    rx={7}
                                    fill="#027335"
                                  />
                                </svg>
                              </div>
                              <div>
                                <h6 className="sub-title mb-1">Order Confirmed</h6>
                                <span className="text-soft">
                                  January 19th, 12 : 02 AM
                                </span>
                              </div>
                            </li>
                            <li className="d-flex align-items-start mb-3">
                              <div className="me-3">
                                <svg
                                  width={14}
                                  height={14}
                                  viewBox="0 0 14 14"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <rect
                                    width={14}
                                    height={14}
                                    rx={7}
                                    fill="#027335"
                                  />
                                </svg>
                              </div>
                              <div>
                                <h6 className="sub-title mb-1">
                                  Your Order On Delivery by Courir
                                </h6>
                                <span className="text-soft">
                                  January 19th, 12 : 02 AM
                                </span>
                              </div>
                            </li>
                            <li className="d-flex align-items-start">
                              <div className="me-3">
                                <svg
                                  width={14}
                                  height={14}
                                  viewBox="0 0 14 14"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <rect
                                    width={14}
                                    height={14}
                                    rx={7}
                                    fill="#7D8FAB"
                                  />
                                </svg>
                              </div>
                              <div>
                                <h6 className="sub-title mb-1 text-soft">
                                  Order Delivered
                                </h6>
                                <span className="text-soft">
                                  January 19th, 12 : 02 AM
                                </span>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <div className="accordion-header" id="heading7">
                        <a
                          href="javascript:void(0);"
                          className="accordion-button collapsed"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapse7"
                          aria-expanded="true"
                          aria-controls="collapse7"
                        >
                          <div className="d-flex align-items-center">
                            <div className="icon-box bg-danger me-3">
                              <svg
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M20.929 1.628C20.8546 1.44247 20.7264 1.28347 20.5608 1.17153C20.3952 1.05959 20.1999 0.999847 20 1H4C3.80012 0.999847 3.60479 1.05959 3.43919 1.17153C3.2736 1.28347 3.14535 1.44247 3.071 1.628L1.071 6.628C1.02414 6.74643 1.00005 6.87264 1 7V22C1 22.2652 1.10536 22.5196 1.29289 22.7071C1.48043 22.8946 1.73478 23 2 23H22C22.2652 23 22.5196 22.8946 22.7071 22.7071C22.8946 22.5196 23 22.2652 23 22V7C23 6.87264 22.9759 6.74643 22.929 6.628L20.929 1.628ZM4.677 3H19.323L20.523 6H3.477L4.677 3ZM3 21V8H21V21H3Z"
                                  fill="var(--primary)"
                                />
                                <path
                                  d="M10 17H6C5.73478 17 5.48043 17.1054 5.29289 17.2929C5.10536 17.4804 5 17.7348 5 18C5 18.2652 5.10536 18.5196 5.29289 18.7071C5.48043 18.8947 5.73478 19 6 19H10C10.2652 19 10.5196 18.8947 10.7071 18.7071C10.8946 18.5196 11 18.2652 11 18C11 17.7348 10.8946 17.4804 10.7071 17.2929C10.5196 17.1054 10.2652 17 10 17Z"
                                  fill="var(--primary)"
                                />
                              </svg>
                            </div>
                            <div>
                              <h6 className="sub-title">Order ID #0012345</h6>
                              <ul className="item-status d-flex align-items-center">
                                <li className="me-2 text-soft">12 Items</li>
                                <li className="text-soft">On Delivery</li>
                              </ul>
                            </div>
                          </div>
                        </a>
                      </div>
                      <div
                        id="collapse7"
                        className="accordion-collapse collapse"
                        aria-labelledby="heading7"
                        data-bs-parent="#accordionExample2"
                      >
                        <div className="accordion-body pb-0">
                          <ul className="p-2">
                            <li className="d-flex align-items-start mb-3">
                              <div className="me-3">
                                <svg
                                  width={14}
                                  height={14}
                                  viewBox="0 0 14 14"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <rect
                                    width={14}
                                    height={14}
                                    rx={7}
                                    fill="#027335"
                                  />
                                </svg>
                              </div>
                              <div>
                                <h6 className="sub-title mb-1">Order Placed</h6>
                                <span className="text-soft">
                                  January 19th, 12 : 02 AM
                                </span>
                              </div>
                            </li>
                            <li className="d-flex align-items-start mb-3">
                              <div className="me-3">
                                <svg
                                  width={14}
                                  height={14}
                                  viewBox="0 0 14 14"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <rect
                                    width={14}
                                    height={14}
                                    rx={7}
                                    fill="#027335"
                                  />
                                </svg>
                              </div>
                              <div>
                                <h6 className="sub-title mb-1">Order Confirmed</h6>
                                <span className="text-soft">
                                  January 19th, 12 : 02 AM
                                </span>
                              </div>
                            </li>
                            <li className="d-flex align-items-start mb-3">
                              <div className="me-3">
                                <svg
                                  width={14}
                                  height={14}
                                  viewBox="0 0 14 14"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <rect
                                    width={14}
                                    height={14}
                                    rx={7}
                                    fill="#027335"
                                  />
                                </svg>
                              </div>
                              <div>
                                <h6 className="sub-title mb-1">
                                  Your Order On Delivery by Courir
                                </h6>
                                <span className="text-soft">
                                  January 19th, 12 : 02 AM
                                </span>
                              </div>
                            </li>
                            <li className="d-flex align-items-start">
                              <div className="me-3">
                                <svg
                                  width={14}
                                  height={14}
                                  viewBox="0 0 14 14"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <rect
                                    width={14}
                                    height={14}
                                    rx={7}
                                    fill="#7D8FAB"
                                  />
                                </svg>
                              </div>
                              <div>
                                <h6 className="sub-title mb-1 text-soft">
                                  Order Delivered
                                </h6>
                                <span className="text-soft">
                                  January 19th, 12 : 02 AM
                                </span>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <div className="accordion-header" id="heading8">
                        <a
                          href="javascript:void(0);"
                          className="accordion-button collapsed"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapse8"
                          aria-expanded="true"
                          aria-controls="collapse8"
                        >
                          <div className="d-flex align-items-center">
                            <div className="icon-box bg-primary me-3">
                              <svg
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M20.929 1.628C20.8546 1.44247 20.7264 1.28347 20.5608 1.17153C20.3952 1.05959 20.1999 0.999847 20 1H4C3.80012 0.999847 3.60479 1.05959 3.43919 1.17153C3.2736 1.28347 3.14535 1.44247 3.071 1.628L1.071 6.628C1.02414 6.74643 1.00005 6.87264 1 7V22C1 22.2652 1.10536 22.5196 1.29289 22.7071C1.48043 22.8946 1.73478 23 2 23H22C22.2652 23 22.5196 22.8946 22.7071 22.7071C22.8946 22.5196 23 22.2652 23 22V7C23 6.87264 22.9759 6.74643 22.929 6.628L20.929 1.628ZM4.677 3H19.323L20.523 6H3.477L4.677 3ZM3 21V8H21V21H3Z"
                                  fill="var(--primary)"
                                />
                                <path
                                  d="M10 17H6C5.73478 17 5.48043 17.1054 5.29289 17.2929C5.10536 17.4804 5 17.7348 5 18C5 18.2652 5.10536 18.5196 5.29289 18.7071C5.48043 18.8947 5.73478 19 6 19H10C10.2652 19 10.5196 18.8947 10.7071 18.7071C10.8946 18.5196 11 18.2652 11 18C11 17.7348 10.8946 17.4804 10.7071 17.2929C10.5196 17.1054 10.2652 17 10 17Z"
                                  fill="var(--primary)"
                                />
                              </svg>
                            </div>
                            <div>
                              <h6 className="sub-title">Order ID #0012345</h6>
                              <ul className="item-status d-flex align-items-center">
                                <li className="me-2 text-soft">12 Items</li>
                                <li className="text-soft">On Delivery</li>
                              </ul>
                            </div>
                          </div>
                        </a>
                      </div>
                      <div
                        id="collapse8"
                        className="accordion-collapse collapse"
                        aria-labelledby="heading8"
                        data-bs-parent="#accordionExample2"
                      >
                        <div className="accordion-body pb-0">
                          <ul className="p-2">
                            <li className="d-flex align-items-start mb-3">
                              <div className="me-3">
                                <svg
                                  width={14}
                                  height={14}
                                  viewBox="0 0 14 14"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <rect
                                    width={14}
                                    height={14}
                                    rx={7}
                                    fill="#027335"
                                  />
                                </svg>
                              </div>
                              <div>
                                <h6 className="sub-title mb-1">Order Placed</h6>
                                <span className="text-soft">
                                  January 19th, 12 : 02 AM
                                </span>
                              </div>
                            </li>
                            <li className="d-flex align-items-start mb-3">
                              <div className="me-3">
                                <svg
                                  width={14}
                                  height={14}
                                  viewBox="0 0 14 14"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <rect
                                    width={14}
                                    height={14}
                                    rx={7}
                                    fill="#027335"
                                  />
                                </svg>
                              </div>
                              <div>
                                <h6 className="sub-title mb-1">Order Confirmed</h6>
                                <span className="text-soft">
                                  January 19th, 12 : 02 AM
                                </span>
                              </div>
                            </li>
                            <li className="d-flex align-items-start mb-3">
                              <div className="me-3">
                                <svg
                                  width={14}
                                  height={14}
                                  viewBox="0 0 14 14"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <rect
                                    width={14}
                                    height={14}
                                    rx={7}
                                    fill="#027335"
                                  />
                                </svg>
                              </div>
                              <div>
                                <h6 className="sub-title mb-1">
                                  Your Order On Delivery by Courir
                                </h6>
                                <span className="text-soft">
                                  January 19th, 12 : 02 AM
                                </span>
                              </div>
                            </li>
                            <li className="d-flex align-items-start">
                              <div className="me-3">
                                <svg
                                  width={14}
                                  height={14}
                                  viewBox="0 0 14 14"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <rect
                                    width={14}
                                    height={14}
                                    rx={7}
                                    fill="#7D8FAB"
                                  />
                                </svg>
                              </div>
                              <div>
                                <h6 className="sub-title mb-1 text-soft">
                                  Order Delivered
                                </h6>
                                <span className="text-soft">
                                  January 19th, 12 : 02 AM
                                </span>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Orders;