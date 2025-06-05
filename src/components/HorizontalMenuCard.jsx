import React from 'react';
import PropTypes from 'prop-types';
import fallbackImage from '../assets/images/food/small/6.png';
import { useModal } from '../contexts/ModalContext';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

const HorizontalMenuCard = ({
  image,
  title = 'Fresh Tomatoes',
  currentPrice = 5.0,
  originalPrice = 8.9,
  discount = '10%Off',
  menuItem = {},
  onFavoriteClick = () => {},
  isFavorite = false,
  productUrl = '#'
}) => {
  const { openModal } = useModal();
  const { user, setShowAuthOffcanvas } = useAuth();
  const { cartItems, getCartItemComment } = useCart();

  const cartItemsForMenu = menuItem?.menuId 
    ? cartItems.filter(item => item.menuId === menuItem.menuId)
    : [];

  const menuComment = menuItem?.menuId ? getCartItemComment(menuItem.menuId) : '';

  const handleAddToCart = (e) => {
    e.preventDefault();
    
    if (!menuItem) return;

    if (!user) {
      setShowAuthOffcanvas(true);
      return;
    }

    openModal('addToCart', menuItem);
  };

  return (
    <div className="card product-card position-relative border shadow-sm hover-shadow">
      <div className="d-flex align-items-center p-3">
        {/* Left side - Image and Favorite Button */}
        <div className="position-relative" style={{ width: '95px', height: '95px' }}>
          <img 
            src={image || fallbackImage} 
            alt={title}
            className="rounded-3 w-100 h-100"
            style={{ objectFit: 'cover' }}
          />
          <button 
            className={`position-absolute top-0 end-0 btn btn-link p-0 m-2 ${isFavorite ? 'text-danger' : 'text-white'}`}
            onClick={onFavoriteClick}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill={isFavorite ? "currentColor" : "none"}
              stroke={isFavorite ? "none" : "currentColor"}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.785 2.04751C15.9489 2.04694 15.1209 2.21163 14.3486 2.53212C13.5764 2.85261 12.8751 3.32258 12.285 3.91501L12 4.18501L11.73 3.91501C11.1492 3.2681 10.4424 2.74652 9.65306 2.3822C8.86367 2.01787 8.00824 1.81847 7.13912 1.79618C6.27 1.7739 5.40547 1.9292 4.59845 2.25259C3.79143 2.57599 3.05889 3.06066 2.44566 3.67695C1.83243 4.29325 1.35142 5.02819 1.03206 5.83682C0.712696 6.64544 0.561704 7.51073 0.588323 8.37973C0.614942 9.24873 0.818613 10.1032 1.18687 10.8907C1.55513 11.6783 2.08022 12.3824 2.73002 12.96L12 22.2675L21.3075 12.96C22.2015 12.0677 22.8109 10.9304 23.0589 9.6919C23.3068 8.45338 23.1822 7.16915 22.7006 6.00144C22.2191 4.83373 21.4023 3.83492 20.3534 3.13118C19.3045 2.42744 18.0706 2.05034 16.8075 2.04751H16.785Z"
              />
            </svg>
          </button>
        </div>

        {/* Right side - Content */}
        <div className="ms-3 flex-grow-1 pe-5">
          {/* Title */}
          <h5 className="mb-2">
            <a href={productUrl} className="text-dark text-decoration-none">
              {title}
            </a>
          </h5>

          {/* Price Section */}
          <div className="dz-meta mb-3">
            <ul>
              <li className="price text-accent">₹{currentPrice}</li>
              {originalPrice && (
                <del className="text-muted">
                  <h6 className="mb-0">₹{originalPrice}</h6>
                </del>
              )}
            </ul>
          </div>

          {/* Discount */}
          {discount && (
            <div className="d-flex align-items-center">
              <span className="text-warning small">Disc. {discount}</span>
            </div>
          )}

          {/* Show comment if exists */}
          {menuComment && (
            <div className="text-muted small mt-1" style={{ fontSize: '12px' }}>
              <i className="fas fa-comment-alt me-1"></i>
              {menuComment}
            </div>
          )}
        </div>

        {/* Cart Button - Show different states based on cart */}
        {!cartItemsForMenu.length ? (
          <a 
            href={productUrl}
            className="position-absolute end-0 top-50 translate-middle-y me-3 btn btn-success rounded-3 p-2 cart-btn"
            onClick={handleAddToCart}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_361_436)">
                <path d="M18.1776 17.8443C16.6362 17.8428 15.3855 19.0912 15.3839 20.6326C15.3824 22.1739 16.6308 23.4247 18.1722 23.4262C19.7136 23.4277 20.9643 22.1794 20.9659 20.638V20.6353C20.9644 19.0955 19.7173 17.8473 18.1776 17.8443Z" fill="white"/>
                <path d="M23.1278 4.47972C23.061 4.46679 22.9932 4.46022 22.9251 4.46011H5.93181L5.66267 2.65957C5.49499 1.4638 4.47216 0.574121 3.26466 0.573753H1.07655C0.481978 0.573753 0 1.05573 0 1.6503C0 2.24488 0.481978 2.72686 1.07655 2.72686H3.26734C3.40423 2.72586 3.52008 2.82778 3.53648 2.96372L5.19436 14.3267C5.42166 15.7706 6.66363 16.8358 8.12528 16.8404H19.3241C20.7313 16.8423 21.9454 15.8533 22.2281 14.4747L23.9802 5.7412C24.0931 5.15745 23.7115 4.59268 23.1278 4.47972Z" fill="white"/>
                <path d="M11.3405 20.5158C11.2749 19.0196 10.0401 17.8418 8.54246 17.847C7.00233 17.9092 5.80425 19.2082 5.86648 20.7484C5.9262 22.2262 7.12833 23.4007 8.60707 23.4262H8.67435C10.2143 23.3587 11.4079 22.0557 11.3405 20.5158Z" fill="white"/>
              </g>
              <defs>
                <clipPath id="clip0_361_436">
                  <rect width="24" height="24" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          </a>
        ) : (
          <div className="position-absolute end-0 top-50 translate-middle-y me-3">
            <div className="d-flex align-items-center">
              {menuItem?.portions && cartItemsForMenu.map((cartItem, index) => (
                <div 
                  key={cartItem.portionId}
                  className={`text-center ${index > 0 ? 'ms-2' : ''}`}
                >
                  <div className="fw-bold">{cartItem.quantity}</div>
                  <div className="text-muted small">
                    {cartItem.portionName?.charAt(0).toUpperCase()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

HorizontalMenuCard.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  currentPrice: PropTypes.number,
  originalPrice: PropTypes.number,
  discount: PropTypes.string,
  menuItem: PropTypes.object,
  onFavoriteClick: PropTypes.func,
  isFavorite: PropTypes.bool,
  productUrl: PropTypes.string
};

export default HorizontalMenuCard;
