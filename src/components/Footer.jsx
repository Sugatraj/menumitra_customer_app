import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

function Footer() {
  const { getCartCount } = useCart();
  const cartCount = getCartCount();
  const location = useLocation();

  const isOrderRoute = () => {
    const pathname = location.pathname;
    return pathname === '/orders' || 
           pathname.startsWith('/orders/') || 
           pathname.startsWith('/order-detail/');
  };

  const isProfileRoute = () => {
    const pathname = location.pathname;
    return pathname === '/profile' || 
           pathname.startsWith('/profile/') || 
           pathname === '/edit-profile';
  };

  return (
    <div>
      <div className="menubar-area style-2 footer-fixed border-top">
        <div className="toolbar-inner menubar-nav">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            end
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.14373 20.7821V17.7152C9.14372 16.9381 9.77567 16.3067 10.5584 16.3018H13.4326C14.2189 16.3018 14.8563 16.9346 14.8563 17.7152V20.7732C14.8562 21.4473 15.404 21.9951 16.0829 22H18.0438C18.9596 22.0023 19.8388 21.6428 20.4872 21.0007C21.1356 20.3586 21.5 19.4868 21.5 18.5775V9.86585C21.5 9.13139 21.1721 8.43471 20.6046 7.9635L13.943 2.67427C12.7785 1.74912 11.1154 1.77901 9.98539 2.74538L3.46701 7.9635C2.87274 8.42082 2.51755 9.11956 2.5 9.86585V18.5686C2.5 20.4637 4.04738 22 5.95617 22H7.87229C8.19917 22.0023 8.51349 21.8751 8.74547 21.6464C8.97746 21.4178 9.10793 21.1067 9.10792 20.7821H9.14373Z"
                fill="#130F26"
              ></path>
            </svg>
          </NavLink>
          <NavLink
            to="/favourites"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <svg
              enableBackground="new 0 0 512.001 512.001"
              height="512"
              viewBox="0 0 512.001 512.001"
              width="512"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="m256.001 477.407c-2.59 0-5.179-.669-7.499-2.009-2.52-1.454-62.391-36.216-123.121-88.594-35.994-31.043-64.726-61.833-85.396-91.513-26.748-38.406-40.199-75.348-39.982-109.801.254-40.09 14.613-77.792 40.435-106.162 26.258-28.848 61.3-44.734 98.673-44.734 47.897 0 91.688 26.83 116.891 69.332 25.203-42.501 68.994-69.332 116.891-69.332 35.308 0 68.995 14.334 94.859 40.362 28.384 28.563 44.511 68.921 44.247 110.724-.218 34.393-13.921 71.279-40.728 109.632-20.734 29.665-49.426 60.441-85.279 91.475-60.508 52.373-119.949 87.134-122.45 88.588-2.331 1.354-4.937 2.032-7.541 2.032z"></path>
            </svg>
          </NavLink>
          <NavLink
            to="/checkout"
            className={({ isActive }) =>
              isActive ? "nav-link active position-relative d-flex align-items-center justify-content-center" : "nav-link position-relative d-flex align-items-center justify-content-center"
            }
          >
            <span style={{ position: "relative", display: "inline-block" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 456.569 456.569"
                style={{ width: 24, height: 24 }}
            >
              <path d="M345.805 339.465c-29.323-.028-53.117 23.72-53.146 53.043s23.72 53.117 53.043 53.146 53.117-23.72 53.146-53.043v-.051c-.028-29.292-23.752-53.038-53.043-53.095zm94.171-254.244a20.44 20.44 0 0 0-3.855-.373H112.845l-5.12-34.253c-3.19-22.748-22.648-39.673-45.619-39.68H20.48C9.169 10.915 0 20.084 0 31.395s9.169 20.48 20.48 20.48h41.677a5.12 5.12 0 0 1 5.12 4.506l31.539 216.166c4.324 27.468 27.951 47.732 55.757 47.821h213.043c26.771.035 49.866-18.78 55.245-45.005l33.331-166.144c2.149-11.105-5.111-21.849-16.216-23.998zM215.737 390.286c-1.247-28.463-24.737-50.869-53.228-50.77h0c-29.299 1.184-52.091 25.896-50.907 55.195 1.136 28.113 24.005 50.458 52.136 50.943h1.28c29.295-1.284 52.002-26.073 50.719-55.368z"></path>
            </svg>
              {cartCount > 0 && (
                <span
                  className="position-absolute badge rounded-pill"
                  style={{
                    bottom: "14px",
                    left: "15px",
                    fontSize: "0.6rem",
                    minWidth: 18,
                    height: 18,
                    backgroundColor: "#dc3545",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "0 4px",
                    zIndex: 2,
                    border: '1px solid white'
                  }}
                >
                  {cartCount}
                </span>
              )}
            </span>
          </NavLink>

          <NavLink
            to="/orders"
            className={({ isActive }) =>
              isOrderRoute() ? "nav-link active" : "nav-link"
            }
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z"
                fill="#130F26"
              />
              <path
                d="M7 8H17M7 12H17M7 16H13"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isProfileRoute() ? "nav-link active" : "nav-link"
            }
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
                fill="#130F26"
              />
              <path
                d="M12 14.5C6.99 14.5 3 17.86 3 22C3 22.28 3.22 22.5 3.5 22.5H20.5C20.78 22.5 21 22.28 21 22C21 17.86 17.01 14.5 12 14.5Z"
                fill="#130F26"
              />
            </svg>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Footer;
