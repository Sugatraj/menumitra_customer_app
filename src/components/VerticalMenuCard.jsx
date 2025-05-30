import React from 'react';
import PropTypes from 'prop-types';
import fallbackImage from '../assets/images/food/food8.png';

const VerticalMenuCard = ({
  image,
  title,
  currentPrice,
  reviewCount,
  onAddToCart,
  onFavoriteClick,
  isFavorite = false,
  discount,
  productUrl = '#',
  onQuantityChange,
  quantity = 1
}) => {
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
            <li className="price text-accent">$ {currentPrice}</li>
            {reviewCount && (
              <li className="review">
                <span className="text-soft font-10">({reviewCount})</span>
                <i className="fa fa-star"></i>
              </li>
            )}
          </ul>
        </div>
        <div className="mt-2">
          <a 
            className="btn btn-primary add-btn light" 
            href="javascript:void(0);"
            onClick={onAddToCart}
          >
            Add to cart
          </a>
          <div className="dz-stepper border-1 rounded-stepper stepper-fill">
            <div className="input-group bootstrap-touchspin bootstrap-touchspin-injected">
              <span className="input-group-btn input-group-prepend">
                <button 
                  className="btn btn-primary bootstrap-touchspin-down" 
                  type="button"
                  onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
                >
                  -
                </button>
              </span>
              <input 
                className="stepper form-control" 
                type="text" 
                value={quantity}
                readOnly
              />
              <span className="input-group-btn input-group-append">
                <button 
                  className="btn btn-primary bootstrap-touchspin-up" 
                  type="button"
                  onClick={() => onQuantityChange(quantity + 1)}
                >
                  +
                </button>
              </span>
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
  onAddToCart: PropTypes.func.isRequired,
  onFavoriteClick: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool,
  discount: PropTypes.string,
  productUrl: PropTypes.string,
  onQuantityChange: PropTypes.func.isRequired,
  quantity: PropTypes.number
};

export default VerticalMenuCard;
