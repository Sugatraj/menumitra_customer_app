import React from 'react';
import PropTypes from 'prop-types';
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
  productUrl = '#',
  menuItem
}) => {
  const { openModal } = useModal();
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  // Check if item exists in cart
  const cartItem = cartItems.find(item => 
    item.menuId === menuItem.menuId && 
    item.portionId === menuItem.portions?.[0]?.portion_id
  );

  const handleAddToCartClick = (e) => {
    e.preventDefault();
    openModal('ADD_TO_CART', menuItem);
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(menuItem.menuId, cartItem.portionId);
    } else {
      updateQuantity(menuItem.menuId, cartItem.portionId, newQuantity);
    }
  };

  return (
    <div className="card-item style-1">
      <div className="dz-media">
        <img alt={title} src={image || fallbackImage} />
        <a 
          href="javascript:void(0);" 
          className="r-btn"
          onClick={onFavoriteClick}
        >
          <div className="like-button active">
            <i className={`fa-${isFavorite ? 'solid' : 'regular'} fa-heart`}></i>
          </div>
        </a>
        {discount && <div className="label">{discount} OFF</div>}
      </div>
      <div className="dz-content">
        <h6 className="title mb-3">
          <a href={productUrl}>{title}</a>
        </h6>
        <div className="dz-meta">
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
        <div className="mt-2">
          {!cartItem ? (
            // Show Add to Cart button if item is not in cart
            <a 
              className="btn btn-primary add-btn light"
              href="javascript:void(0);"
              onClick={handleAddToCartClick}
            >
              Add to cart
            </a>
          ) : (
            // Show quantity stepper if item is in cart with active class
            <div className="dz-stepper border-1 rounded-stepper stepper-fill active">
              <div className="input-group bootstrap-touchspin bootstrap-touchspin-injected">
                <span className="input-group-btn input-group-prepend">
                  <button 
                    className="btn btn-primary bootstrap-touchspin-down" 
                    type="button"
                    onClick={() => handleQuantityChange(Math.max(0, cartItem.quantity - 1))}
                  >
                    -
                  </button>
                </span>
                <input 
                  className="stepper form-control" 
                  type="text" 
                  name="demo3"
                  value={cartItem.quantity}
                  readOnly
                />
                <span className="input-group-btn input-group-append">
                  <button 
                    className="btn btn-primary bootstrap-touchspin-up" 
                    type="button"
                    onClick={() => handleQuantityChange(cartItem.quantity + 1)}
                  >
                    +
                  </button>
                </span>
              </div>
            </div>
          )}
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
  productUrl: PropTypes.string,
  menuItem: PropTypes.object.isRequired
};

export default VerticalMenuCard;
