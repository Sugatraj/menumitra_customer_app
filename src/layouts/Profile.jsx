import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';

function Profile() {
  const { handleLogout, user } = useAuth();
  const navigate = useNavigate();

  const onLogoutClick = (e) => {
    e.preventDefault();
    handleLogout();
    navigate('/');
  };

  return (
    <>
      <Header />
      <div className="page-content bottom-content ">
        <div className="container profile-area">
          <div className="profile">
            <div className="d-flex align-items-center mb-3">
              <div className="media media-70 me-3">
                <img src="assets/images/avatar/5.jpg" alt="/" />
              </div>
              <div className="about-profile">
                <h5 className="sub-title mb-0">{user?.name || 'Guest User'}</h5>
                <h6 className="sub-title fade-text mb-0 font-w500">
                  {user?.mobile ? `+91 ${user.mobile}` : 'No phone number'}
                </h6>
              </div>
              <Link to="/edit-profile" className="edit-profile">
                <i className="fa-solid fa-pencil" />
              </Link>
            </div>
            <div className="location-box">
              <i className="location fa-solid fa-location-dot" />
              <div className="flex-1">
                <h6 className="text-white font-w400 mb-0">324002</h6>
                <h6 className="text-white font-w400 mb-0">UK - 324002</h6>
              </div>
              <a href="javascript:void(0);" className="change-btn">
                Change
              </a>
            </div>
          </div>
          <div className="profile-content border-0">
            <ul>
              <li>
                <Link to="/orders">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="me-2"
                    style={{
                      minWidth: '20px',
                      color: 'var(--primary)',
                      opacity: '0.7'
                    }}
                  >
                    <path
                      d="M18.9 3H5.1C4.4925 3 4 3.4925 4 4.1V21.9C4 22.5075 4.4925 23 5.1 23H18.9C19.5075 23 20 22.5075 20 21.9V4.1C20 3.4925 19.5075 3 18.9 3ZM8 17.5C7.725 17.5 7.5 17.275 7.5 17C7.5 16.725 7.725 16.5 8 16.5H16C16.275 16.5 16.5 16.725 16.5 17C16.5 17.275 16.275 17.5 16 17.5H8ZM8 13.5C7.725 13.5 7.5 13.275 7.5 13C7.5 12.725 7.725 12.5 8 12.5H16C16.275 12.5 16.5 12.725 16.5 13C16.5 13.275 16.275 13.5 16 13.5H8ZM8 9.5C7.725 9.5 7.5 9.275 7.5 9C7.5 8.725 7.725 8.5 8 8.5H16C16.275 8.5 16.5 8.725 16.5 9C16.5 9.275 16.275 9.5 16 9.5H8ZM11.5 6.5C11.5 6.225 11.725 6 12 6C12.275 6 12.5 6.225 12.5 6.5C12.5 6.775 12.275 7 12 7C11.725 7 11.5 6.775 11.5 6.5Z"
                      fill="currentColor"
                    />
                  </svg>
                  My Orders
                </Link>
              </li>
              <li>
                <a href="payment.html">
                  <i className="fa-solid fa-credit-card" />
                  Payments &amp; Wallet
                </a>
              </li>
              <li>
                <a href="review.html">
                  <i className="fa-solid fa-star" />
                  Ratings &amp; Review
                </a>
              </li>
              <li>
                <a href="notification.html">
                  <i className="fa-solid fa-bell" />
                  Notification
                  <span className="badge badge-circle align-items-center badge-danger ms-auto me-3">
                    1
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="javascript:void(0);"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModalCenter"
                >
                  <i className="fa-solid fa-location-dot" />
                  Delivery Address
                </a>
              </li>
              <li>
                <a href="blog.html">
                  <i className="fa-brands fa-microblog" />
                  Blog &amp; Blog Detail
                </a>
              </li>
              <li className="border-0">
                <a href="#" onClick={onLogoutClick}>
                  <i className="fa-solid fa-power-off" />
                  LogOut
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Profile;
