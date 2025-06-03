import React, { useEffect, useState, useRef } from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useOutlet } from '../contexts/OutletContext';

function OutletDetails() {
  const { outletInfo } = useOutlet();
  const [restaurantDetails, setRestaurantDetails] = useState(() => {
    // Always initialize from cache if available
    const cached = localStorage.getItem(`restaurant_details_${outletInfo?.outletId}`);
    return cached ? JSON.parse(cached) : {
      outlet_details: {
        name: outletInfo?.outletName,
        address: outletInfo?.outletAddress,
        mobile: outletInfo?.outletMobile,
        veg_nonveg: outletInfo?.vegNonveg,
        upi_id: '',
        image: null
      },
      count: {
        total_menu: 0,
        total_special_menu: 0,
        total_offer_menu: 0,
        total_category: 0,
        total_tables: 0
      }
    };
  });
  const [isProcessingUPI, setIsProcessingUPI] = useState(false);
  const [isProcessingPhonePe, setIsProcessingPhonePe] = useState(false);
  const [isProcessingGPay, setIsProcessingGPay] = useState(false);
  const lastFetchRef = useRef(0);
  const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

  const fetchRestaurantDetails = async () => {
    try {
      const response = await fetch('https://men4u.xyz/v2/user/get_restaurant_details', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          outlet_id: outletInfo?.outletId
        })
      });
      const data = await response.json();
      
      // Update cache and state
      localStorage.setItem(
        `restaurant_details_${outletInfo?.outletId}`,
        JSON.stringify(data.detail)
      );
      setRestaurantDetails(data.detail);
      lastFetchRef.current = Date.now();
    } catch (error) {
      console.error('Error fetching restaurant details:', error);
    }
  };

  // Initial fetch and periodic refresh
  useEffect(() => {
    if (!outletInfo?.outletId) return;

    // Always fetch on mount
    fetchRestaurantDetails();

    // Set up periodic refresh
    const intervalId = setInterval(fetchRestaurantDetails, CACHE_DURATION);

    return () => {
      clearInterval(intervalId);
      lastFetchRef.current = 0;
    };
  }, [outletInfo?.outletId]);

  const handleGenericUPI = () => {
    if (isProcessingUPI) return;
    try {
      setIsProcessingUPI(true);
      const upiUrl = `upi://pay?pa=${
        restaurantDetails?.outlet_details?.upi_id
      }&pn=${encodeURIComponent(
        restaurantDetails?.outlet_details?.name
      )}&mc=1234&tid=TEST123&tr=TEST123&tn=Test payment&am=1&cu=INR`;
      window.location.href = upiUrl;
    } catch (error) {
      console.clear();
      setIsProcessingUPI(false);
    }
  };

  const handlePhonePe = () => {
    if (isProcessingPhonePe) return;
    try {
      setIsProcessingPhonePe(true);
      const phonePeUrl = `phonepe://pay?pa=${
        restaurantDetails?.outlet_details?.upi_id
      }&pn=${encodeURIComponent(
        restaurantDetails?.outlet_details?.name
      )}&mc=1234&tid=TEST123&tr=TEST123&tn=Test payment&am=1&cu=INR`;
      window.location.href = phonePeUrl;
    } catch (error) {
      console.clear();
    } finally {
      setIsProcessingPhonePe(false);
    }
  };

  const handleGooglePay = () => {
    if (isProcessingGPay) return;
    try {
      setIsProcessingGPay(true);
      const googlePayUrl = `gpay://upi/pay?pa=${
        restaurantDetails?.outlet_details?.upi_id
      }&pn=${encodeURIComponent(
        restaurantDetails?.outlet_details?.name
      )}&mc=1234&tid=TEST123&tr=TEST123&tn=Test payment&am=1&cu=INR`;
      window.location.href = googlePayUrl;
    } catch (error) {
      console.clear();
    } finally {
      setIsProcessingGPay(false);
    }
  };

  return (
    <>
      <Header />
      <div className="container py-4">
        {/* Restaurant Details Card */}
        <div className="card mb-4">
          <div className="card-body">
            <div className="d-flex align-items-center mb-4">
              <div className="me-3">
                {restaurantDetails?.outlet_details?.image ? (
                  <img 
                    src={restaurantDetails.outlet_details.image} 
                    alt="Restaurant" 
                    className="rounded-circle"
                    style={{ width: '64px', height: '64px', objectFit: 'cover' }}
                  />
                ) : (
                  <div 
                    className="rounded-circle bg-light d-flex align-items-center justify-content-center"
                    style={{ width: '64px', height: '64px' }}
                  >
                    <i className="fas fa-store text-primary" style={{ fontSize: '24px' }}></i>
                  </div>
                )}
              </div>
              <div>
                <h5 className="mb-1">{restaurantDetails?.outlet_details?.name}</h5>
                <p className="text-muted mb-0">{restaurantDetails?.outlet_details?.address}</p>
                <div className="d-flex align-items-center mt-1">
                  <span className="badge bg-light text-dark me-2">
                    {restaurantDetails?.outlet_details?.veg_nonveg?.toUpperCase()}
                  </span>
                  <small className="text-muted">
                    • {restaurantDetails?.outlet_details?.mobile}
                  </small>
                </div>
              </div>
            </div>

            {/* Statistics Grid */}
            <div className="row g-3 mb-4">
              <div className="col-4">
                <div className="border rounded p-3 text-center">
                  <h3 className="mb-1">{restaurantDetails?.count?.total_menu}</h3>
                  <small className="text-muted">Total Menu Items</small>
                </div>
              </div>
              <div className="col-4">
                <div className="border rounded p-3 text-center">
                  <h3 className="mb-1">{restaurantDetails?.count?.total_special_menu}</h3>
                  <small className="text-muted">Special Items</small>
                </div>
              </div>
              <div className="col-4">
                <div className="border rounded p-3 text-center">
                  <h3 className="mb-1">{restaurantDetails?.count?.total_offer_menu}</h3>
                  <small className="text-muted">Offer Items</small>
                </div>
              </div>
              <div className="col-6">
                <div className="border rounded p-3 text-center">
                  <h3 className="mb-1">{restaurantDetails?.count?.total_category}</h3>
                  <small className="text-muted">Categories</small>
                </div>
              </div>
              <div className="col-6">
                <div className="border rounded p-3 text-center">
                  <h3 className="mb-1">{restaurantDetails?.count?.total_tables}</h3>
                  <small className="text-muted">Total Tables</small>
                </div>
              </div>
            </div>

            {/* UPI Payment Section */}
            <div className="card" style={{ border: '2px dashed silver' }}>
              <div className="p-3 rounded-4 d-flex justify-content-center align-items-center">
                <span className="font_size_16">
                  UPI : {restaurantDetails?.outlet_details?.upi_id}
                </span>
              </div>
              <div className="px-3 pb-3">
                <div className="row g-2">
                  <div className="col-6">
                    <button 
                      className="btn w-100 btn-sm" 
                      style={{ 
                        backgroundColor: 'rgb(95, 37, 159)', 
                        color: 'white', 
                        borderRadius: '8px' 
                      }}
                      onClick={handlePhonePe}
                      disabled={isProcessingPhonePe}
                    >
                      {isProcessingPhonePe ? 'Opening...' : 'PhonePe'}
                    </button>
                  </div>
                  <div className="col-6">
                    <button 
                      className="btn w-100 btn-sm" 
                      style={{ 
                        backgroundColor: 'rgb(26, 115, 232)', 
                        color: 'white', 
                        borderRadius: '8px' 
                      }}
                      onClick={handleGooglePay}
                      disabled={isProcessingGPay}
                    >
                      {isProcessingGPay ? 'Opening...' : 'Google Pay'}
                    </button>
                  </div>
                  <div className="col-12">
                    <button 
                      className="btn btn-primary w-100 btn-sm" 
                      style={{ borderRadius: '8px' }}
                      onClick={handleGenericUPI}
                      disabled={isProcessingUPI}
                    >
                      {isProcessingUPI ? 'Opening...' : 'Other UPI Apps'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default OutletDetails;