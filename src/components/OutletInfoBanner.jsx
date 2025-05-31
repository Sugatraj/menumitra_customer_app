import React from 'react'

function OutletInfoBanner() {
  return (
    <div className="container-fluid bg-white py-2 shadow-sm">
      <div className="d-flex align-items-center">
        {/* Left side - Location Icon and Name */}
        <div className="d-flex align-items-center flex-grow-1">
          <div className="me-2">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              fill="currentColor" 
              className="bi bi-geo-alt" 
              viewBox="0 0 16 16"
            >
              <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z"/>
              <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
            </svg>
          </div>
          <div>
            <h6 className="mb-0 text-dark fw-bold">DESHMUKH WADA</h6>
            <small className="text-muted">Pimpinvihir - 1</small>
          </div>
        </div>

        {/* Right side - Info Icon */}
        <div>
          <button 
            className="btn btn-link text-dark p-0" 
            onClick={() => {/* Handle info click */}}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              fill="currentColor" 
              className="bi bi-info-circle" 
              viewBox="0 0 16 16"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
              <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default OutletInfoBanner