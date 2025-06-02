import React, { useEffect, useState } from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import OrderAccordionItem from '../components/OrderAccordionItem';

function Orders() {
  const [ordersData, setOrdersData] = useState({
    paid: {},
    cancelled: {}
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Dummy order steps data
  const orderSteps = [
    {
      title: 'Order Placed',
      timestamp: 'January 19th, 12 : 02 AM',
      completed: true
    },
    {
      title: 'Order Confirmed',
      timestamp: 'January 19th, 12 : 02 AM',
      completed: true
    },
    {
      title: 'Your Order On Delivery by Courir',
      timestamp: 'January 19th, 12 : 02 AM',
      completed: true
    },
    {
      title: 'Order Delivered',
      timestamp: 'January 19th, 12 : 02 AM',
      completed: false
    }
  ];

  // Dummy orders data
  const dummyOrders = [
    {
      id: '0012345',
      itemCount: 12,
      status: 'On Delivery',
      iconColor: '#FFA902',
      iconBgClass: '',
      isExpanded: true
    },
    {
      id: '0012346',
      itemCount: 8,
      status: 'On Delivery',
      iconColor: 'var(--primary)',
      iconBgClass: 'bg-primary',
      isExpanded: false
    },
    {
      id: '0012347',
      itemCount: 15,
      status: 'On Delivery',
      iconColor: 'var(--primary)',
      iconBgClass: 'bg-danger',
      isExpanded: false
    }
  ];

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const auth = JSON.parse(localStorage.getItem('auth')) || {};
      const userId = auth.userId || '73';
      const accessToken = auth.accessToken;
      const outletId = '1';

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

  return (
    <>
      <Header />
  <div className="page-content">
        {isLoading ? (
          <div>Loading orders...</div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : (
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
                    <svg className="me-2" width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx={8} cy={8} r={7} fill="#027335" stroke="(--bg-white)" strokeWidth={2} />
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
                    <svg className="me-2" width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx={8} cy={8} r={7} fill="#FF0000" stroke="var(--bg-white)" strokeWidth={2} />
              </svg>
                    Cancelled
            </button>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent3">
                {/* All Orders Tab */}
                <div className="tab-pane fade show active" id="all-tab-pane" role="tabpanel" aria-labelledby="all-tab" tabIndex={0}>
            <div className="accordion style-3" id="accordionExample">
                    {(ordersData.paid?.orders || dummyOrders).map((order) => (
                      <OrderAccordionItem
                        key={order.id}
                        orderId={order.id}
                        itemCount={order.item_count || order.itemCount}
                        status={order.status}
                        iconColor={order.iconColor || '#FFA902'}
                        iconBgClass={order.iconBgClass || ''}
                        orderSteps={orderSteps}
                        isExpanded={order.isExpanded}
                        parentId="accordionExample"
                      />
                    ))}
                      </div>
                      </div>

                {/* Completed Orders Tab */}
                <div className="tab-pane fade" id="completed-tab-pane" role="tabpanel" aria-labelledby="completed-tab" tabIndex={0}>
                  <div className="accordion style-3" id="accordionExample3">
                    {dummyOrders.slice(0, 2).map((order) => (
                      <OrderAccordionItem
                        key={order.id}
                        orderId={order.id}
                        itemCount={order.itemCount}
                        status="Completed"
                        iconColor={order.iconColor}
                        iconBgClass={order.iconBgClass}
                        orderSteps={orderSteps.map(step => ({ ...step, completed: true }))}
                        isExpanded={order.isExpanded}
                        parentId="accordionExample3"
                      />
                    ))}
                        </div>
                        </div>

                {/* Cancelled Orders Tab */}
                <div className="tab-pane fade" id="cancelled-tab-pane" role="tabpanel" aria-labelledby="cancelled-tab" tabIndex={0}>
            <div className="accordion style-3" id="accordionExample2">
                    {dummyOrders.slice(2).map((order) => (
                      <OrderAccordionItem
                        key={order.id}
                        orderId={order.id}
                        itemCount={order.itemCount}
                        status="Cancelled"
                        iconColor="var(--primary)"
                        iconBgClass="bg-danger"
                        orderSteps={orderSteps.map(step => ({ ...step, completed: false }))}
                        isExpanded={order.isExpanded}
                        parentId="accordionExample2"
                      />
                    ))}
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