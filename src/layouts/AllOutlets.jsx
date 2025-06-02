import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const VegIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="1" width="14" height="14" rx="2" stroke="#008000" strokeWidth="2"/>
    <circle cx="8" cy="8" r="4" fill="#008000"/>
  </svg>
);

const NonVegIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="1" width="14" height="14" rx="2" stroke="#FF0000" strokeWidth="2"/>
    <circle cx="8" cy="8" r="4" fill="#FF0000"/>
  </svg>
);

function AllOutlets() {
  const [outlets, setOutlets] = useState([]);
  const [filteredOutlets, setFilteredOutlets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    type: 'all',    // 'all', 'veg', 'nonveg'
    status: 'all'   // 'all', 'open', 'closed'
  });

  useEffect(() => {
    fetchOutlets();
  }, []);

  useEffect(() => {
    // Apply filters whenever outlets or filters change
    applyFilters();
  }, [outlets, filters]);

  const applyFilters = () => {
    let result = [...outlets];

    // Filter by veg/non-veg
    if (filters.type !== 'all') {
      result = result.filter(outlet => outlet.veg_nonveg === filters.type);
    }

    // Filter by open/closed status
    if (filters.status !== 'all') {
      result = result.filter(outlet => 
        filters.status === 'open' ? outlet.is_open : !outlet.is_open
      );
    }

    setFilteredOutlets(result);
  };

  const fetchOutlets = async () => {
    try {
      const authData = localStorage.getItem('auth');
      const userData = authData ? JSON.parse(authData) : null;

      const response = await fetch('https://men4u.xyz/v2/user/get_all_restaurants', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${userData?.accessToken}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch outlets');
      }

      const data = await response.json();
      setOutlets(data.detail.outlets);
      setIsLoading(false);
    } catch (err) {
      console.error('Error fetching outlets:', err);
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="page-content">
        <div className="container">
          {/* Title Section */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h6 className="mb-0">All Restaurants</h6>
            <span className="text-muted small">Total: {filteredOutlets.length} outlets</span>
          </div>

          {/* Filter Section */}
          <div className="mb-3">
            <div className="d-flex justify-content-between align-items-center">
              {/* Restaurant Type Filter - Left Side */}
              <div className="nav nav-pills">
                <button 
                  className={`nav-link ${filters.type === 'all' ? 'active' : ''}`}
                  onClick={() => setFilters(prev => ({ ...prev, type: 'all' }))}
                >
                  All
                </button>
                <button 
                  className={`nav-link ${filters.type === 'veg' ? 'active' : ''}`}
                  onClick={() => setFilters(prev => ({ ...prev, type: 'veg' }))}
                >
                  Veg
                </button>
                <button 
                  className={`nav-link ${filters.type === 'nonveg' ? 'active' : ''}`}
                  onClick={() => setFilters(prev => ({ ...prev, type: 'nonveg' }))}
                >
                  Non Veg
                </button>
              </div>

              {/* Status Filter - Right Side */}
              <div className="nav nav-pills">
                <button 
                  className={`nav-link ${filters.status === 'all' ? 'active' : ''}`}
                  onClick={() => setFilters(prev => ({ ...prev, status: 'all' }))}
                >
                  All
                </button>
                <button 
                  className={`nav-link ${filters.status === 'open' ? 'active' : ''}`}
                  onClick={() => setFilters(prev => ({ ...prev, status: 'open' }))}
                >
                  Open
                </button>
                <button 
                  className={`nav-link ${filters.status === 'closed' ? 'active' : ''}`}
                  onClick={() => setFilters(prev => ({ ...prev, status: 'closed' }))}
                >
                  Closed
                </button>
              </div>
            </div>
          </div>

          {/* Results Section */}
          {isLoading ? (
            <div className="text-center py-4">Loading restaurants...</div>
          ) : error ? (
            <div className="alert alert-danger">
              <i className="fas fa-exclamation-circle me-2"></i>
              {error}
            </div>
          ) : filteredOutlets.length === 0 ? (
            <div className="alert alert-info">
              <i className="fas fa-info-circle me-2"></i>
              No restaurants found matching your filters
            </div>
          ) : (
            <div className="restaurant-list">
              {filteredOutlets.map((outlet) => (
                <div 
                  key={outlet.outlet_id} 
                  className="restaurant-card bg-white rounded-3 mb-3"
                  onClick={() => {
                    if (outlet.resto_url) {
                      window.open(outlet.resto_url, '_blank', 'noopener,noreferrer');
                    }
                  }}
                >
                  <div className="p-3">
                    {/* Restaurant Header */}
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h6 className="mb-0">{outlet.outlet_name}</h6>
                      <span className={`badge ${outlet.is_open ? 'bg-success' : 'bg-danger'} rounded-pill`}>
                        {outlet.is_open ? 'OPEN' : 'CLOSED'}
                      </span>
                    </div>
                    
                    {/* Restaurant Info */}
                    <div className="restaurant-info">
                      <div className="text-muted small mb-1">
                        <i className="fas fa-map-marker-alt me-2"></i>
                        {outlet.address}
                      </div>
                      <div className="text-muted small mb-2">
                        <i className="fas fa-phone me-2"></i>
                        {outlet.mobile}
                      </div>
                      <div className="d-flex align-items-center">
                        {outlet.veg_nonveg === 'veg' ? (
                          <span className="d-flex align-items-center" title="Veg">
                            <VegIcon />
                            <span className="ms-1 small text-success">Veg</span>
                          </span>
                        ) : (
                          <span className="d-flex align-items-center" title="Non-Veg">
                            <NonVegIcon />
                            <span className="ms-1 small text-danger">Non-Veg</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AllOutlets;
