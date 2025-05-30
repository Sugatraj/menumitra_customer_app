import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import Footer from '../components/Footer'
import Header from '../components/Header'
import CategorySwiper from '../components/CategorySwiper/CategorySwiper'
import { 
  faAppleWhole, 
  faFish, 
  faDrumstickBite, 
  faPizzaSlice,
  faBreadSlice,
  faMartiniGlass,
  faCookie,
  faCarrot
} from '@fortawesome/free-solid-svg-icons';
import BannerSwiper from '../components/BannerSwiper/BannerSwiper';
import apiClient from '../services/apiService';

function Home() {
   const [categories, setCategories] = useState([]);


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiClient.post('get_category_list_with_image', { outlet_id: 1 });
        setCategories(response.detail.menu_list);
      } catch (err) {
        setError('Failed to fetch categories');
        console.error(err);
      }
    };

    fetchCategories();
  }, []);

const foodCategories = [
    {
      id: 1,
      name: 'Fresh Fruits',
      items: 86,
      bgImage: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=300&auto=format&fit=crop',
      icon: faAppleWhole,
      backgroundColor: 'bg-primary'
    },
    {
      id: 2,
      name: 'Seafood',
      items: 45,
      bgImage: 'https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?w=300&auto=format&fit=crop',
      icon: faFish,
      backgroundColor: 'bg-2'
    },
    {
      id: 3,
      name: 'Fresh Meat',
      items: 52,
      bgImage: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=300&auto=format&fit=crop',
      icon: faDrumstickBite,
      backgroundColor: 'bg-3'
    },
    {
      id: 4,
      name: 'Pizza & Fast Food',
      items: 64,
      bgImage: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&auto=format&fit=crop',
      icon: faPizzaSlice,
      backgroundColor: 'bg-4'
    },
    {
      id: 5,
      name: 'Fresh Bakery',
      items: 73,
      bgImage: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&auto=format&fit=crop',
      icon: faBreadSlice,
      backgroundColor: 'bg-5'
    },
    {
      id: 6,
      name: 'Beverages',
      items: 48,
      bgImage: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=300&auto=format&fit=crop',
      icon: faMartiniGlass,
      backgroundColor: 'bg-6'
    },
    {
      id: 7,
      name: 'Snacks',
      items: 91,
      bgImage: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=300&auto=format&fit=crop',
      icon: faCookie,
      backgroundColor: 'bg-7'
    },
    {
      id: 8,
      name: 'Vegetables',
      items: 78,
      bgImage: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&auto=format&fit=crop',
      icon: faCarrot,
      backgroundColor: 'bg-8'
    }
  ];

  // Optional: Custom banners data
  const customBanners = [
    {
      id: 1,
      title: '30% OFF',
      subtitle: 'Weekend Special',
      description: '*on Selected Items',
      bgImage: 'assets/images/background/bg2.png'
    },
    {
      id: 2,
      title: 'FREE DELIVERY',
      subtitle: 'First Order',
      description: '*min order $30',
      bgImage: 'assets/images/background/bg3.png'
    },
    {
      id: 3,
      title: '15% OFF',
      subtitle: 'Happy Hours',
      description: '*limited time offer',
      bgImage: 'assets/images/background/bg4.png'
    }
  ];

  const handleBannerClick = (banner) => {
    console.log('Banner clicked:', banner);
    // Add your navigation or action logic here
  };

  const handleCategoryClick = (category) => {
    console.log('Selected category:', category.name);
    // Add your navigation or other logic here
  };
  return (
    <>


    <div className="page-wraper">
  {/* Preloader */}
  <div id="preloader" style={{ display: "none" }}>
    <div className="loader">
      <span />
      <span />
      <span />
      <span />
      <span />
    </div>
  </div>
  {/* Preloader end*/}
  {/* Header */}
  {/* <header className="header"> */}
    <Header/>
  {/* </header> */}
  {/* Header */}
  {/* Sidebar */}
  {/* <div className="dark-overlay" />
  <div className="sidebar style-2">
    <a href="index.html" className="side-menu-logo">
      <img src="assets/images/logo-sidebar.svg" alt="logo" />
    </a>
    <ul className="nav navbar-nav">
      <li className="nav-label">Main Menu</li>
      <li>
        <a className="nav-link" href="index.html">
          <span className="dz-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="#000000"
            >
              <path d="M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z" />
            </svg>
          </span>
          <span>Home</span>
        </a>
      </li>
      <li>
        <a className="nav-link" href="package.html">
          <span className="dz-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="#000000"
            >
              <path d="M12.6 18.06c-.36.28-.87.28-1.23 0l-6.15-4.78c-.36-.28-.86-.28-1.22 0-.51.4-.51 1.17 0 1.57l6.76 5.26c.72.56 1.73.56 2.46 0l6.76-5.26c.51-.4.51-1.17 0-1.57l-.01-.01c-.36-.28-.86-.28-1.22 0l-6.15 4.79zm.63-3.02l6.76-5.26c.51-.4.51-1.18 0-1.58l-6.76-5.26c-.72-.56-1.73-.56-2.46 0L4.01 8.21c-.51.4-.51 1.18 0 1.58l6.76 5.26c.72.56 1.74.56 2.46-.01z" />
            </svg>
          </span>
          <span>Package</span>
        </a>
      </li>
      <li>
        <a className="nav-link" href="pages.html">
          <span className="dz-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="#000000"
            >
              <path d="M12.6 18.06c-.36.28-.87.28-1.23 0l-6.15-4.78c-.36-.28-.86-.28-1.22 0-.51.4-.51 1.17 0 1.57l6.76 5.26c.72.56 1.73.56 2.46 0l6.76-5.26c.51-.4.51-1.17 0-1.57l-.01-.01c-.36-.28-.86-.28-1.22 0l-6.15 4.79zm.63-3.02l6.76-5.26c.51-.4.51-1.18 0-1.58l-6.76-5.26c-.72-.56-1.73-.56-2.46 0L4.01 8.21c-.51.4-.51 1.18 0 1.58l6.76 5.26c.72.56 1.74.56 2.46-.01z" />
            </svg>
          </span>
          <span>Pages</span>
        </a>
      </li>
      <li>
        <a className="nav-link" href="ui-components.html">
          <span className="dz-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="#000000"
            >
              <path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z" />
            </svg>
          </span>
          <span>Components</span>
        </a>
      </li>
      <li>
        <a className="nav-link" href="profile.html">
          <span className="dz-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="#000000"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v1c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-1c0-2.66-5.33-4-8-4z" />
            </svg>
          </span>
          <span>Profile</span>
        </a>
      </li>
      <li>
        <a className="nav-link" href="chat.html">
          <span className="dz-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="#000000"
            >
              <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM7 9h10c.55 0 1 .45 1 1s-.45 1-1 1H7c-.55 0-1-.45-1-1s.45-1 1-1zm6 5H7c-.55 0-1-.45-1-1s.45-1 1-1h6c.55 0 1 .45 1 1s-.45 1-1 1zm4-6H7c-.55 0-1-.45-1-1s.45-1 1-1h10c.55 0 1 .45 1 1s-.45 1-1 1z" />
            </svg>
          </span>
          <span>Chat</span>
          <span className="badge badge-circle badge-info">5</span>
        </a>
      </li>
      <li>
        <a className="nav-link" href="welcome.html">
          <span className="dz-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              enableBackground="new 0 0 24 24"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="#000000"
            >
              <g />
              <g>
                <g>
                  <path d="M5,5h6c0.55,0,1-0.45,1-1v0c0-0.55-0.45-1-1-1H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h6c0.55,0,1-0.45,1-1v0 c0-0.55-0.45-1-1-1H5V5z" />
                  <path d="M20.65,11.65l-2.79-2.79C17.54,8.54,17,8.76,17,9.21V11h-7c-0.55,0-1,0.45-1,1v0c0,0.55,0.45,1,1,1h7v1.79 c0,0.45,0.54,0.67,0.85,0.35l2.79-2.79C20.84,12.16,20.84,11.84,20.65,11.65z" />
                </g>
              </g>
            </svg>
          </span>
          <span>Logout</span>
        </a>
      </li>
      <li className="nav-label">Settings</li>
      <li
        className="nav-color"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasBottom"
        aria-controls="offcanvasBottom"
      >
        <a href="javascript:void(0);" className="nav-link">
          <span className="dz-icon">
            <svg
              className="color-plate"
              xmlns="http://www.w3.org/2000/svg"
              height="30px"
              viewBox="0 0 24 24"
              width="30px"
              fill="#000000"
            >
              <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
            </svg>
          </span>
          <span>Color Theme</span>
        </a>
      </li>
      <li>
        <div className="mode">
          <span className="dz-icon">
            <svg
              className="dark"
              xmlns="http://www.w3.org/2000/svg"
              enableBackground="new 0 0 24 24"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="#000000"
            >
              <g />
              <g>
                <g>
                  <g>
                    <path d="M11.57,2.3c2.38-0.59,4.68-0.27,6.63,0.64c0.35,0.16,0.41,0.64,0.1,0.86C15.7,5.6,14,8.6,14,12s1.7,6.4,4.3,8.2 c0.32,0.22,0.26,0.7-0.09,0.86C16.93,21.66,15.5,22,14,22c-6.05,0-10.85-5.38-9.87-11.6C4.74,6.48,7.72,3.24,11.57,2.3z" />
                  </g>
                </g>
              </g>
            </svg>
          </span>
          <span className="text-dark">Dark Mode</span>
          <div className="custom-switch">
            <input
              type="checkbox"
              className="switch-input theme-btn"
              id="toggle-dark-menu"
            />
            <label className="custom-switch-label" htmlFor="toggle-dark-menu" />
          </div>
        </div>
      </li>
    </ul>
    <a
      href="javascript:void(0);"
      onClick="deleteAllCookie()"
      className="btn btn-primary btn-sm cookie-btn"
    >
      Delete Cookie
    </a>
    <div className="sidebar-bottom d-none">
      <h6 className="name">W3Grocery - Multipurpose App</h6>
      <span className="ver-info">App Version 1.0</span>
    </div>
    <div className="author-box mt-auto mb-0">
      <div className="dz-media">
        <img src="assets/images/avatar/5.jpg" alt="author-image" />
      </div>
      <div className="dz-info">
        <h5 className="name">James Hawkins</h5>
        <span>jameshawkins@mail.com</span>
      </div>
    </div>
  </div> */}
  {/* Sidebar End */}
  {/* Banner */}
  <div className="author-notification">
    <div className="container inner-wrapper">
      <div className="dz-info">
        <span className="text-dark d-block">Good Morning</span>
        <h2 className="name mb-0 title">Louis A. 👋</h2>
      </div>
      <a href="notification.html" className="notify-cart">
        <span className="font-18 font-w600 text-dark">6</span>
        <div className="badge">
          <svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.8574 17.4858C20.0734 14.5109 19 13.212 19 9.99997C18.9982 8.31756 18.3909 6.692 17.2892 5.42046C16.1876 4.14893 14.665 3.31636 13 3.07497V2.99997C13 2.73475 12.8947 2.4804 12.7071 2.29286C12.5196 2.10533 12.2653 1.99997 12 1.99997C11.7348 1.99997 11.4805 2.10533 11.2929 2.29286C11.1054 2.4804 11 2.73475 11 2.99997V3.07917C9.32471 3.39641 7.81116 4.28459 6.71715 5.59244C5.62313 6.9003 5.01632 8.54695 5.00004 10.252C5.00004 13.212 3.73804 14.826 2.14264 17.4859C2.05169 17.6376 2.00263 17.8107 2.00044 17.9876C1.99826 18.1645 2.04303 18.3388 2.1302 18.4927C2.21737 18.6467 2.3438 18.7747 2.49661 18.8638C2.64943 18.9529 2.82314 18.9999 3.00004 19H21C21.1769 18.9999 21.3507 18.9529 21.5035 18.8638C21.6563 18.7747 21.7828 18.6466 21.8699 18.4927C21.9571 18.3388 22.0019 18.1644 21.9997 17.9875C21.9975 17.8106 21.9484 17.6375 21.8574 17.4858Z"
              fill="white"
            />
            <path
              d="M14 20H10C9.73478 20 9.48043 20.1054 9.29289 20.2929C9.10536 20.4804 9 20.7348 9 21C9 21.2652 9.10536 21.5196 9.29289 21.7071C9.48043 21.8947 9.73478 22 10 22H14C14.2652 22 14.5196 21.8947 14.7071 21.7071C14.8946 21.5196 15 21.2652 15 21C15 20.7348 14.8946 20.4804 14.7071 20.2929C14.5196 20.1054 14.2652 20 14 20Z"
              fill="white"
            />
          </svg>
        </div>
      </a>
    </div>
  </div>
  {/* Banner End */}
  {/* Page Content */}
  <div className="page-content">
    <div className="content-inner pt-0">
      <div className="container p-b30">
        {/* Search */}
        <div className="search-box mb-4">
          <div className="mb-3 input-group input-radius">
            <span className="input-group-text">
              <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.9395 1.9313C5.98074 1.9313 1.94141 5.97063 1.94141 10.9294C1.94141 15.8881 5.98074 19.9353 10.9395 19.9353C13.0575 19.9353 15.0054 19.193 16.5449 17.9606L20.293 21.7067C20.4821 21.888 20.7347 21.988 20.9967 21.9854C21.2587 21.9827 21.5093 21.8775 21.6947 21.6924C21.8801 21.5073 21.9856 21.2569 21.9886 20.9949C21.9917 20.7329 21.892 20.4802 21.7109 20.2908L17.9629 16.5427C19.1963 15.0008 19.9395 13.0498 19.9395 10.9294C19.9395 5.97063 15.8982 1.9313 10.9395 1.9313ZM10.9395 3.93134C14.8173 3.93134 17.9375 7.05153 17.9375 10.9294C17.9375 14.8072 14.8173 17.9352 10.9395 17.9352C7.06162 17.9352 3.94141 14.8072 3.94141 10.9294C3.94141 7.05153 7.06162 3.93134 10.9395 3.93134Z"
                  fill="#7D8FAB"
                />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search beverages or foods"
              className="form-control main-in ps-0 bs-0"
            />
          </div>
        </div>
        {/* Search */}
        {/* Dashboard Area */}
        <div className="dashboard-area">
          {/* Recent */}
          {/* <div className="m-b10">
            <div className="swiper-btn-center-lr">
              <div className="swiper tag-group mt-4 recomand-swiper swiper-initialized swiper-horizontal swiper-ios swiper-watch-progress swiper-backface-hidden">
                <div
                  className="swiper-wrapper"
                  id="swiper-wrapper-d6c557aef3136b37"
                  aria-live="polite"
                  style={{
                    transitionDuration: "0ms",
                    transform: "translate3d(-696.667px, 0px, 0px)"
                  }}
                >
                  <div
                    className="swiper-slide swiper-slide-duplicate swiper-slide-duplicate-next"
                    data-swiper-slide-index={1}
                    role="group"
                    aria-label="2 / 3"
                    style={{ width: "356.667px", marginRight: 10 }}
                  >
                    <div
                      className="card add-banner"
                      style={{
                        backgroundImage: "url(assets/images/background/bg3.png)"
                      }}
                    >
                      <div className="circle-1" />
                      <div className="circle-2" />
                      <div className="card-body">
                        <div className="card-info">
                          <span className="font-12 font-w500 text-dark">
                            Happy Weekend
                          </span>
                          <h1 data-text="25% OFF" className="title mb-2">
                            25% OFF
                          </h1>
                          <small>*for All Menus</small>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="swiper-slide swiper-slide-duplicate swiper-slide-visible swiper-slide-prev"
                    data-swiper-slide-index={2}
                    role="group"
                    aria-label="3 / 3"
                    style={{ width: "356.667px", marginRight: 10 }}
                  >
                    <div
                      className="card add-banner"
                      style={{
                        backgroundImage: "url(assets/images/background/bg4.png)"
                      }}
                    >
                      <div className="circle-1" />
                      <div className="circle-2" />
                      <div className="card-body">
                        <div className="card-info">
                          <span className="font-12 font-w500 text-dark">
                            Happy Weekend
                          </span>
                          <h1 data-text="15% OFF" className="title mb-2">
                            15% OFF
                          </h1>
                          <small>*for All Menus</small>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="swiper-slide swiper-slide-visible swiper-slide-active"
                    data-swiper-slide-index={0}
                    role="group"
                    aria-label="1 / 3"
                    style={{ width: "356.667px", marginRight: 10 }}
                  >
                    <div
                      className="card add-banner"
                      style={{
                        backgroundImage: "url(assets/images/background/bg2.png)"
                      }}
                    >
                      <div className="circle-1" />
                      <div className="circle-2" />
                      <div className="card-body">
                        <div className="card-info">
                          <span className="font-12 font-w500 text-dark">
                            Happy Weekend
                          </span>
                          <h1 data-text="20% OFF" className="title mb-2">
                            20% OFF
                          </h1>
                          <small>*for All Menus</small>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="swiper-slide swiper-slide-next"
                    data-swiper-slide-index={1}
                    role="group"
                    aria-label="2 / 3"
                    style={{ width: "356.667px", marginRight: 10 }}
                  >
                    <div
                      className="card add-banner"
                      style={{
                        backgroundImage: "url(assets/images/background/bg3.png)"
                      }}
                    >
                      <div className="circle-1" />
                      <div className="circle-2" />
                      <div className="card-body">
                        <div className="card-info">
                          <span className="font-12 font-w500 text-dark">
                            Happy Weekend
                          </span>
                          <h1 data-text="25% OFF" className="title mb-2">
                            25% OFF
                          </h1>
                          <small>*for All Menus</small>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="swiper-slide swiper-slide-duplicate-prev"
                    data-swiper-slide-index={2}
                    role="group"
                    aria-label="3 / 3"
                    style={{ width: "356.667px", marginRight: 10 }}
                  >
                    <div
                      className="card add-banner"
                      style={{
                        backgroundImage: "url(assets/images/background/bg4.png)"
                      }}
                    >
                      <div className="circle-1" />
                      <div className="circle-2" />
                      <div className="card-body">
                        <div className="card-info">
                          <span className="font-12 font-w500 text-dark">
                            Happy Weekend
                          </span>
                          <h1 data-text="15% OFF" className="title mb-2">
                            15% OFF
                          </h1>
                          <small>*for All Menus</small>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="swiper-slide swiper-slide-duplicate swiper-slide-duplicate-active"
                    data-swiper-slide-index={0}
                    role="group"
                    aria-label="1 / 3"
                    style={{ width: "356.667px", marginRight: 10 }}
                  >
                    <div
                      className="card add-banner"
                      style={{
                        backgroundImage: "url(assets/images/background/bg2.png)"
                      }}
                    >
                      <div className="circle-1" />
                      <div className="circle-2" />
                      <div className="card-body">
                        <div className="card-info">
                          <span className="font-12 font-w500 text-dark">
                            Happy Weekend
                          </span>
                          <h1 data-text="20% OFF" className="title mb-2">
                            20% OFF
                          </h1>
                          <small>*for All Menus</small>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="swiper-slide swiper-slide-duplicate swiper-slide-duplicate-next"
                    data-swiper-slide-index={1}
                    role="group"
                    aria-label="2 / 3"
                    style={{ width: "356.667px", marginRight: 10 }}
                  >
                    <div
                      className="card add-banner"
                      style={{
                        backgroundImage: "url(assets/images/background/bg3.png)"
                      }}
                    >
                      <div className="circle-1" />
                      <div className="circle-2" />
                      <div className="card-body">
                        <div className="card-info">
                          <span className="font-12 font-w500 text-dark">
                            Happy Weekend
                          </span>
                          <h1 data-text="25% OFF" className="title mb-2">
                            25% OFF
                          </h1>
                          <small>*for All Menus</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <span
                  className="swiper-notification"
                  aria-live="assertive"
                  aria-atomic="true"
                />
              </div>
            </div>
          </div> */}
         {/* <BannerSwiper 
        banners={customBanners}
        onBannerClick={handleBannerClick}
        autoplayDelay={3000} // 3 seconds
        pauseOnHover={false} // Don't pause on hover
        disableOnInteraction={true} // Stop autoplay after user interaction
      /> */}
          {/* Recent */}
          {/* Categorie */}
          <div className="title-bar mt-0">
            <span className="title mb-0 font-18">Categories</span>
            <Link className="btn-link" to="/categories">
              <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.25005 20.25C8.05823 20.25 7.86623 20.1767 7.7198 20.0303C7.42673 19.7372 7.42673 19.2626 7.7198 18.9698L14.6895 12L7.7198 5.03025C7.42673 4.73719 7.42673 4.26263 7.7198 3.96975C8.01286 3.67688 8.48742 3.67669 8.7803 3.96975L16.2803 11.4698C16.5734 11.7628 16.5734 12.2374 16.2803 12.5303L8.7803 20.0303C8.63386 20.1767 8.44186 20.25 8.25005 20.25Z"
                  fill="#7D8FAB"
                />
              </svg>
            </Link>
          </div>
          <CategorySwiper 
        categories={foodCategories}
        onCategoryClick={handleCategoryClick}
        ui={{
          card: {
            width: '100%',
            height: '160px',
            borderRadius: '16px',
            padding: '25px 15px',
            margin: '8px',
            shadow: '0 4px 12px rgba(0,0,0,0.15)',
            overlay: 'rgba(0,0,0,0.6)',
            transition: 'all 0.3s ease',
            hoverTransform: 'translateY(-5px) scale(1.02)',
            backgroundColor: '#ffffff'
          },
          container: {
            width: '100%',
            padding: '20px',
            margin: '30px 0',
            backgroundColor: '#f5f5f5'
          },
          icon: {
            size: '3x',
            color: '#ffffff',
            marginBottom: '12px'
          },
          text: {
            titleSize: '16px',
            titleColor: '#ffffff',
            titleWeight: '600',
            countSize: '14px',
            countColor: 'rgba(255,255,255,0.8)',
            countWeight: '400'
          }
        }}
        breakpoints={{
          320: { slidesPerView: 1.5 },
          480: { slidesPerView: 2.5 },
          768: { slidesPerView: 3.5 },
          1024: { slidesPerView: 4.5 }
        }}
      />
          {/* <div className="categories-box">
            <div className="swiper-btn-center-lr">
              <div className="swiper categorie-swiper swiper-initialized swiper-horizontal swiper-ios swiper-watch-progress">
                <div
                  className="swiper-wrapper"
                  id="swiper-wrapper-6c1011cdad8547b09"
                  aria-live="polite"
                  style={{
                    transitionDuration: "0ms",
                    transform: "translate3d(-408px, 0px, 0px)"
                  }}
                >
                  <div
                    className="swiper-slide swiper-slide-duplicate swiper-slide-duplicate-active"
                    data-swiper-slide-index={0}
                    role="group"
                    aria-label="1 / 4"
                  >
                    <a href="product-categorie.html">
                      <div
                        className="categore-box"
                        style={{
                          backgroundImage:
                            "url(assets/images/background/small/bg1.png)"
                        }}
                      >
                        <svg
                          width={24}
                          height={24}
                          viewBox="0 0 19 23"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M18.9488 7.87554C18.9488 5.85452 17.3047 4.21039 15.2837 4.21039C14.1548 4.21039 13.1438 4.72381 12.4709 5.52889C11.9729 4.93307 11.2896 4.4979 10.5105 4.31145V4.25301C10.5105 3.38351 11.2178 2.67615 12.0873 2.67615C12.5581 2.67615 12.9397 2.29458 12.9397 1.82379C12.9397 1.35299 12.5581 0.971428 12.0873 0.971428C10.2779 0.971428 8.80573 2.44358 8.80573 4.25301V4.31145C8.02662 4.4979 7.34324 4.93307 6.8453 5.52889C6.17241 4.72381 5.16139 4.21039 4.03252 4.21039C2.01149 4.21039 0.367371 5.85452 0.367371 7.87554C0.367371 9.80417 1.86499 11.3884 3.75816 11.5294C3.39291 12.0992 3.18016 12.7756 3.18016 13.5011C3.18016 15.4297 4.67778 17.0139 6.57095 17.1549C6.2057 17.7248 5.99294 18.4012 5.99294 19.1267C5.99294 21.1477 7.63707 22.7918 9.65809 22.7918C11.6791 22.7918 13.3232 21.1477 13.3232 19.1267C13.3232 18.4012 13.1105 17.7248 12.7452 17.1549C14.6384 17.0139 16.136 15.4297 16.136 13.5011C16.136 12.7756 15.9233 12.0992 15.558 11.5294C17.4512 11.3884 18.9488 9.80417 18.9488 7.87554ZM9.6521 5.91528C9.6541 5.91528 9.65609 5.91561 9.65809 5.91561C9.66009 5.91561 9.66209 5.91528 9.66408 5.91528C10.7424 5.91861 11.6185 6.79661 11.6185 7.87554C11.6185 8.95647 10.739 9.83597 9.65809 9.83597C8.57716 9.83597 7.69766 8.95647 7.69766 7.87554C7.69766 6.79661 8.57383 5.91861 9.6521 5.91528ZM4.03252 9.83597C2.95159 9.83597 2.07209 8.95647 2.07209 7.87554C2.07209 6.79461 2.95159 5.91511 4.03252 5.91511C5.11345 5.91511 5.99294 6.79461 5.99294 7.87554C5.99294 8.95647 5.11345 9.83597 4.03252 9.83597ZM6.8453 15.4615C5.76437 15.4615 4.88488 14.582 4.88488 13.5011C4.88488 12.4202 5.76437 11.5407 6.8453 11.5407C7.92624 11.5407 8.80573 12.4202 8.80573 13.5011C8.80573 14.582 7.92624 15.4615 6.8453 15.4615ZM9.65809 21.0871C8.57716 21.0871 7.69766 20.2076 7.69766 19.1267C7.69766 18.0458 8.57716 17.1663 9.65809 17.1663C10.739 17.1663 11.6185 18.0458 11.6185 19.1267C11.6185 20.2076 10.739 21.0871 9.65809 21.0871ZM12.4709 15.4615C11.3899 15.4615 10.5105 14.582 10.5105 13.5011C10.5105 12.4202 11.3899 11.5407 12.4709 11.5407C13.5518 11.5407 14.4313 12.4202 14.4313 13.5011C14.4313 14.582 13.5518 15.4615 12.4709 15.4615ZM15.2837 9.83597C14.2027 9.83597 13.3232 8.95647 13.3232 7.87554C13.3232 6.79461 14.2027 5.91511 15.2837 5.91511C16.3646 5.91511 17.2441 6.79461 17.2441 7.87554C17.2441 8.95647 16.3646 9.83597 15.2837 9.83597Z"
                            fill="white"
                          />
                        </svg>
                        <h6 className="font-14 text-white mb-0">Fruits</h6>
                        <span className="text-white">45 Items</span>
                      </div>
                    </a>
                  </div>
                  <div
                    className="swiper-slide swiper-slide-duplicate swiper-slide-duplicate-next"
                    data-swiper-slide-index={1}
                    role="group"
                    aria-label="2 / 4"
                  >
                    <a href="product-categorie.html">
                      <div
                        className="categore-box bg-2"
                        style={{
                          backgroundImage:
                            "url(assets/images/background/small/bg2.png)"
                        }}
                      >
                        <svg
                          width={23}
                          height={23}
                          viewBox="0 0 23 23"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_359_32)">
                            <path
                              d="M22.3197 11.5459C21.4112 9.97531 20.1046 8.65803 18.5413 7.7365C17.9885 7.41056 17.4079 7.13734 16.808 6.91909C16.5004 6.14443 16.0027 5.45431 15.3442 4.90621C14.3065 4.04238 12.9945 3.63453 11.6498 3.7574C10.3052 3.88039 9.08895 4.51962 8.22513 5.55745C7.98732 5.84312 8.02611 6.26746 8.31182 6.50527L9.23206 7.27133C9.08022 7.34706 8.92867 7.42607 8.7775 7.51041C7.69923 8.11235 6.64818 8.93679 5.71264 9.91198L1.59021 7.61624C1.32048 7.46601 0.982986 7.5186 0.771857 7.74392C0.560642 7.9692 0.529787 8.30929 0.697147 8.56883L2.94499 12.0561L0.705628 15.3611C0.536393 15.611 0.554079 15.9429 0.748971 16.1733C0.943862 16.4037 1.26827 16.4762 1.54264 16.3507L6.12905 14.2534C7.06933 15.1353 8.05837 15.8521 9.07446 16.3875C9.12808 16.4158 9.18173 16.4425 9.23539 16.4697L8.28505 17.2607C8.14786 17.3749 8.06165 17.5389 8.04541 17.7167C8.02917 17.8944 8.08419 18.0713 8.19837 18.2085C9.19673 19.4079 10.6371 20.0273 12.0878 20.0273C13.228 20.0273 14.3746 19.6445 15.3175 18.8597C15.9729 18.3141 16.4691 17.628 16.7769 16.8578C17.3878 16.6377 17.9788 16.3609 18.5412 16.0294C20.1044 15.1079 21.411 13.7906 22.3196 12.2199C22.4403 12.0115 22.4403 11.7544 22.3197 11.5459ZM11.7723 5.09782C12.7588 5.00734 13.7216 5.30694 14.483 5.94076C14.6638 6.09128 14.8276 6.25681 14.9743 6.43427C14.3922 6.33531 13.8003 6.28477 13.2049 6.28477C12.3511 6.28477 11.4946 6.42264 10.643 6.69454L9.73662 5.93999C10.3094 5.46109 11.0129 5.16728 11.7723 5.09782ZM14.4565 17.8251C13.0613 18.9865 11.0582 18.9481 9.71058 17.8254L10.6359 17.0552C11.4962 17.3382 12.3556 17.4811 13.2049 17.4811C13.7897 17.4811 14.3711 17.4325 14.9432 17.3369C14.7976 17.5124 14.6355 17.6761 14.4565 17.8251ZM13.2049 16.1351C10.3521 16.1351 7.93022 14.1539 6.74045 12.973C6.61157 12.8451 6.44021 12.7776 6.26616 12.7776C6.17159 12.7776 6.07621 12.7976 5.98646 12.8386L3.1672 14.1278L4.30884 12.4429C4.46014 12.2195 4.4635 11.9275 4.31732 11.7007L3.28648 10.1015L5.52004 11.3453C5.79548 11.4987 6.14035 11.4403 6.35003 11.205C8.37323 8.93355 10.8717 7.63077 13.2049 7.63077C16.3393 7.63077 19.2712 9.25025 20.9498 11.8829C19.2712 14.5156 16.3394 16.1351 13.2049 16.1351Z"
                              fill="white"
                            />
                            <path
                              d="M16.4618 11.868C17.0499 11.868 17.5267 11.3912 17.5267 10.803C17.5267 10.2149 17.0499 9.73811 16.4618 9.73811C15.8736 9.73811 15.3969 10.2149 15.3969 10.803C15.3969 11.3912 15.8736 11.868 16.4618 11.868Z"
                              fill="white"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_359_32">
                              <rect
                                width="21.8204"
                                height="21.8204"
                                fill="white"
                                transform="translate(0.589783 0.971428)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                        <h6 className="font-14 text-white mb-0">Fish</h6>
                        <span className="text-white">45 Items</span>
                      </div>
                    </a>
                  </div>
                  <div
                    className="swiper-slide swiper-slide-duplicate"
                    data-swiper-slide-index={2}
                    role="group"
                    aria-label="3 / 4"
                  >
                    <a href="product-categorie.html">
                      <div
                        className="categore-box bg-3"
                        style={{
                          backgroundImage:
                            "url(assets/images/background/small/bg3.png)"
                        }}
                      >
                        <svg
                          width={23}
                          height={23}
                          viewBox="0 0 23 23"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_359_47)">
                            <path
                              d="M21.7594 3.01442C21.6162 2.89556 21.4377 2.79362 21.2135 2.70276C20.9515 2.59656 20.7322 2.41458 20.5794 2.17651C20.4487 1.97297 20.3156 1.81622 20.1723 1.69732C19.7785 1.37052 19.281 1.2168 18.7719 1.2644C18.2626 1.31209 17.8023 1.55553 17.4758 1.94987C16.997 2.52828 16.9072 3.30649 17.2021 3.95811L16.0617 5.336C15.0224 5.3054 14.0499 5.74223 13.3815 6.54396C13.2128 6.7464 13.0008 6.90297 12.7625 7.00496C12.1175 6.83803 11.2655 6.81126 10.7867 6.81126C6.3528 6.81126 2.74553 10.4431 2.74553 14.9071C2.74553 15.7756 2.38916 16.1321 1.8959 16.6256C1.33215 17.1895 0.630615 17.8913 0.630615 19.3811C0.630615 19.4904 0.636837 19.6022 0.649154 19.7134C0.82555 21.3073 2.18579 22.5092 3.8132 22.5092H14.7898V22.5093C14.7918 22.5093 14.7937 22.5092 14.7956 22.5092H14.8504V22.5084C17.8626 22.4717 20.3031 19.7034 20.3031 16.3054C20.3031 14.3601 19.5783 12.4946 18.3943 11.3488C18.3962 11.1448 18.4596 10.9551 18.5739 10.8139C19.1018 10.1618 19.3655 9.33927 19.3165 8.4977C19.2968 8.16089 19.2256 7.83209 19.1087 7.52068L20.0876 6.3538C20.7831 6.52427 21.5319 6.29145 22.0116 5.71197C22.6849 4.89869 22.5718 3.6886 21.7594 3.01442ZM14.3635 7.36261C14.7904 6.85055 15.4181 6.57865 16.0842 6.61645C17.1204 6.67527 17.9795 7.53428 18.0401 8.57211C18.0705 9.09499 17.9072 9.60547 17.5801 10.0095C17.2812 10.3787 17.1162 10.8562 17.1155 11.3552V11.3592C17.1128 12.2369 16.7644 13.0591 16.1345 13.6742C15.5064 14.2877 14.678 14.6165 13.803 14.5976C12.0697 14.562 10.6662 13.1191 10.6744 11.3811C10.6813 9.95037 11.6046 8.70768 12.9722 8.28887C13.5162 8.12223 13.9973 7.80192 14.3635 7.36261ZM9.38379 21.2307H5.6338V20.1457C5.6338 18.6672 7.24442 17.4645 9.22415 17.4645H9.38379V21.2307ZM19.0245 16.3054C19.0245 19.0191 17.1279 21.2271 14.7954 21.2307H10.6624V16.1859H9.22415C7.95179 16.1859 6.74936 16.5798 5.83849 17.2949C4.88197 18.0458 4.35521 19.0582 4.35521 20.1457V21.2307H3.8132C2.83848 21.2307 2.02461 20.5179 1.92002 19.5728C1.91286 19.5081 1.90924 19.4436 1.90924 19.3811C1.90924 18.4207 2.30239 18.0273 2.80017 17.5294C3.34547 16.9839 4.02411 16.305 4.02411 14.9071C4.02411 11.148 7.05779 8.08976 10.7867 8.08976C10.8029 8.08976 10.8188 8.08997 10.8349 8.09006C10.6436 8.26833 10.4668 8.46254 10.3089 8.67171C9.71634 9.4566 9.40063 10.3914 9.39594 11.375C9.38439 13.8069 11.3496 15.826 13.7769 15.8759C13.8088 15.8765 13.8404 15.8768 13.8722 15.8768C15.0578 15.8768 16.1754 15.4215 17.0279 14.5889C17.5003 14.1275 17.8588 13.5823 18.0898 12.9861C18.6745 13.8852 19.0245 15.0863 19.0245 16.3054ZM21.0267 4.89669C20.8266 5.13833 20.4862 5.19877 20.2175 5.04044L19.751 4.76568L18.3947 6.38248C18.3747 6.36151 18.3552 6.3402 18.3346 6.31966C18.0699 6.05509 17.7666 5.83957 17.4383 5.67796L18.8274 3.99962L18.4699 3.59024C18.264 3.35439 18.2601 3.00739 18.4607 2.76511C18.5692 2.63406 18.722 2.55317 18.891 2.53736C19.06 2.52159 19.2249 2.57265 19.3557 2.68115C19.3699 2.69291 19.4225 2.74116 19.5034 2.86722C19.7997 3.32877 20.2249 3.68161 20.733 3.88758C20.8717 3.94384 20.9287 3.98654 20.9429 3.9983C21.2134 4.22277 21.251 4.62581 21.0267 4.89669Z"
                              fill="white"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_359_47">
                              <rect
                                width="21.8204"
                                height="21.8204"
                                fill="white"
                                transform="translate(0.630615 0.971428)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                        <h6 className="font-14 text-white mb-0">Chicken</h6>
                        <span className="text-white">45 Items</span>
                      </div>
                    </a>
                  </div>
                  <div
                    className="swiper-slide swiper-slide-duplicate swiper-slide-visible swiper-slide-prev"
                    data-swiper-slide-index={3}
                    role="group"
                    aria-label="4 / 4"
                  >
                    <a href="product-categorie.html">
                      <div
                        className="categore-box bg-4"
                        style={{
                          backgroundImage:
                            "url(assets/images/background/small/bg4.png)"
                        }}
                      >
                        <svg
                          width={23}
                          height={23}
                          viewBox="0 0 23 23"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_359_59)">
                            <path
                              d="M21.442 5.23551C21.3107 4.4723 20.8559 3.80552 20.1942 3.40612C17.5555 1.81353 14.5353 0.971733 11.46 0.971733C8.38471 0.971733 5.36447 1.81353 2.72583 3.40616C2.06408 3.80556 1.60926 4.47234 1.47796 5.23555C1.3461 6.0019 1.5532 6.78609 2.04619 7.38713C2.28106 7.67346 2.57118 7.90485 2.89603 8.07028L4.90285 11.6064C4.86545 11.7965 4.84533 11.9927 4.84533 12.1937C4.84533 13.5231 5.70437 14.6549 6.89626 15.0653L11.4647 22.7926L20.0233 8.07063C20.3484 7.90515 20.6387 7.67368 20.8738 7.38717C21.3667 6.78609 21.5739 6.0019 21.442 5.23551V5.23551ZM6.13511 12.1936C6.13511 11.2303 6.91879 10.4467 7.88209 10.4467C8.84538 10.4467 9.62906 11.2303 9.62906 12.1936C9.62906 13.1569 8.84538 13.9406 7.88209 13.9406C6.91879 13.9406 6.13511 13.1569 6.13511 12.1936ZM11.4553 20.2424L8.45931 15.1747C9.85859 14.9043 10.9188 13.6708 10.9188 12.1936C10.9188 10.5192 9.55657 9.15689 7.88209 9.15689C6.96797 9.15689 6.14754 9.56343 5.59035 10.2046L4.52542 8.32816C4.86915 8.27442 5.20273 8.15485 5.50609 7.97239C7.28805 6.90058 9.32445 6.32955 11.399 6.31854C11.2668 6.66231 11.1969 7.03067 11.1969 7.40991C11.1969 9.0844 12.5591 10.4467 14.2336 10.4467C15.7526 10.4467 17.0145 9.32568 17.2358 7.86753C17.2955 7.90197 17.3548 7.93688 17.4139 7.97239C17.7137 8.15274 18.0431 8.27179 18.3827 8.32639L15.8867 12.6198C15.4596 12.3992 14.9833 12.2811 14.4937 12.2811C12.8193 12.2811 11.457 13.6434 11.457 15.3179C11.457 16.3654 11.9899 17.3141 12.8378 17.8644L11.4553 20.2424ZM15.9714 7.23725C15.977 7.29452 15.9806 7.35209 15.9806 7.40991C15.9806 8.37321 15.1969 9.15689 14.2336 9.15689C13.2703 9.15689 12.4867 8.37321 12.4867 7.40991C12.4867 7.04185 12.6002 6.69125 12.81 6.39752C13.8981 6.5259 14.9626 6.80892 15.9714 7.23725V7.23725ZM12.7468 15.3179C12.7468 14.3546 13.5304 13.5709 14.4937 13.5709C14.7535 13.5709 15.0066 13.6287 15.2371 13.7372L13.4874 16.7469C13.031 16.4259 12.7468 15.8982 12.7468 15.3179ZM19.8765 6.5691C19.4375 7.10432 18.6813 7.22965 18.0787 6.86713C16.0785 5.6641 13.7898 5.02824 11.4599 5.02824C9.13008 5.02824 6.8414 5.6641 4.84129 6.86713C4.23853 7.2296 3.48246 7.10432 3.04341 6.5691C2.78799 6.25775 2.68068 5.85138 2.74904 5.45426C2.81684 5.06023 3.05128 4.7162 3.3923 4.51039C5.82982 3.03917 8.61958 2.26152 11.46 2.26152C14.3004 2.26152 17.0902 3.03917 19.5277 4.51039C19.8687 4.7162 20.1031 5.06023 20.1709 5.45426C20.2393 5.85138 20.1319 6.25775 19.8765 6.5691V6.5691Z"
                              fill="white"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_359_59">
                              <rect
                                width="21.8208"
                                height="21.8208"
                                fill="white"
                                transform="translate(0.549561 0.971733)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                        <h6 className="font-14 text-white mb-0">Pizzas</h6>
                        <span className="text-white">45 Items</span>
                      </div>
                    </a>
                  </div>
                  <div
                    className="swiper-slide swiper-slide-visible swiper-slide-active"
                    data-swiper-slide-index={0}
                    role="group"
                    aria-label="1 / 4"
                  >
                    <a href="product-categorie.html">
                      <div
                        className="categore-box"
                        style={{
                          backgroundImage:
                            "url(assets/images/background/small/bg1.png)"
                        }}
                      >
                        <svg
                          width={24}
                          height={24}
                          viewBox="0 0 19 23"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M18.9488 7.87554C18.9488 5.85452 17.3047 4.21039 15.2837 4.21039C14.1548 4.21039 13.1438 4.72381 12.4709 5.52889C11.9729 4.93307 11.2896 4.4979 10.5105 4.31145V4.25301C10.5105 3.38351 11.2178 2.67615 12.0873 2.67615C12.5581 2.67615 12.9397 2.29458 12.9397 1.82379C12.9397 1.35299 12.5581 0.971428 12.0873 0.971428C10.2779 0.971428 8.80573 2.44358 8.80573 4.25301V4.31145C8.02662 4.4979 7.34324 4.93307 6.8453 5.52889C6.17241 4.72381 5.16139 4.21039 4.03252 4.21039C2.01149 4.21039 0.367371 5.85452 0.367371 7.87554C0.367371 9.80417 1.86499 11.3884 3.75816 11.5294C3.39291 12.0992 3.18016 12.7756 3.18016 13.5011C3.18016 15.4297 4.67778 17.0139 6.57095 17.1549C6.2057 17.7248 5.99294 18.4012 5.99294 19.1267C5.99294 21.1477 7.63707 22.7918 9.65809 22.7918C11.6791 22.7918 13.3232 21.1477 13.3232 19.1267C13.3232 18.4012 13.1105 17.7248 12.7452 17.1549C14.6384 17.0139 16.136 15.4297 16.136 13.5011C16.136 12.7756 15.9233 12.0992 15.558 11.5294C17.4512 11.3884 18.9488 9.80417 18.9488 7.87554ZM9.6521 5.91528C9.6541 5.91528 9.65609 5.91561 9.65809 5.91561C9.66009 5.91561 9.66209 5.91528 9.66408 5.91528C10.7424 5.91861 11.6185 6.79661 11.6185 7.87554C11.6185 8.95647 10.739 9.83597 9.65809 9.83597C8.57716 9.83597 7.69766 8.95647 7.69766 7.87554C7.69766 6.79661 8.57383 5.91861 9.6521 5.91528ZM4.03252 9.83597C2.95159 9.83597 2.07209 8.95647 2.07209 7.87554C2.07209 6.79461 2.95159 5.91511 4.03252 5.91511C5.11345 5.91511 5.99294 6.79461 5.99294 7.87554C5.99294 8.95647 5.11345 9.83597 4.03252 9.83597ZM6.8453 15.4615C5.76437 15.4615 4.88488 14.582 4.88488 13.5011C4.88488 12.4202 5.76437 11.5407 6.8453 11.5407C7.92624 11.5407 8.80573 12.4202 8.80573 13.5011C8.80573 14.582 7.92624 15.4615 6.8453 15.4615ZM9.65809 21.0871C8.57716 21.0871 7.69766 20.2076 7.69766 19.1267C7.69766 18.0458 8.57716 17.1663 9.65809 17.1663C10.739 17.1663 11.6185 18.0458 11.6185 19.1267C11.6185 20.2076 10.739 21.0871 9.65809 21.0871ZM12.4709 15.4615C11.3899 15.4615 10.5105 14.582 10.5105 13.5011C10.5105 12.4202 11.3899 11.5407 12.4709 11.5407C13.5518 11.5407 14.4313 12.4202 14.4313 13.5011C14.4313 14.582 13.5518 15.4615 12.4709 15.4615ZM15.2837 9.83597C14.2027 9.83597 13.3232 8.95647 13.3232 7.87554C13.3232 6.79461 14.2027 5.91511 15.2837 5.91511C16.3646 5.91511 17.2441 6.79461 17.2441 7.87554C17.2441 8.95647 16.3646 9.83597 15.2837 9.83597Z"
                            fill="white"
                          />
                        </svg>
                        <h6 className="font-14 text-white mb-0">Fruits</h6>
                        <span className="text-white">45 Items</span>
                      </div>
                    </a>
                  </div>
                  <div
                    className="swiper-slide swiper-slide-visible swiper-slide-next"
                    data-swiper-slide-index={1}
                    role="group"
                    aria-label="2 / 4"
                  >
                    <a href="product-categorie.html">
                      <div
                        className="categore-box bg-2"
                        style={{
                          backgroundImage:
                            "url(assets/images/background/small/bg2.png)"
                        }}
                      >
                        <svg
                          width={23}
                          height={23}
                          viewBox="0 0 23 23"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_359_32)">
                            <path
                              d="M22.3197 11.5459C21.4112 9.97531 20.1046 8.65803 18.5413 7.7365C17.9885 7.41056 17.4079 7.13734 16.808 6.91909C16.5004 6.14443 16.0027 5.45431 15.3442 4.90621C14.3065 4.04238 12.9945 3.63453 11.6498 3.7574C10.3052 3.88039 9.08895 4.51962 8.22513 5.55745C7.98732 5.84312 8.02611 6.26746 8.31182 6.50527L9.23206 7.27133C9.08022 7.34706 8.92867 7.42607 8.7775 7.51041C7.69923 8.11235 6.64818 8.93679 5.71264 9.91198L1.59021 7.61624C1.32048 7.46601 0.982986 7.5186 0.771857 7.74392C0.560642 7.9692 0.529787 8.30929 0.697147 8.56883L2.94499 12.0561L0.705628 15.3611C0.536393 15.611 0.554079 15.9429 0.748971 16.1733C0.943862 16.4037 1.26827 16.4762 1.54264 16.3507L6.12905 14.2534C7.06933 15.1353 8.05837 15.8521 9.07446 16.3875C9.12808 16.4158 9.18173 16.4425 9.23539 16.4697L8.28505 17.2607C8.14786 17.3749 8.06165 17.5389 8.04541 17.7167C8.02917 17.8944 8.08419 18.0713 8.19837 18.2085C9.19673 19.4079 10.6371 20.0273 12.0878 20.0273C13.228 20.0273 14.3746 19.6445 15.3175 18.8597C15.9729 18.3141 16.4691 17.628 16.7769 16.8578C17.3878 16.6377 17.9788 16.3609 18.5412 16.0294C20.1044 15.1079 21.411 13.7906 22.3196 12.2199C22.4403 12.0115 22.4403 11.7544 22.3197 11.5459ZM11.7723 5.09782C12.7588 5.00734 13.7216 5.30694 14.483 5.94076C14.6638 6.09128 14.8276 6.25681 14.9743 6.43427C14.3922 6.33531 13.8003 6.28477 13.2049 6.28477C12.3511 6.28477 11.4946 6.42264 10.643 6.69454L9.73662 5.93999C10.3094 5.46109 11.0129 5.16728 11.7723 5.09782ZM14.4565 17.8251C13.0613 18.9865 11.0582 18.9481 9.71058 17.8254L10.6359 17.0552C11.4962 17.3382 12.3556 17.4811 13.2049 17.4811C13.7897 17.4811 14.3711 17.4325 14.9432 17.3369C14.7976 17.5124 14.6355 17.6761 14.4565 17.8251ZM13.2049 16.1351C10.3521 16.1351 7.93022 14.1539 6.74045 12.973C6.61157 12.8451 6.44021 12.7776 6.26616 12.7776C6.17159 12.7776 6.07621 12.7976 5.98646 12.8386L3.1672 14.1278L4.30884 12.4429C4.46014 12.2195 4.4635 11.9275 4.31732 11.7007L3.28648 10.1015L5.52004 11.3453C5.79548 11.4987 6.14035 11.4403 6.35003 11.205C8.37323 8.93355 10.8717 7.63077 13.2049 7.63077C16.3393 7.63077 19.2712 9.25025 20.9498 11.8829C19.2712 14.5156 16.3394 16.1351 13.2049 16.1351Z"
                              fill="white"
                            />
                            <path
                              d="M16.4618 11.868C17.0499 11.868 17.5267 11.3912 17.5267 10.803C17.5267 10.2149 17.0499 9.73811 16.4618 9.73811C15.8736 9.73811 15.3969 10.2149 15.3969 10.803C15.3969 11.3912 15.8736 11.868 16.4618 11.868Z"
                              fill="white"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_359_32">
                              <rect
                                width="21.8204"
                                height="21.8204"
                                fill="white"
                                transform="translate(0.589783 0.971428)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                        <h6 className="font-14 text-white mb-0">Fish</h6>
                        <span className="text-white">45 Items</span>
                      </div>
                    </a>
                  </div>
                  <div
                    className="swiper-slide swiper-slide-visible"
                    data-swiper-slide-index={2}
                    role="group"
                    aria-label="3 / 4"
                  >
                    <a href="product-categorie.html">
                      <div
                        className="categore-box bg-3"
                        style={{
                          backgroundImage:
                            "url(assets/images/background/small/bg3.png)"
                        }}
                      >
                        <svg
                          width={23}
                          height={23}
                          viewBox="0 0 23 23"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_359_47)">
                            <path
                              d="M21.7594 3.01442C21.6162 2.89556 21.4377 2.79362 21.2135 2.70276C20.9515 2.59656 20.7322 2.41458 20.5794 2.17651C20.4487 1.97297 20.3156 1.81622 20.1723 1.69732C19.7785 1.37052 19.281 1.2168 18.7719 1.2644C18.2626 1.31209 17.8023 1.55553 17.4758 1.94987C16.997 2.52828 16.9072 3.30649 17.2021 3.95811L16.0617 5.336C15.0224 5.3054 14.0499 5.74223 13.3815 6.54396C13.2128 6.7464 13.0008 6.90297 12.7625 7.00496C12.1175 6.83803 11.2655 6.81126 10.7867 6.81126C6.3528 6.81126 2.74553 10.4431 2.74553 14.9071C2.74553 15.7756 2.38916 16.1321 1.8959 16.6256C1.33215 17.1895 0.630615 17.8913 0.630615 19.3811C0.630615 19.4904 0.636837 19.6022 0.649154 19.7134C0.82555 21.3073 2.18579 22.5092 3.8132 22.5092H14.7898V22.5093C14.7918 22.5093 14.7937 22.5092 14.7956 22.5092H14.8504V22.5084C17.8626 22.4717 20.3031 19.7034 20.3031 16.3054C20.3031 14.3601 19.5783 12.4946 18.3943 11.3488C18.3962 11.1448 18.4596 10.9551 18.5739 10.8139C19.1018 10.1618 19.3655 9.33927 19.3165 8.4977C19.2968 8.16089 19.2256 7.83209 19.1087 7.52068L20.0876 6.3538C20.7831 6.52427 21.5319 6.29145 22.0116 5.71197C22.6849 4.89869 22.5718 3.6886 21.7594 3.01442ZM14.3635 7.36261C14.7904 6.85055 15.4181 6.57865 16.0842 6.61645C17.1204 6.67527 17.9795 7.53428 18.0401 8.57211C18.0705 9.09499 17.9072 9.60547 17.5801 10.0095C17.2812 10.3787 17.1162 10.8562 17.1155 11.3552V11.3592C17.1128 12.2369 16.7644 13.0591 16.1345 13.6742C15.5064 14.2877 14.678 14.6165 13.803 14.5976C12.0697 14.562 10.6662 13.1191 10.6744 11.3811C10.6813 9.95037 11.6046 8.70768 12.9722 8.28887C13.5162 8.12223 13.9973 7.80192 14.3635 7.36261ZM9.38379 21.2307H5.6338V20.1457C5.6338 18.6672 7.24442 17.4645 9.22415 17.4645H9.38379V21.2307ZM19.0245 16.3054C19.0245 19.0191 17.1279 21.2271 14.7954 21.2307H10.6624V16.1859H9.22415C7.95179 16.1859 6.74936 16.5798 5.83849 17.2949C4.88197 18.0458 4.35521 19.0582 4.35521 20.1457V21.2307H3.8132C2.83848 21.2307 2.02461 20.5179 1.92002 19.5728C1.91286 19.5081 1.90924 19.4436 1.90924 19.3811C1.90924 18.4207 2.30239 18.0273 2.80017 17.5294C3.34547 16.9839 4.02411 16.305 4.02411 14.9071C4.02411 11.148 7.05779 8.08976 10.7867 8.08976C10.8029 8.08976 10.8188 8.08997 10.8349 8.09006C10.6436 8.26833 10.4668 8.46254 10.3089 8.67171C9.71634 9.4566 9.40063 10.3914 9.39594 11.375C9.38439 13.8069 11.3496 15.826 13.7769 15.8759C13.8088 15.8765 13.8404 15.8768 13.8722 15.8768C15.0578 15.8768 16.1754 15.4215 17.0279 14.5889C17.5003 14.1275 17.8588 13.5823 18.0898 12.9861C18.6745 13.8852 19.0245 15.0863 19.0245 16.3054ZM21.0267 4.89669C20.8266 5.13833 20.4862 5.19877 20.2175 5.04044L19.751 4.76568L18.3947 6.38248C18.3747 6.36151 18.3552 6.3402 18.3346 6.31966C18.0699 6.05509 17.7666 5.83957 17.4383 5.67796L18.8274 3.99962L18.4699 3.59024C18.264 3.35439 18.2601 3.00739 18.4607 2.76511C18.5692 2.63406 18.722 2.55317 18.891 2.53736C19.06 2.52159 19.2249 2.57265 19.3557 2.68115C19.3699 2.69291 19.4225 2.74116 19.5034 2.86722C19.7997 3.32877 20.2249 3.68161 20.733 3.88758C20.8717 3.94384 20.9287 3.98654 20.9429 3.9983C21.2134 4.22277 21.251 4.62581 21.0267 4.89669Z"
                              fill="white"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_359_47">
                              <rect
                                width="21.8204"
                                height="21.8204"
                                fill="white"
                                transform="translate(0.630615 0.971428)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                        <h6 className="font-14 text-white mb-0">Chicken</h6>
                        <span className="text-white">45 Items</span>
                      </div>
                    </a>
                  </div>
                  <div
                    className="swiper-slide swiper-slide-visible swiper-slide-duplicate-prev"
                    data-swiper-slide-index={3}
                    role="group"
                    aria-label="4 / 4"
                  >
                    <a href="product-categorie.html">
                      <div
                        className="categore-box bg-4"
                        style={{
                          backgroundImage:
                            "url(assets/images/background/small/bg4.png)"
                        }}
                      >
                        <svg
                          width={23}
                          height={23}
                          viewBox="0 0 23 23"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_359_59)">
                            <path
                              d="M21.442 5.23551C21.3107 4.4723 20.8559 3.80552 20.1942 3.40612C17.5555 1.81353 14.5353 0.971733 11.46 0.971733C8.38471 0.971733 5.36447 1.81353 2.72583 3.40616C2.06408 3.80556 1.60926 4.47234 1.47796 5.23555C1.3461 6.0019 1.5532 6.78609 2.04619 7.38713C2.28106 7.67346 2.57118 7.90485 2.89603 8.07028L4.90285 11.6064C4.86545 11.7965 4.84533 11.9927 4.84533 12.1937C4.84533 13.5231 5.70437 14.6549 6.89626 15.0653L11.4647 22.7926L20.0233 8.07063C20.3484 7.90515 20.6387 7.67368 20.8738 7.38717C21.3667 6.78609 21.5739 6.0019 21.442 5.23551V5.23551ZM6.13511 12.1936C6.13511 11.2303 6.91879 10.4467 7.88209 10.4467C8.84538 10.4467 9.62906 11.2303 9.62906 12.1936C9.62906 13.1569 8.84538 13.9406 7.88209 13.9406C6.91879 13.9406 6.13511 13.1569 6.13511 12.1936ZM11.4553 20.2424L8.45931 15.1747C9.85859 14.9043 10.9188 13.6708 10.9188 12.1936C10.9188 10.5192 9.55657 9.15689 7.88209 9.15689C6.96797 9.15689 6.14754 9.56343 5.59035 10.2046L4.52542 8.32816C4.86915 8.27442 5.20273 8.15485 5.50609 7.97239C7.28805 6.90058 9.32445 6.32955 11.399 6.31854C11.2668 6.66231 11.1969 7.03067 11.1969 7.40991C11.1969 9.0844 12.5591 10.4467 14.2336 10.4467C15.7526 10.4467 17.0145 9.32568 17.2358 7.86753C17.2955 7.90197 17.3548 7.93688 17.4139 7.97239C17.7137 8.15274 18.0431 8.27179 18.3827 8.32639L15.8867 12.6198C15.4596 12.3992 14.9833 12.2811 14.4937 12.2811C12.8193 12.2811 11.457 13.6434 11.457 15.3179C11.457 16.3654 11.9899 17.3141 12.8378 17.8644L11.4553 20.2424ZM15.9714 7.23725C15.977 7.29452 15.9806 7.35209 15.9806 7.40991C15.9806 8.37321 15.1969 9.15689 14.2336 9.15689C13.2703 9.15689 12.4867 8.37321 12.4867 7.40991C12.4867 7.04185 12.6002 6.69125 12.81 6.39752C13.8981 6.5259 14.9626 6.80892 15.9714 7.23725V7.23725ZM12.7468 15.3179C12.7468 14.3546 13.5304 13.5709 14.4937 13.5709C14.7535 13.5709 15.0066 13.6287 15.2371 13.7372L13.4874 16.7469C13.031 16.4259 12.7468 15.8982 12.7468 15.3179ZM19.8765 6.5691C19.4375 7.10432 18.6813 7.22965 18.0787 6.86713C16.0785 5.6641 13.7898 5.02824 11.4599 5.02824C9.13008 5.02824 6.8414 5.6641 4.84129 6.86713C4.23853 7.2296 3.48246 7.10432 3.04341 6.5691C2.78799 6.25775 2.68068 5.85138 2.74904 5.45426C2.81684 5.06023 3.05128 4.7162 3.3923 4.51039C5.82982 3.03917 8.61958 2.26152 11.46 2.26152C14.3004 2.26152 17.0902 3.03917 19.5277 4.51039C19.8687 4.7162 20.1031 5.06023 20.1709 5.45426C20.2393 5.85138 20.1319 6.25775 19.8765 6.5691V6.5691Z"
                              fill="white"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_359_59">
                              <rect
                                width="21.8208"
                                height="21.8208"
                                fill="white"
                                transform="translate(0.549561 0.971733)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                        <h6 className="font-14 text-white mb-0">Pizzas</h6>
                        <span className="text-white">45 Items</span>
                      </div>
                    </a>
                  </div>
                  <div
                    className="swiper-slide swiper-slide-duplicate swiper-slide-visible swiper-slide-duplicate-active"
                    data-swiper-slide-index={0}
                    role="group"
                    aria-label="1 / 4"
                  >
                    <a href="product-categorie.html">
                      <div
                        className="categore-box"
                        style={{
                          backgroundImage:
                            "url(assets/images/background/small/bg1.png)"
                        }}
                      >
                        <svg
                          width={24}
                          height={24}
                          viewBox="0 0 19 23"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M18.9488 7.87554C18.9488 5.85452 17.3047 4.21039 15.2837 4.21039C14.1548 4.21039 13.1438 4.72381 12.4709 5.52889C11.9729 4.93307 11.2896 4.4979 10.5105 4.31145V4.25301C10.5105 3.38351 11.2178 2.67615 12.0873 2.67615C12.5581 2.67615 12.9397 2.29458 12.9397 1.82379C12.9397 1.35299 12.5581 0.971428 12.0873 0.971428C10.2779 0.971428 8.80573 2.44358 8.80573 4.25301V4.31145C8.02662 4.4979 7.34324 4.93307 6.8453 5.52889C6.17241 4.72381 5.16139 4.21039 4.03252 4.21039C2.01149 4.21039 0.367371 5.85452 0.367371 7.87554C0.367371 9.80417 1.86499 11.3884 3.75816 11.5294C3.39291 12.0992 3.18016 12.7756 3.18016 13.5011C3.18016 15.4297 4.67778 17.0139 6.57095 17.1549C6.2057 17.7248 5.99294 18.4012 5.99294 19.1267C5.99294 21.1477 7.63707 22.7918 9.65809 22.7918C11.6791 22.7918 13.3232 21.1477 13.3232 19.1267C13.3232 18.4012 13.1105 17.7248 12.7452 17.1549C14.6384 17.0139 16.136 15.4297 16.136 13.5011C16.136 12.7756 15.9233 12.0992 15.558 11.5294C17.4512 11.3884 18.9488 9.80417 18.9488 7.87554ZM9.6521 5.91528C9.6541 5.91528 9.65609 5.91561 9.65809 5.91561C9.66009 5.91561 9.66209 5.91528 9.66408 5.91528C10.7424 5.91861 11.6185 6.79661 11.6185 7.87554C11.6185 8.95647 10.739 9.83597 9.65809 9.83597C8.57716 9.83597 7.69766 8.95647 7.69766 7.87554C7.69766 6.79661 8.57383 5.91861 9.6521 5.91528ZM4.03252 9.83597C2.95159 9.83597 2.07209 8.95647 2.07209 7.87554C2.07209 6.79461 2.95159 5.91511 4.03252 5.91511C5.11345 5.91511 5.99294 6.79461 5.99294 7.87554C5.99294 8.95647 5.11345 9.83597 4.03252 9.83597ZM6.8453 15.4615C5.76437 15.4615 4.88488 14.582 4.88488 13.5011C4.88488 12.4202 5.76437 11.5407 6.8453 11.5407C7.92624 11.5407 8.80573 12.4202 8.80573 13.5011C8.80573 14.582 7.92624 15.4615 6.8453 15.4615ZM9.65809 21.0871C8.57716 21.0871 7.69766 20.2076 7.69766 19.1267C7.69766 18.0458 8.57716 17.1663 9.65809 17.1663C10.739 17.1663 11.6185 18.0458 11.6185 19.1267C11.6185 20.2076 10.739 21.0871 9.65809 21.0871ZM12.4709 15.4615C11.3899 15.4615 10.5105 14.582 10.5105 13.5011C10.5105 12.4202 11.3899 11.5407 12.4709 11.5407C13.5518 11.5407 14.4313 12.4202 14.4313 13.5011C14.4313 14.582 13.5518 15.4615 12.4709 15.4615ZM15.2837 9.83597C14.2027 9.83597 13.3232 8.95647 13.3232 7.87554C13.3232 6.79461 14.2027 5.91511 15.2837 5.91511C16.3646 5.91511 17.2441 6.79461 17.2441 7.87554C17.2441 8.95647 16.3646 9.83597 15.2837 9.83597Z"
                            fill="white"
                          />
                        </svg>
                        <h6 className="font-14 text-white mb-0">Fruits</h6>
                        <span className="text-white">45 Items</span>
                      </div>
                    </a>
                  </div>
                  <div
                    className="swiper-slide swiper-slide-duplicate swiper-slide-duplicate-next"
                    data-swiper-slide-index={1}
                    role="group"
                    aria-label="2 / 4"
                  >
                    <a href="product-categorie.html">
                      <div
                        className="categore-box bg-2"
                        style={{
                          backgroundImage:
                            "url(assets/images/background/small/bg2.png)"
                        }}
                      >
                        <svg
                          width={23}
                          height={23}
                          viewBox="0 0 23 23"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_359_32)">
                            <path
                              d="M22.3197 11.5459C21.4112 9.97531 20.1046 8.65803 18.5413 7.7365C17.9885 7.41056 17.4079 7.13734 16.808 6.91909C16.5004 6.14443 16.0027 5.45431 15.3442 4.90621C14.3065 4.04238 12.9945 3.63453 11.6498 3.7574C10.3052 3.88039 9.08895 4.51962 8.22513 5.55745C7.98732 5.84312 8.02611 6.26746 8.31182 6.50527L9.23206 7.27133C9.08022 7.34706 8.92867 7.42607 8.7775 7.51041C7.69923 8.11235 6.64818 8.93679 5.71264 9.91198L1.59021 7.61624C1.32048 7.46601 0.982986 7.5186 0.771857 7.74392C0.560642 7.9692 0.529787 8.30929 0.697147 8.56883L2.94499 12.0561L0.705628 15.3611C0.536393 15.611 0.554079 15.9429 0.748971 16.1733C0.943862 16.4037 1.26827 16.4762 1.54264 16.3507L6.12905 14.2534C7.06933 15.1353 8.05837 15.8521 9.07446 16.3875C9.12808 16.4158 9.18173 16.4425 9.23539 16.4697L8.28505 17.2607C8.14786 17.3749 8.06165 17.5389 8.04541 17.7167C8.02917 17.8944 8.08419 18.0713 8.19837 18.2085C9.19673 19.4079 10.6371 20.0273 12.0878 20.0273C13.228 20.0273 14.3746 19.6445 15.3175 18.8597C15.9729 18.3141 16.4691 17.628 16.7769 16.8578C17.3878 16.6377 17.9788 16.3609 18.5412 16.0294C20.1044 15.1079 21.411 13.7906 22.3196 12.2199C22.4403 12.0115 22.4403 11.7544 22.3197 11.5459ZM11.7723 5.09782C12.7588 5.00734 13.7216 5.30694 14.483 5.94076C14.6638 6.09128 14.8276 6.25681 14.9743 6.43427C14.3922 6.33531 13.8003 6.28477 13.2049 6.28477C12.3511 6.28477 11.4946 6.42264 10.643 6.69454L9.73662 5.93999C10.3094 5.46109 11.0129 5.16728 11.7723 5.09782ZM14.4565 17.8251C13.0613 18.9865 11.0582 18.9481 9.71058 17.8254L10.6359 17.0552C11.4962 17.3382 12.3556 17.4811 13.2049 17.4811C13.7897 17.4811 14.3711 17.4325 14.9432 17.3369C14.7976 17.5124 14.6355 17.6761 14.4565 17.8251ZM13.2049 16.1351C10.3521 16.1351 7.93022 14.1539 6.74045 12.973C6.61157 12.8451 6.44021 12.7776 6.26616 12.7776C6.17159 12.7776 6.07621 12.7976 5.98646 12.8386L3.1672 14.1278L4.30884 12.4429C4.46014 12.2195 4.4635 11.9275 4.31732 11.7007L3.28648 10.1015L5.52004 11.3453C5.79548 11.4987 6.14035 11.4403 6.35003 11.205C8.37323 8.93355 10.8717 7.63077 13.2049 7.63077C16.3393 7.63077 19.2712 9.25025 20.9498 11.8829C19.2712 14.5156 16.3394 16.1351 13.2049 16.1351Z"
                              fill="white"
                            />
                            <path
                              d="M16.4618 11.868C17.0499 11.868 17.5267 11.3912 17.5267 10.803C17.5267 10.2149 17.0499 9.73811 16.4618 9.73811C15.8736 9.73811 15.3969 10.2149 15.3969 10.803C15.3969 11.3912 15.8736 11.868 16.4618 11.868Z"
                              fill="white"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_359_32">
                              <rect
                                width="21.8204"
                                height="21.8204"
                                fill="white"
                                transform="translate(0.589783 0.971428)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                        <h6 className="font-14 text-white mb-0">Fish</h6>
                        <span className="text-white">45 Items</span>
                      </div>
                    </a>
                  </div>
                  <div
                    className="swiper-slide swiper-slide-duplicate"
                    data-swiper-slide-index={2}
                    role="group"
                    aria-label="3 / 4"
                  >
                    <a href="product-categorie.html">
                      <div
                        className="categore-box bg-3"
                        style={{
                          backgroundImage:
                            "url(assets/images/background/small/bg3.png)"
                        }}
                      >
                        <svg
                          width={23}
                          height={23}
                          viewBox="0 0 23 23"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_359_47)">
                            <path
                              d="M21.7594 3.01442C21.6162 2.89556 21.4377 2.79362 21.2135 2.70276C20.9515 2.59656 20.7322 2.41458 20.5794 2.17651C20.4487 1.97297 20.3156 1.81622 20.1723 1.69732C19.7785 1.37052 19.281 1.2168 18.7719 1.2644C18.2626 1.31209 17.8023 1.55553 17.4758 1.94987C16.997 2.52828 16.9072 3.30649 17.2021 3.95811L16.0617 5.336C15.0224 5.3054 14.0499 5.74223 13.3815 6.54396C13.2128 6.7464 13.0008 6.90297 12.7625 7.00496C12.1175 6.83803 11.2655 6.81126 10.7867 6.81126C6.3528 6.81126 2.74553 10.4431 2.74553 14.9071C2.74553 15.7756 2.38916 16.1321 1.8959 16.6256C1.33215 17.1895 0.630615 17.8913 0.630615 19.3811C0.630615 19.4904 0.636837 19.6022 0.649154 19.7134C0.82555 21.3073 2.18579 22.5092 3.8132 22.5092H14.7898V22.5093C14.7918 22.5093 14.7937 22.5092 14.7956 22.5092H14.8504V22.5084C17.8626 22.4717 20.3031 19.7034 20.3031 16.3054C20.3031 14.3601 19.5783 12.4946 18.3943 11.3488C18.3962 11.1448 18.4596 10.9551 18.5739 10.8139C19.1018 10.1618 19.3655 9.33927 19.3165 8.4977C19.2968 8.16089 19.2256 7.83209 19.1087 7.52068L20.0876 6.3538C20.7831 6.52427 21.5319 6.29145 22.0116 5.71197C22.6849 4.89869 22.5718 3.6886 21.7594 3.01442ZM14.3635 7.36261C14.7904 6.85055 15.4181 6.57865 16.0842 6.61645C17.1204 6.67527 17.9795 7.53428 18.0401 8.57211C18.0705 9.09499 17.9072 9.60547 17.5801 10.0095C17.2812 10.3787 17.1162 10.8562 17.1155 11.3552V11.3592C17.1128 12.2369 16.7644 13.0591 16.1345 13.6742C15.5064 14.2877 14.678 14.6165 13.803 14.5976C12.0697 14.562 10.6662 13.1191 10.6744 11.3811C10.6813 9.95037 11.6046 8.70768 12.9722 8.28887C13.5162 8.12223 13.9973 7.80192 14.3635 7.36261ZM9.38379 21.2307H5.6338V20.1457C5.6338 18.6672 7.24442 17.4645 9.22415 17.4645H9.38379V21.2307ZM19.0245 16.3054C19.0245 19.0191 17.1279 21.2271 14.7954 21.2307H10.6624V16.1859H9.22415C7.95179 16.1859 6.74936 16.5798 5.83849 17.2949C4.88197 18.0458 4.35521 19.0582 4.35521 20.1457V21.2307H3.8132C2.83848 21.2307 2.02461 20.5179 1.92002 19.5728C1.91286 19.5081 1.90924 19.4436 1.90924 19.3811C1.90924 18.4207 2.30239 18.0273 2.80017 17.5294C3.34547 16.9839 4.02411 16.305 4.02411 14.9071C4.02411 11.148 7.05779 8.08976 10.7867 8.08976C10.8029 8.08976 10.8188 8.08997 10.8349 8.09006C10.6436 8.26833 10.4668 8.46254 10.3089 8.67171C9.71634 9.4566 9.40063 10.3914 9.39594 11.375C9.38439 13.8069 11.3496 15.826 13.7769 15.8759C13.8088 15.8765 13.8404 15.8768 13.8722 15.8768C15.0578 15.8768 16.1754 15.4215 17.0279 14.5889C17.5003 14.1275 17.8588 13.5823 18.0898 12.9861C18.6745 13.8852 19.0245 15.0863 19.0245 16.3054ZM21.0267 4.89669C20.8266 5.13833 20.4862 5.19877 20.2175 5.04044L19.751 4.76568L18.3947 6.38248C18.3747 6.36151 18.3552 6.3402 18.3346 6.31966C18.0699 6.05509 17.7666 5.83957 17.4383 5.67796L18.8274 3.99962L18.4699 3.59024C18.264 3.35439 18.2601 3.00739 18.4607 2.76511C18.5692 2.63406 18.722 2.55317 18.891 2.53736C19.06 2.52159 19.2249 2.57265 19.3557 2.68115C19.3699 2.69291 19.4225 2.74116 19.5034 2.86722C19.7997 3.32877 20.2249 3.68161 20.733 3.88758C20.8717 3.94384 20.9287 3.98654 20.9429 3.9983C21.2134 4.22277 21.251 4.62581 21.0267 4.89669Z"
                              fill="white"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_359_47">
                              <rect
                                width="21.8204"
                                height="21.8204"
                                fill="white"
                                transform="translate(0.630615 0.971428)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                        <h6 className="font-14 text-white mb-0">Chicken</h6>
                        <span className="text-white">45 Items</span>
                      </div>
                    </a>
                  </div>
                  <div
                    className="swiper-slide swiper-slide-duplicate"
                    data-swiper-slide-index={3}
                    role="group"
                    aria-label="4 / 4"
                  >
                    <a href="product-categorie.html">
                      <div
                        className="categore-box bg-4"
                        style={{
                          backgroundImage:
                            "url(assets/images/background/small/bg4.png)"
                        }}
                      >
                        <svg
                          width={23}
                          height={23}
                          viewBox="0 0 23 23"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_359_59)">
                            <path
                              d="M21.442 5.23551C21.3107 4.4723 20.8559 3.80552 20.1942 3.40612C17.5555 1.81353 14.5353 0.971733 11.46 0.971733C8.38471 0.971733 5.36447 1.81353 2.72583 3.40616C2.06408 3.80556 1.60926 4.47234 1.47796 5.23555C1.3461 6.0019 1.5532 6.78609 2.04619 7.38713C2.28106 7.67346 2.57118 7.90485 2.89603 8.07028L4.90285 11.6064C4.86545 11.7965 4.84533 11.9927 4.84533 12.1937C4.84533 13.5231 5.70437 14.6549 6.89626 15.0653L11.4647 22.7926L20.0233 8.07063C20.3484 7.90515 20.6387 7.67368 20.8738 7.38717C21.3667 6.78609 21.5739 6.0019 21.442 5.23551V5.23551ZM6.13511 12.1936C6.13511 11.2303 6.91879 10.4467 7.88209 10.4467C8.84538 10.4467 9.62906 11.2303 9.62906 12.1936C9.62906 13.1569 8.84538 13.9406 7.88209 13.9406C6.91879 13.9406 6.13511 13.1569 6.13511 12.1936ZM11.4553 20.2424L8.45931 15.1747C9.85859 14.9043 10.9188 13.6708 10.9188 12.1936C10.9188 10.5192 9.55657 9.15689 7.88209 9.15689C6.96797 9.15689 6.14754 9.56343 5.59035 10.2046L4.52542 8.32816C4.86915 8.27442 5.20273 8.15485 5.50609 7.97239C7.28805 6.90058 9.32445 6.32955 11.399 6.31854C11.2668 6.66231 11.1969 7.03067 11.1969 7.40991C11.1969 9.0844 12.5591 10.4467 14.2336 10.4467C15.7526 10.4467 17.0145 9.32568 17.2358 7.86753C17.2955 7.90197 17.3548 7.93688 17.4139 7.97239C17.7137 8.15274 18.0431 8.27179 18.3827 8.32639L15.8867 12.6198C15.4596 12.3992 14.9833 12.2811 14.4937 12.2811C12.8193 12.2811 11.457 13.6434 11.457 15.3179C11.457 16.3654 11.9899 17.3141 12.8378 17.8644L11.4553 20.2424ZM15.9714 7.23725C15.977 7.29452 15.9806 7.35209 15.9806 7.40991C15.9806 8.37321 15.1969 9.15689 14.2336 9.15689C13.2703 9.15689 12.4867 8.37321 12.4867 7.40991C12.4867 7.04185 12.6002 6.69125 12.81 6.39752C13.8981 6.5259 14.9626 6.80892 15.9714 7.23725V7.23725ZM12.7468 15.3179C12.7468 14.3546 13.5304 13.5709 14.4937 13.5709C14.7535 13.5709 15.0066 13.6287 15.2371 13.7372L13.4874 16.7469C13.031 16.4259 12.7468 15.8982 12.7468 15.3179ZM19.8765 6.5691C19.4375 7.10432 18.6813 7.22965 18.0787 6.86713C16.0785 5.6641 13.7898 5.02824 11.4599 5.02824C9.13008 5.02824 6.8414 5.6641 4.84129 6.86713C4.23853 7.2296 3.48246 7.10432 3.04341 6.5691C2.78799 6.25775 2.68068 5.85138 2.74904 5.45426C2.81684 5.06023 3.05128 4.7162 3.3923 4.51039C5.82982 3.03917 8.61958 2.26152 11.46 2.26152C14.3004 2.26152 17.0902 3.03917 19.5277 4.51039C19.8687 4.7162 20.1031 5.06023 20.1709 5.45426C20.2393 5.85138 20.1319 6.25775 19.8765 6.5691V6.5691Z"
                              fill="white"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_359_59">
                              <rect
                                width="21.8208"
                                height="21.8208"
                                fill="white"
                                transform="translate(0.549561 0.971733)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                        <h6 className="font-14 text-white mb-0">Pizzas</h6>
                        <span className="text-white">45 Items</span>
                      </div>
                    </a>
                  </div>
                </div>
                <span
                  className="swiper-notification"
                  aria-live="assertive"
                  aria-atomic="true"
                />
              </div>
            </div>
          </div> */}
          {/* Categorie End */}
          {/* Recomended Start */}
          <div className="title-bar">
            <span className="title mb-0 font-18">Popular Deals</span>
          </div>
          <div className="row g-3 mb-3">
            <div className="col-6">
              <div className="card-item style-1">
                <div className="dz-media">
                  <img src="assets/images/food/food8.png" alt="image" />
                  <a href="javascript:void(0);" className="r-btn">
                    <div className="like-button">
                      <i className="fa-regular fa-heart" />
                    </div>
                  </a>
                  <div className="label">5% OFF</div>
                </div>
                <div className="dz-content">
                  <h6 className="title mb-3">
                    <a href="product.html">Fresh Grapes</a>
                  </h6>
                  <div className="dz-meta">
                    <ul>
                      <li className="price text-accent">$ 10.9</li>
                      <li className="review">
                        <span className="text-soft font-10">(243)</span>
                        <i className="fa fa-star" />
                      </li>
                    </ul>
                  </div>
                  <div className="mt-2">
                    <a
                      className="btn btn-primary add-btn light"
                      href="javascript:void(0);"
                    >
                      Add to cart
                    </a>
                    <div className="dz-stepper border-1 rounded-stepper stepper-fill">
                      <div className="input-group bootstrap-touchspin bootstrap-touchspin-injected">
                        <span className="input-group-btn input-group-prepend">
                          <button
                            className="btn btn-primary bootstrap-touchspin-down"
                            type="button"
                          >
                            -
                          </button>
                        </span>
                        <input
                          className="stepper form-control"
                          type="text"
                          name="demo3"
                          readOnly=""
                        />
                        <span className="input-group-btn input-group-append">
                          <button
                            className="btn btn-primary bootstrap-touchspin-up"
                            type="button"
                          >
                            +
                          </button>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="card-item style-1">
                <div className="dz-media">
                  <img src="assets/images/food/food4.png" alt="image" />
                  <a href="javascript:void(0);" className="r-btn">
                    <div className="like-button">
                      <i className="fa-regular fa-heart" />
                    </div>
                  </a>
                </div>
                <div className="dz-content">
                  <h6 className="title mb-3">
                    <a href="product.html">Gurame Fish</a>
                  </h6>
                  <div className="dz-meta">
                    <ul>
                      <li className="price text-accent">$ 10.9</li>
                      <li className="review">
                        <span className="text-soft font-10">(243)</span>
                        <i className="fa fa-star" />
                      </li>
                    </ul>
                  </div>
                  <div className="mt-2">
                    <a
                      className="btn btn-primary add-btn light"
                      href="javascript:void(0);"
                    >
                      Add to cart
                    </a>
                    <div className="dz-stepper border-1 rounded-stepper stepper-fill">
                      <div className="input-group bootstrap-touchspin bootstrap-touchspin-injected">
                        <span className="input-group-btn input-group-prepend">
                          <button
                            className="btn btn-primary bootstrap-touchspin-down"
                            type="button"
                          >
                            -
                          </button>
                        </span>
                        <input
                          className="stepper form-control"
                          type="text"
                          name="demo3"
                          readOnly=""
                        />
                        <span className="input-group-btn input-group-append">
                          <button
                            className="btn btn-primary bootstrap-touchspin-up"
                            type="button"
                          >
                            +
                          </button>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="card-item style-1">
                <div className="dz-media">
                  <img src="assets/images/food/food5.png" alt="image" />
                  <a href="javascript:void(0);" className="r-btn">
                    <div className="like-button">
                      <i className="fa-regular fa-heart" />
                    </div>
                  </a>
                </div>
                <div className="dz-content">
                  <h6 className="title mb-3">
                    <a href="product.html">Tomatoes</a>
                  </h6>
                  <div className="dz-meta">
                    <ul>
                      <li className="price text-accent">$ 10.9</li>
                      <li className="review">
                        <span className="text-soft font-10">(243)</span>
                        <i className="fa fa-star" />
                      </li>
                    </ul>
                  </div>
                  <div className="mt-2">
                    <a
                      className="btn btn-primary add-btn light"
                      href="javascript:void(0);"
                    >
                      Add to cart
                    </a>
                    <div className="dz-stepper border-1 rounded-stepper stepper-fill">
                      <div className="input-group bootstrap-touchspin bootstrap-touchspin-injected">
                        <span className="input-group-btn input-group-prepend">
                          <button
                            className="btn btn-primary bootstrap-touchspin-down"
                            type="button"
                          >
                            -
                          </button>
                        </span>
                        <input
                          className="stepper form-control"
                          type="text"
                          name="demo3"
                          readOnly=""
                        />
                        <span className="input-group-btn input-group-append">
                          <button
                            className="btn btn-primary bootstrap-touchspin-up"
                            type="button"
                          >
                            +
                          </button>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="card-item style-1">
                <div className="dz-media">
                  <img src="assets/images/food/food3.png" alt="image" />
                  <a href="javascript:void(0);" className="r-btn">
                    <div className="like-button active">
                      <i className="fa-regular fa-heart" />
                    </div>
                  </a>
                  <div className="label">5% OFF</div>
                </div>
                <div className="dz-content">
                  <h6 className="title mb-3">
                    <a href="product.html">Chicken Village</a>
                  </h6>
                  <div className="dz-meta">
                    <ul>
                      <li className="price text-accent">$ 10.9</li>
                      <li className="review">
                        <span className="text-soft font-10">(243)</span>
                        <i className="fa fa-star" />
                      </li>
                    </ul>
                  </div>
                  <div className="mt-2">
                    <a
                      className="btn btn-primary add-btn light"
                      href="javascript:void(0);"
                    >
                      Add to cart
                    </a>
                    <div className="dz-stepper border-1 rounded-stepper stepper-fill">
                      <div className="input-group bootstrap-touchspin bootstrap-touchspin-injected">
                        <span className="input-group-btn input-group-prepend">
                          <button
                            className="btn btn-primary bootstrap-touchspin-down"
                            type="button"
                          >
                            -
                          </button>
                        </span>
                        <input
                          className="stepper form-control"
                          type="text"
                          name="demo3"
                          readOnly=""
                        />
                        <span className="input-group-btn input-group-append">
                          <button
                            className="btn btn-primary bootstrap-touchspin-up"
                            type="button"
                          >
                            +
                          </button>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="card-item style-1">
                <div className="dz-media">
                  <img src="assets/images/food/food6.png" alt="image" />
                  <a href="javascript:void(0);" className="r-btn">
                    <div className="like-button">
                      <i className="fa-regular fa-heart" />
                    </div>
                  </a>
                </div>
                <div className="dz-content">
                  <h6 className="title mb-3">
                    <a href="product.html">Fresh Milk</a>
                  </h6>
                  <div className="dz-meta">
                    <ul>
                      <li className="price text-accent">$ 10.9</li>
                      <li className="review">
                        <span className="text-soft font-10">(243)</span>
                        <i className="fa fa-star" />
                      </li>
                    </ul>
                  </div>
                  <div className="mt-2">
                    <a
                      className="btn btn-primary add-btn light"
                      href="javascript:void(0);"
                    >
                      Add to cart
                    </a>
                    <div className="dz-stepper border-1 rounded-stepper stepper-fill">
                      <div className="input-group bootstrap-touchspin bootstrap-touchspin-injected">
                        <span className="input-group-btn input-group-prepend">
                          <button
                            className="btn btn-primary bootstrap-touchspin-down"
                            type="button"
                          >
                            -
                          </button>
                        </span>
                        <input
                          className="stepper form-control"
                          type="text"
                          name="demo3"
                          readOnly=""
                        />
                        <span className="input-group-btn input-group-append">
                          <button
                            className="btn btn-primary bootstrap-touchspin-up"
                            type="button"
                          >
                            +
                          </button>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="card-item style-1">
                <div className="dz-media">
                  <img src="assets/images/food/food7.png" alt="image" />
                  <a href="javascript:void(0);" className="r-btn">
                    <div className="like-button">
                      <i className="fa-regular fa-heart" />
                    </div>
                  </a>
                </div>
                <div className="dz-content">
                  <h6 className="title mb-3">
                    <a href="product.html">Fresh Avocados</a>
                  </h6>
                  <div className="dz-meta">
                    <ul>
                      <li className="price text-accent">$ 10.9</li>
                      <li className="review">
                        <span className="text-soft font-10">(243)</span>
                        <i className="fa fa-star" />
                      </li>
                    </ul>
                  </div>
                  <div className="mt-2">
                    <a
                      className="btn btn-primary add-btn light"
                      href="javascript:void(0);"
                    >
                      Add to cart
                    </a>
                    <div className="dz-stepper border-1 rounded-stepper stepper-fill">
                      <div className="input-group bootstrap-touchspin bootstrap-touchspin-injected">
                        <span className="input-group-btn input-group-prepend">
                          <button
                            className="btn btn-primary bootstrap-touchspin-down"
                            type="button"
                          >
                            -
                          </button>
                        </span>
                        <input
                          className="stepper form-control"
                          type="text"
                          name="demo3"
                          readOnly=""
                        />
                        <span className="input-group-btn input-group-append">
                          <button
                            className="btn btn-primary bootstrap-touchspin-up"
                            type="button"
                          >
                            +
                          </button>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Recomended Start */}
        </div>
        {/* Other Package */}
        <h6 className="title-head mb-3">Other Login w3Grocery package</h6>
        <div className="row g-3">
          <div className="col-6">
            <div className="package-box box-1">
              <div className="media media-70">
                <img src="assets/images/package/shop.svg" alt="image" />
              </div>
              <h6 className="title-head">W3 Vendor</h6>
              <p className="sub-title">Continue With Vendor</p>
              <a href="vendors/onboarding.html" className="btn package-btn">
                Click Now
                <i className="fa-solid fa-arrow-right ms-2" />
              </a>
            </div>
          </div>
          <div className="col-6">
            <div className="package-box box-2">
              <div className="media media-70">
                <img src="assets/images/package/boy.svg" alt="image" />
              </div>
              <h6 className="title-head">W3 Driver</h6>
              <p className="sub-title">Continue With Driver</p>
              <a href="driver/onboarding.html" className="btn package-btn">
                Click Now
                <i className="fa-solid fa-arrow-right ms-2" />
              </a>
            </div>
          </div>
        </div>
        {/* Other Package */}
      </div>
    </div>
  </div>
  {/* Page Content End*/}
  {/* Menubar */}
      <Footer/>
  {/* <div className="menubar-area style-2 footer-fixed border-top rounded-0">
    <div className="toolbar-inner menubar-nav">
      <a href="index.html" className="nav-link active">
        <svg
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.14373 20.7821V17.7152C9.14372 16.9381 9.77567 16.3067 10.5584 16.3018H13.4326C14.2189 16.3018 14.8563 16.9346 14.8563 17.7152V20.7732C14.8562 21.4473 15.404 21.9951 16.0829 22H18.0438C18.9596 22.0023 19.8388 21.6428 20.4872 21.0007C21.1356 20.3586 21.5 19.4868 21.5 18.5775V9.86585C21.5 9.13139 21.1721 8.43471 20.6046 7.9635L13.943 2.67427C12.7785 1.74912 11.1154 1.77901 9.98539 2.74538L3.46701 7.9635C2.87274 8.42082 2.51755 9.11956 2.5 9.86585V18.5686C2.5 20.4637 4.04738 22 5.95617 22H7.87229C8.19917 22.0023 8.51349 21.8751 8.74547 21.6464C8.97746 21.4178 9.10793 21.1067 9.10792 20.7821H9.14373Z"
            fill="#130F26"
          />
        </svg>
      </a>
      <a href="order.html" className="nav-link">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <path
            d="M23.561 6.622L19.5 10.683c-.293.293-.677.439-1.061.439s-.768-.146-1.061-.439a1.5 1.5 0 0 1 0-2.121l1.5-1.5H3.153a1.5 1.5 0 1 1 0-3h15.726l-1.5-1.5a1.5 1.5 0 0 1 0-2.121 1.5 1.5 0 0 1 2.121 0l4.061 4.061a1.5 1.5 0 0 1 0 2.121zm-3.533 10.317H5.122l1.5-1.5a1.5 1.5 0 0 0-2.121-2.121L.44 17.378a1.5 1.5 0 0 0 0 2.121l4.061 4.061c.293.293.677.439 1.061.439s.768-.146 1.061-.439a1.5 1.5 0 0 0 0-2.121l-1.5-1.5h14.906a1.5 1.5 0 1 0 0-3z"
            fill="#7d8fab"
          />
        </svg>
      </a>
      <a href="shopping-cart.html" className="nav-link">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 456.569 456.569">
          <path d="M345.805 339.465c-29.323-.028-53.117 23.72-53.146 53.043s23.72 53.117 53.043 53.146 53.117-23.72 53.146-53.043v-.051c-.028-29.292-23.752-53.038-53.043-53.095zm94.171-254.244a20.44 20.44 0 0 0-3.855-.373H112.845l-5.12-34.253c-3.19-22.748-22.648-39.673-45.619-39.68H20.48C9.169 10.915 0 20.084 0 31.395s9.169 20.48 20.48 20.48h41.677a5.12 5.12 0 0 1 5.12 4.506l31.539 216.166c4.324 27.468 27.951 47.732 55.757 47.821h213.043c26.771.035 49.866-18.78 55.245-45.005l33.331-166.144c2.149-11.105-5.111-21.849-16.216-23.998zM215.737 390.286c-1.247-28.463-24.737-50.869-53.228-50.77h0c-29.299 1.184-52.091 25.896-50.907 55.195 1.136 28.113 24.005 50.458 52.136 50.943h1.28c29.295-1.284 52.002-26.073 50.719-55.368z" />
        </svg>
      </a>
      <a href="favourite.html" className="nav-link">
        <svg
          enableBackground="new 0 0 512.001 512.001"
          height={512}
          viewBox="0 0 512.001 512.001"
          width={512}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="m256.001 477.407c-2.59 0-5.179-.669-7.499-2.009-2.52-1.454-62.391-36.216-123.121-88.594-35.994-31.043-64.726-61.833-85.396-91.513-26.748-38.406-40.199-75.348-39.982-109.801.254-40.09 14.613-77.792 40.435-106.162 26.258-28.848 61.3-44.734 98.673-44.734 47.897 0 91.688 26.83 116.891 69.332 25.203-42.501 68.994-69.332 116.891-69.332 35.308 0 68.995 14.334 94.859 40.362 28.384 28.563 44.511 68.921 44.247 110.724-.218 34.393-13.921 71.279-40.728 109.632-20.734 29.665-49.426 60.441-85.279 91.475-60.508 52.373-119.949 87.134-122.45 88.588-2.331 1.354-4.937 2.032-7.541 2.032z" />
        </svg>
      </a>
      <a href="profile.html" className="nav-link">
        <div className="media media-25 rounded-circle mx-auto">
          <img src="assets/images/avatar/9.jpg" alt="/" />
        </div>
      </a>
    </div>
  </div> */}
  {/* Menubar */}
  {/* <div
    className="offcanvas offcanvas-bottom m-3 rounded"
    tabIndex={-1}
    id="offcanvasBottom"
  >
    <div className="offcanvas-body small">
      <ul className="theme-color-settings">
        <li>
          <input
            className="filled-in"
            id="primary_color_8"
            name="theme_color"
            type="radio"
            defaultValue="color-primary"
          />
          <label htmlFor="primary_color_8" />
          <span>Default</span>
        </li>
        <li>
          <input
            className="filled-in"
            id="primary_color_2"
            name="theme_color"
            type="radio"
            defaultValue="color-green"
          />
          <label htmlFor="primary_color_2" />
          <span>Green</span>
        </li>
        <li>
          <input
            className="filled-in"
            id="primary_color_3"
            name="theme_color"
            type="radio"
            defaultValue="color-blue"
          />
          <label htmlFor="primary_color_3" />
          <span>Blue</span>
        </li>
        <li>
          <input
            className="filled-in"
            id="primary_color_4"
            name="theme_color"
            type="radio"
            defaultValue="color-pink"
          />
          <label htmlFor="primary_color_4" />
          <span>Pink</span>
        </li>
        <li>
          <input
            className="filled-in"
            id="primary_color_5"
            name="theme_color"
            type="radio"
            defaultValue="color-yellow"
          />
          <label htmlFor="primary_color_5" />
          <span>Yellow</span>
        </li>
        <li>
          <input
            className="filled-in"
            id="primary_color_6"
            name="theme_color"
            type="radio"
            defaultValue="color-orange"
          />
          <label htmlFor="primary_color_6" />
          <span>Orange</span>
        </li>
        <li>
          <input
            className="filled-in"
            id="primary_color_7"
            name="theme_color"
            type="radio"
            defaultValue="color-purple"
          />
          <label htmlFor="primary_color_7" />
          <span>Purple</span>
        </li>
        <li>
          <input
            className="filled-in"
            id="primary_color_1"
            name="theme_color"
            type="radio"
            defaultValue="color-red"
          />
          <label htmlFor="primary_color_1" />
          <span>Red</span>
        </li>
        <li>
          <input
            className="filled-in"
            id="primary_color_9"
            name="theme_color"
            type="radio"
            defaultValue="color-lightblue"
          />
          <label htmlFor="primary_color_9" />
          <span>Lightblue</span>
        </li>
        <li>
          <input
            className="filled-in"
            id="primary_color_10"
            name="theme_color"
            type="radio"
            defaultValue="color-teal"
          />
          <label htmlFor="primary_color_10" />
          <span>Teal</span>
        </li>
        <li>
          <input
            className="filled-in"
            id="primary_color_11"
            name="theme_color"
            type="radio"
            defaultValue="color-lime"
          />
          <label htmlFor="primary_color_11" />
          <span>Lime</span>
        </li>
        <li>
          <input
            className="filled-in"
            id="primary_color_12"
            name="theme_color"
            type="radio"
            defaultValue="color-deeporange"
          />
          <label htmlFor="primary_color_12" />
          <span>Deeporange</span>
        </li>
      </ul>
    </div>
  </div> */}
  {/* Theme Color Settings End */}
  {/* PWA Offcanvas */}
  <div
    className="offcanvas offcanvas-bottom pwa-offcanvas"
    style={{ display: "none" }}
  >
    <div className="container">
      <div className="offcanvas-body small">
        <img className="logo" src="assets/images/icon.png" alt="" />
        <h6 className="title font-w600">W3Grocery on Your Home Screen</h6>
        <p>
          Install W3Grocery Pre-Build Grocery Mobile App Template to your home
          screen for easy access, just like any other app
        </p>
        <button type="button" className="btn btn-sm btn-primary pwa-btn">
          Add to Home Screen
        </button>
        <button
          type="button"
          className="btn btn-sm pwa-close btn-secondary ms-2 text-white"
        >
          Maybe later
        </button>
      </div>
    </div>
  </div>
  <div className="offcanvas-backdrop pwa-backdrop fade" />
  {/* PWA Offcanvas End */}
</div>

    </>
  )
}

export default Home