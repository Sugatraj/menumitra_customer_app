import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import fallbackImage from '../assets/images/food/food8.png';
import { useModal } from '../contexts/ModalContext';
import { useCart } from '../contexts/CartContext';

const VerticalMenuCard = ({
  image,
  title,
  currentPrice,
  reviewCount,
  onFavoriteClick,
  isFavorite = false,
  discount,
  menuItem
}) => {
  const { openModal } = useModal();
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const MAX_QUANTITY = 20;

  // Generate the product URL from menuItem data
  const detailPageUrl = menuItem ? `/product-detail/${menuItem.menuId}/${menuItem.menuCatId}` : '#';

  // Check if any portion of this menu exists in cart
  const cartItemsForMenu = cartItems.filter(item => 
    item.menuId === menuItem.menuId
  );

  const handleAddToCartClick = (e) => {
    e.preventDefault();
    openModal('ADD_TO_CART', menuItem);
  };

  // Get total quantity across all portions
  const getTotalQuantity = () => {
    return cartItemsForMenu.reduce((sum, item) => sum + item.quantity, 0);
  };

  // Handle quantity changes
  const handleQuantityChange = (increment) => {
    // Always open modal regardless of + or - click
    openModal('ADD_TO_CART', menuItem);
  };

  return (
    <div className="card-item style-1">
      <div className="dz-media">
        <Link to={detailPageUrl}>
          <img alt={title} src={image || fallbackImage} />
        </Link>
        <a 
          href="javascript:void(0);" 
          className="r-btn"
          onClick={onFavoriteClick}
        >
          <div className={`like-button ${isFavorite ? 'active' : ''}`}>
            <i className={`fa-${isFavorite ? 'solid' : 'regular'} fa-heart`}></i>
          </div>
        </a>
        {discount && <div className="label">{discount} OFF</div>}
      </div>
      <div className="dz-content">
        <h6 className="title mb-3">
          <Link to={detailPageUrl}>{title}</Link>
        </h6>
        <div className="dz-meta mb-3">
          <ul>
            <li className="price text-accent">₹{currentPrice}</li>
            {reviewCount && (
              <li className="review">
                <span className="text-soft font-10">({reviewCount})</span>
                <i className="fa fa-star"></i>
              </li>
            )}
          </ul>
        </div>
        <div className="mt-2" style={{ minHeight: '38px' }}>
          {!cartItemsForMenu.length ? (
            <a 
              className="btn btn-primary add-btn light w-100"
              href="javascript:void(0);"
              onClick={handleAddToCartClick}
            >
              Add to cart
            </a>
          ) : null}
          <div className={`dz-stepper border-1 rounded-stepper stepper-fill ${cartItemsForMenu.length ? 'active' : ''}`}>
            <div className="input-group bootstrap-touchspin bootstrap-touchspin-injected d-flex align-items-center">
              <button 
                className="btn btn-primary rounded-circle p-2"
                type="button"
                onClick={() => handleQuantityChange(false)}
                disabled={!cartItemsForMenu.length}
                style={{ width: '35px', height: '35px' }}
              >
                -
              </button>
              
              <div className="d-flex align-items-center justify-content-center mx-2" style={{ flex: 1 }}>
                {cartItemsForMenu.length > 0 ? (
                  <div className="row g-0 w-100">
                    {cartItemsForMenu.map((item, index) => {
                      const portion = menuItem.portions.find(p => p.portion_id === item.portionId);
                      return (
                        <div 
                          key={item.portionId} 
                          className={`col text-center ${
                            index < cartItemsForMenu.length - 1 ? 'border-end' : ''
                          }`}
                        >
                          <div className="fw-bold">{item.quantity}</div>
                          <div className="text-muted small">{portion?.portion_name.charAt(0).toUpperCase()}</div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center w-100">
                    <span className="fw-bold">0</span>
                  </div>
                )}
              </div>

              <button 
                className="btn btn-primary rounded-circle p-2"
                type="button"
                onClick={() => handleQuantityChange(true)}
                disabled={getTotalQuantity() >= MAX_QUANTITY}
                style={{ 
                  width: '35px', 
                  height: '35px',
                  opacity: getTotalQuantity() >= MAX_QUANTITY ? 0.5 : 1 
                }}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

VerticalMenuCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  currentPrice: PropTypes.number.isRequired,
  reviewCount: PropTypes.number,
  onFavoriteClick: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool,
  discount: PropTypes.string,
  menuItem: PropTypes.object.isRequired
};

export default VerticalMenuCard;
