import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faAppleWhole, 
  faFish, 
  faDrumstickBite, 
  faPizzaSlice 
} from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

const categories = [/* ... same categories array ... */];

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
      overlay: 'rgba(0,0,0,0.5)',
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
  const handleClick = (category) => {
    if (onCategoryClick) {
      onCategoryClick(category);
    }
  };

  return (
    <div 
      className={`categories-box p-0 m-0 ${containerClassName || ''}`}
      style={{
        width: ui.container.width,
        padding: ui.container.padding,
        margin: ui.container.margin,
        backgroundColor: ui.container.backgroundColor,
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
            <SwiperSlide key={category.id}>
              <div 
                onClick={() => handleClick(category)}
                className="cursor-pointer"
              >
                <div
                  className={`categore-box ${category.backgroundColor} ${cardClassName || ''}`}
                  style={{ 
                    width: ui.card.width,
                    height: ui.card.height,
                    borderRadius: ui.card.borderRadius,
                    padding: ui.card.padding,
                    margin: ui.card.margin,
                    boxShadow: ui.card.shadow,
                    backgroundColor: ui.card.backgroundColor,
                    backgroundImage: `linear-gradient(${ui.card.overlay}, ${ui.card.overlay}), url(${category.bgImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: ui.card.transition,
                    '&:hover': {
                      transform: ui.card.hoverTransform
                    },
                    ...cardStyle
                  }}
                >
                  <FontAwesomeIcon 
                    icon={category.icon} 
                    style={{
                      color: ui.icon.color,
                      marginBottom: ui.icon.marginBottom
                    }}
                    size={ui.icon.size}
                  />
                  <h6 
                    style={{
                      fontSize: ui.text.titleSize,
                      color: ui.text.titleColor,
                      fontWeight: ui.text.titleWeight,
                      margin: 0
                    }}
                  >
                    {category.name}
                  </h6>
                  {showItemCount && (
                    <span
                      style={{
                        fontSize: ui.text.countSize,
                        color: ui.text.countColor,
                        fontWeight: ui.text.countWeight
                      }}
                    >
                      {category.items} Items
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
      overlay: PropTypes.string,
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