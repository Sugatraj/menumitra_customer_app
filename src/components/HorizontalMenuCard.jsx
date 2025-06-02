import React from 'react';
import PropTypes from 'prop-types';
import fallbackImage from '../assets/images/food/small/6.png';

const HorizontalMenuCard = ({
  image,
  title = 'Fresh Tomatoes',
  currentPrice = 5.0,
  originalPrice = 8.9,
  discount = '10%Off',
  onAddToCart = () => {},
  onFavoriteClick = () => {},
  isFavorite = false,
  productUrl = '#',
  isInCart = false,
  quantity = 0,
  onIncrement,
  onDecrement
}) => {
  return (
    <div className="card product-card">
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
        <div className="ms-3 flex-grow-1">
          {/* Title */}
          <h5 className="mb-2">
            <a href={productUrl} className="text-dark text-decoration-none">
              {title}
            </a>
          </h5>

          {/* Price Section */}
          <div className="d-flex align-items-center mb-2">
            <h6 className="mb-0 me-2">${currentPrice}</h6>
            {originalPrice && (
              <del className="text-muted">
                <h6 className="mb-0">${originalPrice}</h6>
              </del>
            )}
          </div>

          {/* Discount and Cart Button */}
          <div className="d-flex align-items-center justify-content-between">
            {discount && (
              <div className="d-flex align-items-center">
                <svg
                  className="me-2"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.6666 0.000106812H9.12485C8.75825 0.000106812 8.24587 0.212488 7.98685 0.471314L0.389089 8.06903C-0.129696 8.58723 -0.129696 9.43684 0.389089 9.95441L6.04624 15.6114C6.56385 16.1296 7.41263 16.1296 7.93103 15.6108L15.5288 8.01423C15.7876 7.75544 16 7.24224 16 6.87642V1.3335C16 0.600298 15.3998 0.000106812 14.6666 0.000106812ZM11.9998 5.33347C11.2634 5.33347 10.6664 4.73585 10.6664 4.00008C10.6664 3.26309 11.2634 2.66669 11.9998 2.66669C12.7362 2.66669 13.3334 3.26309 13.3334 4.00008C13.3334 4.73585 12.7362 5.33347 11.9998 5.33347Z"
                    fill="#C29C1D"
                  />
                </svg>
                <span className="text-warning small">Disc. {discount}</span>
              </div>
            )}

            {/* Cart Button */}
            <button 
              className="btn btn-success rounded-circle p-2"
              onClick={onAddToCart}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M18.1776 17.8443C16.6362 17.8428 15.3855 19.0912 15.3839 20.6326C15.3824 22.1739 16.6308 23.4247 18.1722 23.4262C19.7136 23.4277 20.9643 22.1794 20.9659 20.638V20.6353C20.9644 19.0955 19.7173 17.8473 18.1776 17.8443Z"/>
                <path d="M23.1278 4.47972C23.061 4.46679 22.9932 4.46022 22.9251 4.46011H5.93181L5.66267 2.65957C5.49499 1.4638 4.47216 0.574121 3.26466 0.573753H1.07655C0.481978 0.573753 0 1.05573 0 1.6503C0 2.24488 0.481978 2.72686 1.07655 2.72686H3.26734C3.40423 2.72586 3.52008 2.82778 3.53648 2.96372L5.19436 14.3267C5.42166 15.7706 6.66363 16.8358 8.12528 16.8404H19.3241C20.7313 16.8423 21.9454 15.8533 22.2281 14.4747L23.9802 5.7412C24.0931 5.15745 23.7115 4.59268 23.1278 4.47972Z"/>
                <path d="M11.3405 20.5158C11.2749 19.0196 10.0401 17.8418 8.54246 17.847C7.00233 17.9092 5.80425 19.2082 5.86648 20.7484C5.9262 22.2262 7.12833 23.4007 8.60707 23.4262H8.67435C10.2143 23.3587 11.4079 22.0557 11.3405 20.5158Z"/>
              </svg>
            </button>
          </div>
        </div>
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
  onAddToCart: PropTypes.func,
  onFavoriteClick: PropTypes.func,
  isFavorite: PropTypes.bool,
  productUrl: PropTypes.string,
  isInCart: PropTypes.bool,
  quantity: PropTypes.number,
  onIncrement: PropTypes.func,
  onDecrement: PropTypes.func
};

export default HorizontalMenuCard;
