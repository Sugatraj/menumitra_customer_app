import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import PropTypes from 'prop-types';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

const categories = [/* ... same categories array ... */];

const DEFAULT_IMAGE = 'https://as2.ftcdn.net/jpg/02/79/12/03/1000_F_279120368_WzIoR2LV2Cgy33oxy6eEKQYSkaWr8AFU.jpg';

const CategorySwiper = ({ 
  onCategoryClick,
  containerClassName,
  containerStyle,
  cardClassName,
  cardStyle,
  // UI Customization Props
  ui = {
    card: {
      width: '100%',
      height: '140px',
      borderRadius: '12px',
      padding: '20px',
      margin: '5px',
      shadow: '0 2px 8px rgba(0,0,0,0.1)',
      transition: 'transform 0.3s ease',
      hoverTransform: 'translateY(-3px)',
      backgroundColor: 'transparent'
    },
    container: {
      width: '100%',
      padding: '0',
      margin: '20px 0',
      backgroundColor: 'transparent'
    },
    icon: {
      size: '2x',
      color: 'white',
      marginBottom: '8px'
    },
    text: {
      titleSize: '14px',
      titleColor: 'white',
      titleWeight: '500',
      countSize: '12px',
      countColor: 'white',
      countWeight: '400'
    }
  },
  breakpoints = {
    320: { slidesPerView: 2.5 },
    576: { slidesPerView: 3.5 },
    768: { slidesPerView: 4.5 }
  },
  showItemCount = true,
  categories: customCategories = categories
}) => {
  const [imageErrors, setImageErrors] = useState({});

  const handleClick = (category) => {
    if (onCategoryClick) {
      onCategoryClick(category);
    }
  };

  const handleImageError = (categoryId) => {
    setImageErrors(prev => ({
      ...prev,
      [categoryId]: true
    }));
  };

  return (
    <div 
      className={`categories-box p-0 m-0 ${containerClassName || ''}`}
      style={{
        width: ui.container.width,
        padding: ui.container.padding,
        margin: ui.container.margin,
        // backgroundColor: ui.container.backgroundColor,
        ...containerStyle
      }}
    >
      <div className="swiper-btn-center-lr">
        <Swiper
          spaceBetween={15}
          slidesPerView={3.5}
          className="categorie-swiper"
          breakpoints={breakpoints}
        >
          {customCategories.map((category) => (
            <SwiperSlide key={category.menuCatId}>
              <div 
                onClick={() => handleClick(category)}
                className="cursor-pointer"
              >
                <div
                  className="categore-box"
                  style={{ 
                    width: '100%',
                    height: '160px',
                    borderRadius: '16px',
                    padding: '25px 15px',
                    margin: '8px',
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
                    backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.8)), url(${imageErrors[category.menuCatId] ? DEFAULT_IMAGE : category.image || DEFAULT_IMAGE})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: '0.3s',
                    position: 'relative'
                  }}
                >
                  <img 
                    src={category.image}
                    alt=""
                    style={{ display: 'none' }}
                    onError={() => handleImageError(category.menuCatId)}
                  />
                  <h6 
                    style={{
                      fontSize: '16px',
                      color: '#FFFFFF',
                      fontWeight: '600',
                      margin: '0px',
                      textShadow: '0px 1px 2px rgba(0, 0, 0, 0.3)'
                    }}
                  >
                    {category.categoryName}
                  </h6>
                  {showItemCount && (
                    <span
                      style={{
                        fontSize: '14px',
                        color: 'rgba(255, 255, 255, 0.8)',
                        fontWeight: '400',
                        textShadow: '0px 1px 2px rgba(0, 0, 0, 0.3)'
                      }}
                    >
                      {category.menuCount} Items
                    </span>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

// Add CSS to remove the :after pseudo-element
const styles = `
  .categore-box:after {
    content: none !important;
    background: none !important;
  }
`;

// Add the styles to the document
const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

CategorySwiper.propTypes = {
  onCategoryClick: PropTypes.func,
  containerClassName: PropTypes.string,
  containerStyle: PropTypes.object,
  cardClassName: PropTypes.string,
  cardStyle: PropTypes.object,
  ui: PropTypes.shape({
    card: PropTypes.shape({
      width: PropTypes.string,
      height: PropTypes.string,
      borderRadius: PropTypes.string,
      padding: PropTypes.string,
      margin: PropTypes.string,
      shadow: PropTypes.string,
      transition: PropTypes.string,
      hoverTransform: PropTypes.string,
      backgroundColor: PropTypes.string
    }),
    container: PropTypes.shape({
      width: PropTypes.string,
      padding: PropTypes.string,
      margin: PropTypes.string,
      backgroundColor: PropTypes.string
    }),
    icon: PropTypes.shape({
      size: PropTypes.string,
      color: PropTypes.string,
      marginBottom: PropTypes.string
    }),
    text: PropTypes.shape({
      titleSize: PropTypes.string,
      titleColor: PropTypes.string,
      titleWeight: PropTypes.string,
      countSize: PropTypes.string,
      countColor: PropTypes.string,
      countWeight: PropTypes.string
    })
  }),
  breakpoints: PropTypes.object,
  showItemCount: PropTypes.bool,
  categories: PropTypes.array
};

export default CategorySwiper;