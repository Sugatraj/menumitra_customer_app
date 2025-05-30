import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import PropTypes from 'prop-types';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

const defaultBanners = [
  {
    id: 1,
    title: '20% OFF',
    subtitle: 'Happy Weekend',
    description: '*for All Menus',
    bgImage: 'assets/images/background/bg2.png'
  },
  {
    id: 2,
    title: '25% OFF',
    subtitle: 'Happy Weekend',
    description: '*for All Menus',
    bgImage: 'assets/images/background/bg3.png'
  },
  {
    id: 3,
    title: '15% OFF',
    subtitle: 'Happy Weekend',
    description: '*for All Menus',
    bgImage: 'assets/images/background/bg4.png'
  }
];

const BannerSwiper = ({ 
  banners = defaultBanners,
  onBannerClick
}) => {
  return (
    <div className="m-b10">
      <div className="swiper-btn-center-lr">
        <Swiper
          spaceBetween={15}
          slidesPerView={1.2}
          className="tag-group mt-4 recomand-swiper"
          breakpoints={{
            320: { slidesPerView: 1.2 },
            576: { slidesPerView: 1.5 },
            768: { slidesPerView: 2.2 }
          }}
        >
          {banners.map((banner) => (
            <SwiperSlide key={banner.id}>
              <div 
                className="card add-banner" 
                style={{ backgroundImage: `url(${banner.bgImage})` }}
                onClick={() => onBannerClick?.(banner)}
              >
                <div className="circle-1"></div>
                <div className="circle-2"></div>
                <div className="card-body">
                  <div className="card-info">
                    <span className="font-12 font-w500 text-dark">
                      {banner.subtitle}
                    </span>
                    <h1 
                      data-text={banner.title} 
                      className="title mb-2"
                    >
                      {banner.title}
                    </h1>
                    <small>{banner.description}</small>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

BannerSwiper.propTypes = {
  banners: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      subtitle: PropTypes.string.isRequired,
      description: PropTypes.string,
      bgImage: PropTypes.string.isRequired
    })
  ),
  onBannerClick: PropTypes.func
};

export default BannerSwiper;