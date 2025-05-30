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
                <a href="order.html">
                  <i className="fa-solid fa-clock" />
                  My Orders
                </a>
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
